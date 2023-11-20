import mongoose from 'mongoose';
import passport from 'passport';
import { successResponse } from '@/utils';
import User from '@/models/User';
import UserProfile from '@/models/UserProfile';
import ApiError from '@/utils/ApiError';

const AuthService = {
  async register(data) {
    const user = await User.create(data);

    return successResponse(user.toResource());
  },
  async login({ userName, password }) {
    const msg = 'Username or password is incorrect';

    const user = await User.findOne({ $or: [{ email: userName }, { userName }] });
    if (!user) throw new ApiError(msg);

    const isCorrectPassword = await user.isValidPassword(password);
    if (!isCorrectPassword) throw new ApiError(msg);

    return (req, res, next) => {
      const token = user.generateJWT();
      req.token = token;
      passport.authenticate('jwt', (err, user) => {
        if (err) return next(err);
        if (!user) throw new ApiError('Login Error!');

        const dataLogin = { ...user, token };
        req.login(dataLogin, (err) => {
          if (err) return next(err);

          return res.json(successResponse(dataLogin));
        });
      })(req, res, next);
    };
  },
  // async profile(id) {
  //   const user = await User.findById(id).select('-_id -password -__v -authType -createdAt -updatedAt');

  //   return successResponse(user);
  // },
  async changePassword(id, { currentPassword, newPassword }) {
    const msg = 'Password is incorrect';

    const user = await User.findById(id);

    if (!user) throw new ApiError(msg);
    if (user.password) {
      const isCorrectPassword = await user.isValidPassword(currentPassword);
      if (!isCorrectPassword) throw new ApiError(msg);
    }

    user.password = newPassword;
    await user.save();
    return successResponse();
  },
  async profile(id) {
    const [user, userProfile] = await Promise.all([
      User.findById(id).select('-_id -password -__v -authType -createdAt -updatedAt'),
      UserProfile.findOne({ user: id }),
    ]);

    if (!userProfile) {
      const data = await UserProfile.create({ user: id });
      await data.populate('followed followers');
      return successResponse({ ...user.toObject(), profile: { ...data.toObject() } });
    }

    await userProfile.populate('followed followers', 'followers.userName');
    return successResponse({ ...user.toObject(), profile: { ...userProfile.toObject() } });
  },
  async follow({ id, followed, type }) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      if (id === followed) throw new ApiError('Error!');
      if (type)
        await Promise.all([
          UserProfile.updateOne({ user: id }, { $addToSet: { followed } }, { upsert: true }),
          UserProfile.updateOne({ user: followed }, { $addToSet: { followers: id } }, { upsert: true }),
        ]);
      else
        await Promise.all([
          UserProfile.updateOne({ user: id }, { $pull: { followed } }, { upsert: true }),
          UserProfile.updateOne({ user: followed }, { $pull: { followers: id } }, { upsert: true }),
        ]);
      await session.commitTransaction();
      session.endSession();

      return successResponse();
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      throw error;
    }
  },
};

export default AuthService;

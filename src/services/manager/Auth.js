import passport from 'passport';
import User from '@/models/User';
import { successResponse } from '@/utils';

const AuthService = {
  async register(data) {
    const user = await User.create(data);

    return successResponse(user.toResource());
  },
  async login({ userName, password }) {
    const msg = 'Username or password is incorrect';

    const user = await User.findOne({ $or: [{ email: userName }, { userName }] });
    if (!user) throw { msg };

    const isCorrectPassword = await user.isValidPassword(password);
    if (!isCorrectPassword) throw { msg };

    return (req, res, next) => {
      const token = user.generateJWT();
      req.token = token;
      passport.authenticate('jwt', (err, user) => {
        if (err) return next(err);
        if (!user) throw { msg: 'Login error' };

        const dataLogin = { ...user, token };
        req.login(dataLogin, (err) => {
          if (err) return next(err);

          return res.json(successResponse(dataLogin));
        });
      })(req, res, next);
    };
  },
  async profile(id) {
    const user = await User.findById(id).select('-_id -password -__v -authType -createdAt -updatedAt');

    return successResponse(user);
  },
  async changePassword(id, { currentPassword, newPassword }) {
    const msg = 'Password is incorrect';

    const user = await User.findById(id);

    if (!user) throw { msg };
    if (user.password) {
      const isCorrectPassword = await user.isValidPassword(currentPassword);
      if (!isCorrectPassword) throw { msg };
    }

    user.password = newPassword;
    await user.save();
    return successResponse();
  },
};

export default AuthService;

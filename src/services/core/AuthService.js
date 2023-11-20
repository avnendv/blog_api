import mongoose from 'mongoose';
import { successResponse } from '@/utils';
import User from '@/models/User';
import UserProfile from '@/models/UserProfile';
import ApiError from '@/utils/ApiError';

const AuthService = {
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

import mongoose from 'mongoose';
import { successResponse } from '@/utils';
import User from '@/models/User';
import UserProfile from '@/models/UserProfile';

const UserService = {
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
  async follow(id, followUser) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      await Promise.all([
        UserProfile.updateOne({ user: id }, { $addToSet: { followed: followUser } }, { upsert: true }),
        UserProfile.updateOne({ user: followUser }, { $addToSet: { followers: id } }, { upsert: true }),
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

export default UserService;

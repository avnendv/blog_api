import { PER_PAGE } from '@/config/constants';
import User from '@/models/User';
import UserProfile from '@/models/UserProfile';
import { successResponse } from '@/utils';

const UserService = {
  async list(data) {
    const { limit = PER_PAGE, page = 1, keyword = '' } = data;

    const filters = {
      $or: [
        {
          userName: { $regex: keyword, $options: 'i' },
        },
        {
          email: { $regex: keyword, $options: 'i' },
        },
        {
          phone: { $regex: keyword, $options: 'i' },
        },
        {
          fullName: { $regex: keyword, $options: 'i' },
        },
      ],
    };

    const [users, totalDocs] = await Promise.all([
      await User.find(filters)
        .select('-password -facebookId -googleId -githubId')
        .skip((parseInt(page) - 1) * parseInt(limit))
        .limit(parseInt(limit)),
      await User.countDocuments(filters),
    ]);

    const pagination = { limit, page, total: totalDocs, pages: Math.ceil(totalDocs / limit) };

    return successResponse(users, pagination);
  },
  async store(data) {
    const user = await User.create(data);

    return successResponse(user.toResource());
  },
  async update({ id, ...data }) {
    const user = await User.findByIdAndUpdate(id, data, { new: true });

    if (!user)
      throw {
        msg: 'Data not found!',
      };

    return successResponse(user.toResource());
  },
  async destroy(id) {
    const [data] = await Promise.all([User.findByIdAndDelete(id), UserProfile.deleteOne({ user: id })]);

    if (!data.deletedCount)
      throw {
        msg: 'Data not found!',
      };

    return successResponse();
  },
};

export default UserService;

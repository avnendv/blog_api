import User from '@/models/User';
import { successResponse } from '@/utils';

const UserService = {
  async register(data) {
    const user = await User.create(data);

    return successResponse(user.toAuthJSON());
  },
  async login({ email, password }) {
    const msg = 'Tài khoản hoặc mật khẩu không chính xác';

    const user = await User.findOne({ email });
    if (!user) throw { msg };

    const isCorrectPassword = await user.isValidPassword(password);
    if (!isCorrectPassword) throw { msg };

    return successResponse(user.toAuthJSON());
  },
};

export default UserService;

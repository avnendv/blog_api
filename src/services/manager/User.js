import passport from 'passport';
import User from '@/models/User';
import { successResponse } from '@/utils';

const UserService = {
  async register(data) {
    const user = await User.create(data);

    return successResponse(user.toAuthJSON());
  },
  async login({ email, password }) {
    const msg = 'Username or password is incorrect';

    const user = await User.findOne({ email });
    if (!user) throw { msg };

    const isCorrectPassword = await user.isValidPassword(password);
    if (!isCorrectPassword) throw { msg };

    return (req, res, next) => {
      const token = user.generateJWT();
      req.body.token = token;
      console.log(token);
      passport.authenticate('jwt', (err, user) => {
        if (err) return next(err);
        if (!user) throw { msg: 'Login error' };

        return res.json(successResponse({ ...user, token }));
      })(req, res, next);
    };
  },
};

export default UserService;
import { AV_APP, A_SECOND } from '@/config/constants';
import { APP_CLIENT } from '@/config/env';
import AuthService from '@/services/core/AuthService';

const AuthController = {
  async profile(req, res, next) {
    try {
      const data = await AuthService.profile(req.user._id);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  async follow(req, res, next) {
    try {
      const data = await AuthService.follow({
        id: req.user._id,
        followed: '651f8851a2b0e41c7a4f43e9',
        type: req.body.type ?? true,
      });

      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  async authCallback(req, res, next) {
    try {
      const { token, ...userInfo } = req.user;
      const cookieOptions = { maxAge: A_SECOND * 60 * 60 * 24 * 7, secure: true };

      res.cookie(AV_APP.TOKEN, token, cookieOptions);
      res.cookie(AV_APP.USER_INFO, JSON.stringify(userInfo), cookieOptions);

      res.redirect(`${APP_CLIENT}/login`);
    } catch (error) {
      next(error);
    }
  },
};

export default AuthController;

import { AV_APP, A_SECOND } from '@/config/constants';
import { APP_CLIENT } from '@/config/env';
import TokenBacklist from '@/models/TokenBacklist';
import { changePasswordRequest, loginRequest, registerRequest } from '@/models/requests/AuthRequest';
import AuthService from '@/services/core/AuthService';
import { successResponse } from '@/utils';
import ApiError from '@/utils/ApiError';

const AuthController = {
  async register(req, res, next) {
    try {
      const { error } = registerRequest(req.body);
      if (error) throw new ApiError(error.details[0].message);

      const data = await AuthService.register(req.body);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  async login(req, res, next) {
    try {
      const { error } = loginRequest(req.body);
      if (error) throw new ApiError(error.details[0].message);

      const data = await AuthService.login(req.body);

      return data(req, res, next);
    } catch (error) {
      next(error);
    }
  },
  async check(req, res, next) {
    try {
      if (req.user) return res.json(successResponse(req.user));

      throw { code: 401, msg: '' };
    } catch (error) {
      next(error);
    }
  },
  async logout(req, res, next) {
    try {
      const { token } = req;
      req.logout(async (error) => {
        if (error) throw { msg: error };
        req.session.destroy();

        TokenBacklist.create({ token });

        return res.json(successResponse());
      });
    } catch (error) {
      next(error);
    }
  },
  // async profile(req, res, next) {
  //   try {
  //     if (!req.user) throw { code: 401, msg: '' };

  //     const data = await AuthService.profile(req.user._id);

  //     return res.json(data);
  //   } catch (error) {
  //     next(error);
  //   }
  // },
  async changePassword(req, res, next) {
    try {
      const { error } = changePasswordRequest(req.body);
      if (error) throw new ApiError(error.details[0].message);

      const data = await AuthService.changePassword(req.user._id, req.body);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
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

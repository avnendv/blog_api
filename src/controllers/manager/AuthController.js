import Backlist from '@/models/TokenBacklist';
import { changePasswordRequest, loginRequest, registerRequest } from '@/models/requests/Auth';
import AuthService from '@/services/manager/Auth';
import { successResponse } from '@/utils';

const AuthController = {
  async register(req, res, next) {
    try {
      const { error } = registerRequest(req.body);
      if (error) throw { msg: error.details[0].message };

      const data = await AuthService.register(req.body);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  async login(req, res, next) {
    try {
      const { error } = loginRequest(req.body);
      if (error) throw { msg: error.details[0].message };

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

        await Backlist.create({ token });

        return res.json(successResponse());
      });
    } catch (error) {
      next(error);
    }
  },
  async profile(req, res, next) {
    try {
      if (!req.user) throw { code: 401, msg: '' };

      const data = await AuthService.profile(req.user._id);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  async changePassword(req, res, next) {
    try {
      const { error } = changePasswordRequest(req.body);
      if (error) throw { msg: error.details[0].message };

      const data = await AuthService.changePassword(req.user._id, req.body);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
};

export default AuthController;

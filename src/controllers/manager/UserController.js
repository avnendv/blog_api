import { loginRequest, registerRequest } from '@/models/requests/User';
import UserService from '@/services/manager/User';

const UserController = {
  async register(req, res, next) {
    try {
      const { error } = registerRequest(req.body);
      if (error) throw { msg: error.details[0].message };

      const data = await UserService.register(req.body);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  async login(req, res, next) {
    try {
      const { error } = loginRequest(req.body);
      if (error) throw { msg: error.details[0].message };

      const data = await UserService.login(req.body);

      return data(req, res, next);
      // return res.json(data);
    } catch (error) {
      next(error);
    }
  },
};

export default UserController;

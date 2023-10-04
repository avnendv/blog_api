import { loginRequest, registerRequest } from '@/models/requests/User';
import UserService from '@/services/User';

const UserController = {
  register: async (req, res, next) => {
    try {
      const { error } = registerRequest(req.body);
      if (error) throw { msg: error.details[0].message };

      const data = await UserService.register(req.body);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { error } = loginRequest(req.body);
      if (error) throw { msg: error.details[0].message };

      const data = await UserService.login(req.body);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
};

export default UserController;

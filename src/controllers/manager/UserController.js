import { storeRequest, updateRequest } from '@/models/requests/UserRequest';
import UserService from '@/services/manager/UserService';
import ApiError from '@/utils/ApiError';

const UserController = {
  async list(req, res, next) {
    try {
      const data = await UserService.list(req.query);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  async store(req, res, next) {
    try {
      const { error } = storeRequest(req.body);
      if (error) throw new ApiError(error.details[0].message);

      const data = await UserService.store(req.body);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  async update(req, res, next) {
    try {
      const { id } = req.params;

      const { error } = updateRequest(req.body);
      if (error) throw new ApiError(error.details[0].message);

      const data = await UserService.update({ id, ...req.body });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  async destroy(req, res, next) {
    try {
      const { id } = req.params;

      const data = await UserService.destroy(id);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
};

export default UserController;

import { storeRequest, updateRequest } from '@/models/requests/Tag';
import TagService from '@/services/manager/Tag';
import ApiError from '@/utils/ApiError';

const TagController = {
  async list(req, res, next) {
    try {
      const data = await TagService.list(req.query);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  async store(req, res, next) {
    try {
      const { error } = storeRequest(req.body);
      if (error) throw new ApiError(error.details[0].message);

      const data = await TagService.store(req.body);
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

      const data = await TagService.update({ id, ...req.body });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  async destroy(req, res, next) {
    try {
      const { id } = req.params;

      const data = await TagService.destroy(id);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
};

export default TagController;

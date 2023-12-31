import { storeRequest, updateRequest } from '@/models/requests/TopicRequest';
import TopicService from '@/services/manager/TopicService';
import ApiError from '@/utils/ApiError';

const TopicController = {
  async list(req, res, next) {
    try {
      const data = await TopicService.list(req.query);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  async store(req, res, next) {
    try {
      const { error } = storeRequest(req.body);
      if (error) throw new ApiError(error.details[0].message);

      const data = await TopicService.store(req.body);
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

      const data = await TopicService.update({ id, ...req.body });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  async destroy(req, res, next) {
    try {
      const { id } = req.params;

      const data = await TopicService.destroy(id);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
};

export default TopicController;

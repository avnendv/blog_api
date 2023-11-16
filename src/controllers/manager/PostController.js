import { storeRequest, updateRequest } from '@/models/requests/Post';
import PostService from '@/services/manager/Post';
import ApiError from '@/utils/ApiError';

const PostController = {
  async list(req, res, next) {
    try {
      const data = await PostService.list(req.query);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  async series(req, res, next) {
    try {
      const data = await PostService.seriesByAuthor(req.user._id);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  async show(req, res, next) {
    try {
      const { id } = req.params;

      const data = await PostService.show(id);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  async store(req, res, next) {
    try {
      const { error } = storeRequest(req.body);
      if (error) throw new ApiError(error.details[0].message);

      const data = await PostService.store({ author: req.user._id, ...req.body });
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

      const data = await PostService.update({ id, ...req.body });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  async destroy(req, res, next) {
    try {
      const { id } = req.params;

      const data = await PostService.destroy(id);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
};

export default PostController;

import TagService from '@/services/core/TagService';

const TagController = {
  async list(req, res, next) {
    try {
      const data = await TagService.list(req.query);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
};

export default TagController;

import TopicService from '@/services/core/TopicService';

const TopicController = {
  async list(req, res, next) {
    try {
      const data = await TopicService.list(req.query);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
};

export default TopicController;

import PostService from '@/services/core/Post';

const PostController = {
  async show(req, res, next) {
    try {
      const { slug } = req.params;
      if (!slug) throw { msg: 'Parameter is required!' };

      const data = await PostService.show(slug);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  async listPostByTag(req, res, next) {
    try {
      const { tag } = req.params;
      if (!tag) throw { msg: 'Parameter is required!' };

      const data = await PostService.listPostByTag(tag);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  async listPostByTopic(req, res, next) {
    try {
      const { topic } = req.params;
      if (!topic) throw { msg: 'Parameter is required!' };

      const data = await PostService.listPostByTopic(topic);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
};

export default PostController;

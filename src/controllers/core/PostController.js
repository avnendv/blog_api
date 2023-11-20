import PostService from '@/services/core/PostService';

const PostController = {
  async show(req, res, next) {
    try {
      const { slug } = req.params;

      const data = await PostService.show(slug);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  async postTrending(req, res, next) {
    try {
      const data = await PostService.postTrending(req.query);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  async postNewest(req, res, next) {
    try {
      const data = await PostService.postNewest(req.query);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  async listPostByTag(req, res, next) {
    try {
      const { tag } = req.params;

      const data = await PostService.listPostByTag({ tag, ...req.query });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  async listPostByTopic(req, res, next) {
    try {
      const { topic } = req.params;

      const data = await PostService.listPostByTopic({ topic, ...req.query });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  async listPostByAuthor(req, res, next) {
    try {
      const { author } = req.params;

      const data = await PostService.listPostByAuthor({ author, ...req.query });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
};

export default PostController;

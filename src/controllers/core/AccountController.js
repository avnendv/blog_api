import AccountService from '@/services/core/AccountService';

const AccountController = {
  async personal(req, res, next) {
    try {
      const data = await AccountService.personal(req.user._id);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  async social(req, res, next) {
    try {
      const data = await AccountService.social(req.user._id);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  async bookmark(req, res, next) {
    try {
      const data = await AccountService.bookmark({ userId: req.user._id, ...req.query });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  async listPost(req, res, next) {
    try {
      const data = await AccountService.listPost({ userId: req.user._id, ...req.query });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  async togglePublish(req, res, next) {
    try {
      const data = await AccountService.togglePublish({ author: req.user._id, id: req.params.id, ...req.body });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
};

export default AccountController;

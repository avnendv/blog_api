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
};

export default AccountController;

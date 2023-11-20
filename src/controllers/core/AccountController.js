import AccountService from '@/services/core/AccountService';

const AccountController = {
  async bookmark(req, res, next) {
    try {
      const data = await AccountService.bookmark(req.user._id);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
};

export default AccountController;

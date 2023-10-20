import AuthService from '@/services/core/Auth';

const AuthController = {
  async profile(req, res, next) {
    try {
      const data = await AuthService.profile(req.user._id);

      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  async follow(req, res, next) {
    try {
      const data = await AuthService.follow({
        id: req.user._id,
        followed: '651f8851a2b0e41c7a4f43e9',
        type: req.body.type ?? true,
      });

      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  async authCallback(req, res, next) {
    try {
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  },
};

export default AuthController;

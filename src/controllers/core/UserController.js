import UserService from '@/services/core/User';

const UserController = {
  async profile(req, res, next) {
    try {
      const data = await UserService.profile('651d2e5853ac6188aa3f683d');

      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
  async follow(req, res, next) {
    try {
      const data = await UserService.follow({
        id: '651d2e5853ac6188aa3f683d',
        followed: '651f8851a2b0e41c7a4f43e9',
        type: req.body.type ?? true,
      });

      return res.json(data);
    } catch (error) {
      next(error);
    }
  },
};

export default UserController;

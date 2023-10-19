import Backlist from '@/models/TokenBacklist';

export const verifyToken = async (req, _res, next) => {
  try {
    const token =
      req.body.token ||
      req.query.token ||
      req.headers['x-access-token'] ||
      req.headers['authorization']?.split(' ')[1] ||
      req.cookies['jwt'];
    if (!token) throw { msg: 'A token is required for authentication!' };

    const isExists = await Backlist.exists({ token });
    isExists || (req.token = token);

    return next();
  } catch (error) {
    const err = error;
    if (!err.msg) err.msg = 'Invalid Token!';

    next(err);
  }
};

export const roles = (roles) => {
  return function (req, _res, next) {
    try {
      if (!req.userId) throw { msg: 'Invalid user!' };

      const role = 1; // role of user
      if (!roles.includes(role)) throw { msg: 'Permission not allowed!' };

      return next();
    } catch (error) {
      next(error);
    }
  };
};

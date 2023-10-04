import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '@/config/env';

export const verifyToken = (req, _res, next) => {
  try {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
      throw { msg: 'A token is required for authentication!' };
    }
    const decoded = jwt.verify(token, TOKEN_SECRET);
    req.userId = decoded._id;

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

import Joi from 'joi';
import { STATUS } from '@/config/constants';

const obj = {
  userName: Joi.string().trim().min(4).max(50).required(),
  password: Joi.string().trim().min(4).max(50).required(),
};

export const registerRequest = (data) => {
  const rule = Joi.object({
    ...obj,
    email: Joi.string().trim().min(4).max(50).required().email(),
    userName: Joi.string().trim().min(3).max(20).required(),
    fullName: Joi.string().trim().max(225).required(),
    birthday: Joi.date().allow(null, ''),
    avatar: Joi.string().allow(null, ''),
    gender: Joi.number().allow(null).integer(),
    phone: Joi.string().trim().max(12).allow(null, ''),
    address: Joi.string().trim().allow(null, ''),
    status: Joi.number().integer().valid(STATUS.DISABLE, STATUS.ENABLE),
  });

  return rule.validate(data);
};

export const loginRequest = (data) => {
  const rule = Joi.object(obj);

  return rule.validate(data);
};

export const changePasswordRequest = (data) => {
  const rule = Joi.object({
    currentPassword: Joi.string().trim().min(4).max(50).allow(null, ''),
    newPassword: Joi.string().trim().min(4).max(50),
    confirmPassword: Joi.ref('newPassword'),
  });

  return rule.validate(data);
};

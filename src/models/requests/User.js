import Joi from 'joi';
import { STATUS } from '@/config/constants';

const obj = {
  email: Joi.string().trim().min(4).max(50).required().email(),
  password: Joi.string().trim().min(4).max(50).required(),
  userName: Joi.string().trim().min(3).max(20).required(),
  fullName: Joi.string().trim().max(225).required(),
  birthday: Joi.date(),
  avatar: Joi.string(),
  gender: Joi.number().allow(null).integer(),
  phone: Joi.string().trim().max(12),
  address: Joi.string().trim(),
  status: Joi.number().integer().valid(STATUS.DISABLE, STATUS.ENABLE),
};

export const storeRequest = (data) => {
  const rule = Joi.object({
    ...obj,
  });

  return rule.validate(data);
};

export const updateRequest = (data) => {
  const rule = Joi.object({ ...obj, password: Joi.string().trim().min(4).max(50) });

  return rule.validate(data);
};

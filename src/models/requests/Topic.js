import Joi from 'joi';
import { STATUS } from '@/config/constants';

const obj = {
  slug: Joi.string(),
  thumbnail: Joi.string(),
  description: Joi.string(),
  isShowTop: Joi.boolean(),
  status: Joi.number().integer().valid(STATUS.DISABLE, STATUS.ENABLE),
};

export const storeRequest = (data) => {
  const rule = Joi.object({
    ...obj,
    title: Joi.string().trim().min(2).max(50).required(),
  });

  return rule.validate(data);
};

export const updateRequest = (data) => {
  const rule = Joi.object({
    ...obj,
    title: Joi.string().trim().min(2).max(50),
  });

  return rule.validate(data);
};

import Joi from 'joi';
import { POST_TYPE, PUBLISH, STATUS } from '@/config/constants';

const obj = {
  title: Joi.string().trim().min(2).max(50),
  content: Joi.string(),
  slug: Joi.string(),
  thumbnail: Joi.string(),
  description: Joi.string(),
  isShowTop: Joi.boolean(),
  status: Joi.number().integer().valid(STATUS.DISABLE, STATUS.ENABLE),
  publish: Joi.number()
    .integer()
    .valid(...Object.values(PUBLISH)),
  postType: Joi.number()
    .integer()
    .valid(...Object.values(POST_TYPE)),
  tag: Joi.array(),
  topic: Joi.string().trim(),
  series: Joi.string().trim(),
};

export const storeRequest = (data) => {
  const rule = Joi.object({
    ...obj,
    title: Joi.string().trim().min(2).max(50).required(),
    content: Joi.string().required(),
    topic: Joi.string().trim().required(),
  });

  return rule.validate(data);
};

export const updateRequest = (data) => {
  const rule = Joi.object({
    ...obj,
  });

  return rule.validate(data);
};

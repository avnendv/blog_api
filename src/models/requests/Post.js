import Joi from 'joi';

const obj = {
  title: Joi.string().trim().min(2).max(20),
  content: Joi.string(),
  slug: Joi.string(),
  thumbnail: Joi.string(),
  description: Joi.string(),
  isShowTop: Joi.boolean(),
  status: Joi.number().integer(),
  publish: Joi.number().integer(),
  postType: Joi.number().integer(),
  tag: Joi.array(),
  topic: Joi.string().trim(),
};

export const storeRequest = (data) => {
  const rule = Joi.object({
    ...obj,
    title: Joi.string().trim().min(2).max(20).required(),
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

import Joi from 'joi';

const obj = {
  slug: Joi.string(),
  thumbnail: Joi.string(),
  description: Joi.string(),
  isShowTop: Joi.boolean(),
  status: Joi.number(),
};

export const storeRequest = (data) => {
  const rule = Joi.object({
    ...obj,
    title: Joi.string().trim().min(2).max(20).required(),
  });

  return rule.validate(data);
};

export const updateRequest = (data) => {
  const rule = Joi.object({
    ...obj,
    title: Joi.string().trim().min(2).max(20),
  });

  return rule.validate(data);
};

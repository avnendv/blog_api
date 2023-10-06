import Joi from 'joi';

const obj = {
  description: Joi.string(),
  isShowTop: Joi.boolean(),
  status: Joi.number().integer(),
};

export const storeRequest = (data) => {
  const rule = Joi.object({
    ...obj,
    name: Joi.string().trim().min(2).max(20).required(),
  });

  return rule.validate(data);
};

export const updateRequest = (data) => {
  const rule = Joi.object({
    ...obj,
    name: Joi.string().trim().min(2).max(20),
  });

  return rule.validate(data);
};

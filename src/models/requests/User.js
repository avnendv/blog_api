import Joi from 'joi';

const obj = {
  email: Joi.string().trim().min(4).max(50).required().email(),
  password: Joi.string().trim().min(4).max(50).required(),
};

export const registerRequest = (data) => {
  const rule = Joi.object({
    ...obj,
    userName: Joi.string().trim().min(3).max(20).required(),
    fullName: Joi.string().trim().max(225).required(),
    birthday: Joi.date().allow(null, ''),
    avatar: Joi.string().allow(null, ''),
    gender: Joi.number().allow(null),
    phone: Joi.string().trim().max(12).allow(null, ''),
    address: Joi.string().trim().allow(null, ''),
    status: Joi.number(),
  });

  return rule.validate(data);
};

export const loginRequest = (data) => {
  const rule = Joi.object(obj);

  return rule.validate(data);
};

import Joi from 'joi';

export const markRequest = (data) => {
  const rule = Joi.object({
    mark: Joi.boolean(),
  });

  return rule.validate(data);
};

export const voteRequest = (data) => {
  const rule = Joi.object({
    vote: Joi.number(),
  });

  return rule.validate(data);
};

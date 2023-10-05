import logger from '@/logs/winston';
import { errorResponse } from '@/utils';

// eslint-disable-next-line no-unused-vars
export const errorHandle = (err, _req, res, _next) => {
  const message = err?.toString() ?? '';
  let msg;

  if (message?.includes('ValidationError')) msg = message;
  if (message?.includes('E11000')) msg = 'Field exists!';

  const error = errorResponse({ message, msg: err.msg ?? msg ?? 'Has some error! Please check your data' });
  const { isLogger, ...errorData } = error;

  isLogger && logger.error(JSON.stringify(error));

  return res.json({ result: errorData.result, msg: errorData.msg });
};

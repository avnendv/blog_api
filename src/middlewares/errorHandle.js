import logger from '@/logs/winston';

// eslint-disable-next-line no-unused-vars
export const errorHandle = (err, _req, res, _next) => {
  const { isLogger, ...errorData } = err;
  if (isLogger) {
    logger.error(JSON.stringify(errorData));
  }
  return res.json({ result: errorData.result, msg: errorData.msg });
};

import { errorResponse } from '@/utils';

// eslint-disable-next-line no-unused-vars
export const notfoundHandle = (req, res, next) => {
  const response = errorResponse({ isLogger: false, msg: 'Page Not Found!' });
  delete response.isLogger;
  return res.status(404).json(response);
};

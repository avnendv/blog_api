import { RESULT_FAIL, RESULT_OK } from '@/config/constants';

export const errorResponse = (error) => {
  const errorResponseData = {
    result: RESULT_FAIL,
    isLogger: true,
    msg: 'Server error!',
  };
  return { ...errorResponseData, ...error };
};

export const successResponse = (data = null, pagination = undefined) => {
  const responseData = {
    result: RESULT_OK,
    data,
    pagination,
  };
  return responseData;
};

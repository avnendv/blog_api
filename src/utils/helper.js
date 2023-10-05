import { RESULT_FAIL, RESULT_OK } from '@/config/constants';

export const errorResponse = (error) => {
  const errorResponseData = {
    result: RESULT_FAIL,
    isLogger: true,
    msg: 'Server error!',
  };
  return { ...errorResponseData, ...error };
};

export const successResponse = (data = {}) => {
  const responseData = {
    result: RESULT_OK,
    data,
  };
  return responseData;
};

/** slug generator */
export const slugify = (str, prefix = '-') =>
  String(str)
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[đ]/g, 'd') // change đ to d
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, prefix) // replace spaces with hyphens
    .replace(/-+/g, prefix); // remove consecutive hyphens +

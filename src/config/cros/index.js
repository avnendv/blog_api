import { StatusCodes } from 'http-status-codes';
import { WHITELIST_DOMAINS } from '../constants';
import { NODE_ENV } from '../env';
import ApiError from '@/utils/ApiError';

export const corsOptions = {
  origin(origin, callback) {
    if (!origin && NODE_ENV === 'development') return callback(null, true);

    // check domain is in whitelist domain
    if (WHITELIST_DOMAINS.filter(Boolean).includes(origin)) return callback(null, true);

    // If the domain is not accepted, an error is returned
    return callback(new ApiError(StatusCodes.FORBIDDEN, `${origin} not allowed by our CORS Policy.`));
  },

  // Some legacy browsers (IE11, various SmartTVs) choke on 204
  optionsSuccessStatus: 200,

  // CORS will allow receiving cookies from requests, (Tease :D | In the MERN Stack Advance advanced direct learning course, I will guide you to attach jwt access token and refresh token to httpOnly Cookies)
  credentials: true,
};

import { NODE_ENV, WHITELIST_DOMAINS_URL } from '../env';

export const A_SECOND = 1000;
export const RESULT_FAIL = 0;
export const RESULT_OK = 1;
export const PER_PAGE = 10;

export const AV_APP = {
  TOKEN: 'av__token',
  USER_INFO: 'av__user-info',
};

export const IS_PROD = NODE_ENV.includes('production');

export const WHITELIST_DOMAINS = [
  'http://localhost:4000',
  'http://127.0.0.1:4000',
  'http://localhost:4001',
  'http://127.0.0.1:4001',
  'http://localhost:4002',
  'http://127.0.0.1:4002',
  ...WHITELIST_DOMAINS_URL.split(','),
];

export const STATUS = {
  DELETED: -1,
  DISABLE: 0,
  ENABLE: 1,
};

export const PUBLISH = {
  DRAFT: 0,
  PUBLISHED: 1,
};

export const VOTE = {
  NO_VOTE: -1,
  DISLIKE: 0,
  LIKE: 1,
};

export const POST_TYPE = {
  POST: 1,
  SERIES: 2,
  POST_SERIES: 3,
};

export const GENDER = {
  FEMALE: 0,
  MALE: 1,
};

export const AUTH_TYPE = {
  LOCAL: 'local',
  SOCIAL: 'social',
};

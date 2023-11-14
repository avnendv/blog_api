import 'dotenv/config';

export const APP_URL = process.env.APP_URL || 'http://localhost';
export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const TOKEN_SECRET = process.env.TOKEN_SECRET || 'TOKEN_SECRET';
export const TOKEN_EXPIRE = process.env.TOKEN_EXPIRE || '24h';
export const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1/my_database';
export const MONGO_DB_NAME = process.env.MONGO_DB_NAME || 'blog-db';
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'GOOGLE_CLIENT_ID';
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'GOOGLE_CLIENT_SECRET';
export const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID || 'FACEBOOK_APP_ID';
export const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET || 'FACEBOOK_APP_SECRET';
export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || 'GITHUB_CLIENT_ID';
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || 'GITHUB_CLIENT_SECRET';
export const APP_CLIENT = process.env.APP_CLIENT || 'http://localhost:4001';

export const env = {
  APP_URL,
  APP_CLIENT,
  PORT,
  NODE_ENV,
  TOKEN_SECRET,
  TOKEN_EXPIRE,
  MONGO_URL,
  MONGO_DB_NAME,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
};

import 'dotenv/config';

export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const TOKEN_SECRET = process.env.TOKEN_SECRET || 'TOKEN_SECRET';
export const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1/my_database';
export const MONGO_DB_NAME = process.env.MONGO_DB_NAME || 'blog-db';

import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import logger from 'morgan';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import passport from 'passport';
import { MONGO_DB_NAME, MONGO_URL, NODE_ENV, TOKEN_SECRET } from '@/config/env';
import { A_SECOND } from '@/config/constants';
import setupPassport from '@/config/passport';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // store: ... , // Use an external store for more precise rate limiting
});

const storeConfig = {
  mongoUrl: MONGO_URL,
  autoRemove: 'native',
  dbName: MONGO_DB_NAME,
  ttl: 7 * 24 * 60 * 60, // 7 days
  crypto: {
    secret: 'squirrel',
  },
};

export const setupLibs = (app) => {
  app.use(logger('dev'));
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: false, limit: '1mb' }));
  app.use(cookieParser());
  app.use(
    session({
      secret: TOKEN_SECRET,
      cookie: { maxAge: 24 * 60 * 60 * A_SECOND }, // 24 hours
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create(storeConfig),
    })
  );
  app.use(cors());
  app.use(helmet());
  app.use(compression());

  // passport config
  setupPassport(passport);
  app.use(passport.initialize());
  app.use(passport.session());

  // Apply the rate limiting middleware to all requests on production
  if (NODE_ENV === 'production') app.use(limiter);
};

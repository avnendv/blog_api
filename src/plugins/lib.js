import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import passport from 'passport';
import { NODE_ENV } from '@/config/env';
import setupPassport from '@/config/passport';
import { corsOptions } from '@/config/cros';
import limiter from '@/config/rateLimit';
import session from '@/config/session';

export const setupLibs = (app) => {
  app.use(logger('dev'));
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: false, limit: '1mb' }));
  app.use(cookieParser());
  app.use(session);
  app.use(cors(corsOptions));
  app.use(helmet());
  app.use(compression());

  // passport config
  setupPassport(passport);
  app.use(passport.initialize());
  app.use(passport.session());

  // Apply the rate limiting middleware to all requests on production
  if (NODE_ENV === 'production') app.use(limiter);
};

import session from 'express-session';
import MongoStore from 'connect-mongo';
import { MONGO_DB_NAME, MONGO_URL, TOKEN_SECRET } from '../env';
import { A_SECOND } from '../constants';

const storeConfig = {
  mongoUrl: MONGO_URL,
  autoRemove: 'native',
  dbName: MONGO_DB_NAME,
  ttl: 7 * 24 * 60 * 60, // 7 days
  crypto: {
    secret: 'squirrel',
  },
};

export default session({
  secret: TOKEN_SECRET,
  cookie: { maxAge: 24 * 60 * 60 * A_SECOND }, // 24 hours
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create(storeConfig),
});

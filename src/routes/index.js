import userRoute from './user';
import { HelloWorld } from '@/controllers';

import { errorHandle } from '@/middlewares';

const router = (app) => {
  const v1Prefix = '/api/v1';

  // say hello world
  app.get('/', HelloWorld);

  // user
  app.use(`${v1Prefix}`, userRoute);

  // handle errors
  app.use(errorHandle);
};

export default router;

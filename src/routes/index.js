import userRoute from './user';
import tagRoute from './tag';
import topicRoute from './topic';
import { HelloWorld } from '@/controllers';

import { errorHandle } from '@/middlewares';

const router = (app) => {
  const v1Prefix = '/api/v1';

  // say hello world
  app.get('/', HelloWorld);

  app.use(`${v1Prefix}`, userRoute);
  app.use(`${v1Prefix}`, tagRoute);
  app.use(`${v1Prefix}`, topicRoute);

  // handle errors
  app.use(errorHandle);
};

export default router;

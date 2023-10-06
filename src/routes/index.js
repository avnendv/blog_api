import userRoute from './user';
import tagRoute from './tag';
import topicRoute from './topic';
import postRoute from './post';
import HelloWorldController from '@/controllers/HelloWorldController';

import { errorHandle } from '@/middlewares';

const router = (app) => {
  const v1Prefix = '/api/v1';

  app.get('/', HelloWorldController);

  app.use(`${v1Prefix}`, userRoute);
  app.use(`${v1Prefix}`, tagRoute);
  app.use(`${v1Prefix}`, topicRoute);
  app.use(`${v1Prefix}`, postRoute);

  // handle errors
  app.use(errorHandle);
};

export default router;

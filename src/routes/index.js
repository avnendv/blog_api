import ManagerRouter from './manager';
import HelloWorldController from '@/controllers/HelloWorldController';

import { errorHandle } from '@/middlewares';

const router = (app) => {
  const v1Prefix = '/api/v1';

  app.get('/', HelloWorldController);

  app.use(`${v1Prefix}/admin`, ManagerRouter);

  // handle errors
  app.use(errorHandle);
};

export default router;

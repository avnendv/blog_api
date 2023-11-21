import ClientRouter from './core';
import ManagerRouter from './manager';
import HelloWorldController from '@/controllers/HelloWorldController';

import { errorHandle, notfoundHandle } from '@/middlewares';

const router = (app) => {
  const v1Prefix = '/api/v1';

  app.get('/', HelloWorldController);

  app.use(`${v1Prefix}/admin`, ManagerRouter);
  app.use(`${v1Prefix}`, ClientRouter);

  // handle 404 not found route
  app.use(notfoundHandle);
  // handle errors
  app.use(errorHandle);
};

export default router;

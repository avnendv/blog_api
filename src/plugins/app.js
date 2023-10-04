import { setupLibs } from './lib';
import swagger from '@/swagger';
import router from '@/routes';

export const setupApp = (app) => {
  // setup libs
  setupLibs(app);

  // register routes
  router(app);

  // register swagger
  swagger(app);
};

import express from 'express';
import passport from 'passport';
import PostController from '@/controllers/manager/PostController';
import { verifyToken } from '@/middlewares/auth';

const router = express.Router();
const PREFIX = '/post';

router.use('*', verifyToken, passport.authenticate('jwt'));
router.route(`${PREFIX}`).get(PostController.list).post(PostController.store);
router
  .route(`${PREFIX}/:id`)
  .get(PostController.show)
  .patch(PostController.toggleApproved)
  .put(PostController.update)
  .delete(PostController.destroy);
router.get(`${PREFIX}/series`, PostController.series);

export default router;

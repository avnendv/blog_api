import express from 'express';
import passport from 'passport';
import PostController from '@/controllers/manager/PostController';
import { verifyToken } from '@/middlewares/auth';

const router = express.Router();
const PREFIX = '/post';

router.use('*', verifyToken, passport.authenticate('jwt'));
router.get(`${PREFIX}`, PostController.list);
router.get(`${PREFIX}/series`, PostController.series);
router.get(`${PREFIX}/:id`, PostController.show);
router.post(`${PREFIX}`, PostController.store);
router.put(`${PREFIX}/:id`, PostController.update);
router.delete(`${PREFIX}/:id`, PostController.destroy);

export default router;

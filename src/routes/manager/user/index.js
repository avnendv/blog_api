import express from 'express';
import passport from 'passport';
import userRoute from '@/routes/core/user';
import { verifyToken } from '@/middlewares/auth';
import UserController from '@/controllers/manager/UserController';

const router = express.Router();
const PREFIX = '/user';

// auth
router.use(userRoute);

// user
router.use('*', verifyToken, passport.authenticate('jwt'));
router.route(`${PREFIX}`).get(UserController.list).post(UserController.store);
router.route(`${PREFIX}/:id`).put(UserController.update).delete(UserController.destroy);

export default router;

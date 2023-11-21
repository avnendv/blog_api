import express from 'express';
import passport from 'passport';
import { verifyToken } from '@/middlewares/auth';
import UserController from '@/controllers/manager/UserController';
import AuthController from '@/controllers/core/AuthController';

const router = express.Router();
const PREFIX = '/user';

// auth
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/check', verifyToken, passport.authenticate('jwt'), AuthController.check);
router.delete('/logout', verifyToken, passport.authenticate('jwt'), AuthController.logout);
router.post('/change-password', verifyToken, passport.authenticate('jwt'), AuthController.changePassword);

// user
router.use('*', verifyToken, passport.authenticate('jwt'));
router.route(`${PREFIX}`).get(UserController.list).post(UserController.store);
router.route(`${PREFIX}/:id`).put(UserController.update).delete(UserController.destroy);

export default router;

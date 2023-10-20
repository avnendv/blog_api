import express from 'express';
import passport from 'passport';
import AuthController from '@/controllers/manager/AuthController';
import { verifyToken } from '@/middlewares/auth';
import UserController from '@/controllers/manager/UserController';

const router = express.Router();
const PREFIX = '/user';

// auth
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/check', verifyToken, passport.authenticate('jwt'), AuthController.check);
router.get('/profile', verifyToken, passport.authenticate('jwt'), AuthController.profile);
router.delete('/logout', verifyToken, passport.authenticate('jwt'), AuthController.logout);
router.post('/change-password', verifyToken, passport.authenticate('jwt'), AuthController.changePassword);

// user
router.get(`${PREFIX}`, verifyToken, passport.authenticate('jwt'), UserController.list);
router.post(`${PREFIX}`, verifyToken, passport.authenticate('jwt'), UserController.store);
router.put(`${PREFIX}/:id`, verifyToken, passport.authenticate('jwt'), UserController.update);
router.delete(`${PREFIX}/:id`, verifyToken, passport.authenticate('jwt'), UserController.destroy);

export default router;

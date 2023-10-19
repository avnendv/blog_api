import express from 'express';
import passport from 'passport';
import UserController from '@/controllers/manager/UserController';
import { verifyToken } from '@/middlewares/auth';

const router = express.Router();

// auth
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/check', verifyToken, passport.authenticate('jwt'), UserController.check);
router.get('/profile', verifyToken, passport.authenticate('jwt'), UserController.profile);
router.delete('/logout', verifyToken, passport.authenticate('jwt'), UserController.logout);

export default router;

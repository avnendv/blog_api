import express from 'express';
import passport from 'passport';
import UserController from '@/controllers/manager/UserController';

const router = express.Router();

// auth
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/check', passport.authenticate('jwt', { session: false }), UserController.check);
router.get('/profile', passport.authenticate('jwt', { session: false }), UserController.profile);
router.delete('/logout', UserController.logout);

export default router;

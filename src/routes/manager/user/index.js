import express from 'express';
import passport from 'passport';
import UserController from '@/controllers/manager/UserController';

const router = express.Router();

// auth
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/check', passport.authenticate('jwt'), UserController.check);
router.get('/profile', passport.authenticate('jwt'), UserController.profile);
router.delete('/logout', passport.authenticate('jwt'), UserController.logout);

export default router;

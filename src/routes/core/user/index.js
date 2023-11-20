import express from 'express';
import passport from 'passport';
// import userRoute from '@/routes/manager/user';
import AuthController from '@/controllers/core/AuthController';
import { verifyToken } from '@/middlewares';

const router = express.Router();

// auth
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/check', verifyToken, passport.authenticate('jwt'), AuthController.check);
router.get('/profile', verifyToken, passport.authenticate('jwt'), AuthController.profile);
router.post('/follow', verifyToken, passport.authenticate('jwt'), AuthController.follow);
router.delete('/logout', verifyToken, passport.authenticate('jwt'), AuthController.logout);
router.post('/change-password', verifyToken, passport.authenticate('jwt'), AuthController.changePassword);

// login social
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);
router.get('/github', passport.authenticate('github'));
router.get('/facebook', passport.authenticate('facebook', { scope: ['profile'] }));
router.get('/google/callback', passport.authenticate('google'), AuthController.authCallback);
router.get('/github/callback', passport.authenticate('github'), AuthController.authCallback);
router.get('/facebook/callback', passport.authenticate('facebook'), AuthController.authCallback);

export default router;

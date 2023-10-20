import express from 'express';
import passport from 'passport';
import userRoute from '@/routes/manager/user';
import AuthController from '@/controllers/core/AuthController';

const router = express.Router();

router.get('/profile', AuthController.profile);
router.post('/follow', AuthController.follow);

// default use userRoute admin
router.use(userRoute);

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

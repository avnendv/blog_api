import express from 'express';
import passport from 'passport';
import userRoute from '@/routes/manager/user';
import UserController from '@/controllers/core/UserController';

const router = express.Router();

router.get('/profile', UserController.profile);
router.post('/follow', UserController.follow);

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
router.get('/google/callback', passport.authenticate('google'), UserController.authCallback);
router.get('/github/callback', passport.authenticate('github'), UserController.authCallback);
router.get('/facebook/callback', passport.authenticate('facebook'), UserController.authCallback);

export default router;

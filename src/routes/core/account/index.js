import express from 'express';
import passport from 'passport';
import AccountController from '@/controllers/core/AccountController';
import { verifyToken } from '@/middlewares/auth';

const router = express.Router();
const PREFIX = '/account';

router.use('*', verifyToken, passport.authenticate('jwt'));

router.get(`${PREFIX}/personal`, AccountController.personal);
router.get(`${PREFIX}/social`, AccountController.social);
router.get(`${PREFIX}/bookmark`, AccountController.bookmark);

export default router;

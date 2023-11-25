import express from 'express';
import passport from 'passport';
import AccountController from '@/controllers/core/AccountController';
import PostController from '@/controllers/manager/PostController';

import { verifyToken } from '@/middlewares/auth';

const router = express.Router();
const PREFIX = '/account';

router.use('*', verifyToken, passport.authenticate('jwt'));

router.get(`${PREFIX}/personal`, AccountController.personal);
router.get(`${PREFIX}/social`, AccountController.social);
router.get(`${PREFIX}/bookmark`, AccountController.bookmark);
router.get(`${PREFIX}/series`, PostController.series);
router.get(`${PREFIX}/posts`, AccountController.listPost);
router.post(`${PREFIX}/post`, PostController.store);
router.put(`${PREFIX}/post/:id`, PostController.update);
router.delete(`${PREFIX}/post/:id`, PostController.destroy);
router.patch(`${PREFIX}/post/:id/publish`, AccountController.togglePublish);

export default router;

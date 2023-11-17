import express from 'express';
import passport from 'passport';
import PostInfoController from '@/controllers/core/PostInfoController';
import PostController from '@/controllers/core/PostController';
import { verifyToken } from '@/middlewares/auth';

const router = express.Router();
const PREFIX = '/post';
const PREFIX_TAG = '/tags';
const PREFIX_TOPIC = '/topics';
const PREFIX_AUTHOR = '/author';

router.get(`${PREFIX}/trending`, PostController.postTrending);
router.get(`${PREFIX}/newest`, PostController.postNewest);
router.get(`${PREFIX}/:id/info`, verifyToken, passport.authenticate('jwt'), PostInfoController.info);
router.patch(`${PREFIX}/:id/mark`, verifyToken, passport.authenticate('jwt'), PostInfoController.mark);
router.patch(`${PREFIX}/:id/vote`, verifyToken, passport.authenticate('jwt'), PostInfoController.vote);

router.get(`${PREFIX}/:slug`, PostController.show);
router.get(`${PREFIX_TAG}/:tag`, PostController.listPostByTag);
router.get(`${PREFIX_TOPIC}/:topic`, PostController.listPostByTopic);
router.get(`${PREFIX_AUTHOR}/:author`, PostController.listPostByAuthor);

export default router;

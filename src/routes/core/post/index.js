import express from 'express';
import PostInfoController from '@/controllers/core/PostInfoController';
import PostController from '@/controllers/core/PostController';

const router = express.Router();
const PREFIX = '/post';
const PREFIX_TAG = '/tags';
const PREFIX_TOPIC = '/topics';

router.get(`${PREFIX}/trending`, PostController.postTrending);
router.get(`${PREFIX}/newest`, PostController.postNewest);
router.patch(`${PREFIX}/:id/mark`, PostInfoController.mark);
router.patch(`${PREFIX}/:id/vote`, PostInfoController.vote);

router.get(`${PREFIX}/:slug`, PostController.show);
router.get(`${PREFIX_TAG}/:tag`, PostController.listPostByTag);
router.get(`${PREFIX_TOPIC}/:topic`, PostController.listPostByTopic);

export default router;

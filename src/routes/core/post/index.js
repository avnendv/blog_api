import express from 'express';
import PostInfoController from '@/controllers/core/PostInfoController';

const router = express.Router();
const PREFIX = '/post';

router.patch(`${PREFIX}/:id/mark`, PostInfoController.mark);
router.patch(`${PREFIX}/:id/vote`, PostInfoController.vote);

export default router;

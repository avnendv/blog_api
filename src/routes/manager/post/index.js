import express from 'express';
import PostController from '@/controllers/manager/PostController';
import PostInfoController from '@/controllers/manager/PostInfoController';

const router = express.Router();
const PREFIX = '/post';

router.get(`${PREFIX}`, PostController.list);
router.post(`${PREFIX}`, PostController.store);
router.put(`${PREFIX}/:id`, PostController.update);
router.delete(`${PREFIX}/:id`, PostController.destroy);
router.patch(`${PREFIX}/:id/mark`, PostInfoController.mark);
router.patch(`${PREFIX}/:id/vote`, PostInfoController.vote);

export default router;

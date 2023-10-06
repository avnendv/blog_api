import express from 'express';
import PostController from '@/controllers/PostController';

const router = express.Router();
const PREFIX = '/post';

router.get(`${PREFIX}`, PostController.list);
router.post(`${PREFIX}`, PostController.store);
router.put(`${PREFIX}/:id`, PostController.update);
router.delete(`${PREFIX}/:id`, PostController.destroy);

export default router;

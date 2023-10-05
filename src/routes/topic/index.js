import express from 'express';
import TopicController from '@/controllers/TopicController';

const router = express.Router();
const PREFIX = '/topic';

router.get(`${PREFIX}`, TopicController.list);
router.post(`${PREFIX}`, TopicController.store);
router.put(`${PREFIX}/:id`, TopicController.update);
router.delete(`${PREFIX}/:id`, TopicController.destroy);

export default router;

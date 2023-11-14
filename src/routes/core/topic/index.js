import express from 'express';
import TopicController from '@/controllers/core/TopicController';

const router = express.Router();
const PREFIX = '/topic';

router.get(`${PREFIX}`, TopicController.list);

export default router;

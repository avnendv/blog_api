import express from 'express';
import TagController from '@/controllers/core/TagController';

const router = express.Router();
const PREFIX = '/tag';

router.get(`${PREFIX}`, TagController.list);

export default router;

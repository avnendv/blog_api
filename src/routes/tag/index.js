import express from 'express';
import TagController from '@/controllers/TagController';

const router = express.Router();
const PREFIX = '/tag';

router.get(`${PREFIX}`, TagController.list);
router.post(`${PREFIX}`, TagController.store);
router.put(`${PREFIX}/:id`, TagController.update);
router.delete(`${PREFIX}/:id`, TagController.destroy);

export default router;

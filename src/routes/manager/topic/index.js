import express from 'express';
import passport from 'passport';
import TopicController from '@/controllers/manager/TopicController';
import { verifyToken } from '@/middlewares/auth';

const router = express.Router();
const PREFIX = '/topic';

router.use('*', verifyToken, passport.authenticate('jwt'));
router.get(`${PREFIX}`, TopicController.list);
router.post(`${PREFIX}`, TopicController.store);
router.put(`${PREFIX}/:id`, TopicController.update);
router.delete(`${PREFIX}/:id`, TopicController.destroy);

export default router;

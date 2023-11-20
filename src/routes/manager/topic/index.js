import express from 'express';
import passport from 'passport';
import TopicController from '@/controllers/manager/TopicController';
import { verifyToken } from '@/middlewares/auth';

const router = express.Router();
const PREFIX = '/topic';

router.use('*', verifyToken, passport.authenticate('jwt'));
router.route(`${PREFIX}`).get(TopicController.list).post(TopicController.store);
router.route(`${PREFIX}/:id`).put(TopicController.update).delete(TopicController.destroy);

export default router;

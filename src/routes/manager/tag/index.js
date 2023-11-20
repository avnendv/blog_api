import express from 'express';
import passport from 'passport';
import TagController from '@/controllers/manager/TagController';
import { verifyToken } from '@/middlewares/auth';

const router = express.Router();
const PREFIX = '/tag';

router.use('*', verifyToken, passport.authenticate('jwt'));
router.route(`${PREFIX}`).get(TagController.list).post(TagController.store);
router.route(`${PREFIX}/:id`).put(TagController.update).delete(TagController.destroy);

export default router;

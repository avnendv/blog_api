import express from 'express';
import passport from 'passport';
import TagController from '@/controllers/manager/TagController';

const router = express.Router();
const PREFIX = '/tag';

router.use('*', passport.authenticate('jwt'));
router.get(`${PREFIX}`, TagController.list);
router.post(`${PREFIX}`, TagController.store);
router.put(`${PREFIX}/:id`, TagController.update);
router.delete(`${PREFIX}/:id`, TagController.destroy);

export default router;

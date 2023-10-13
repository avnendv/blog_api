import express from 'express';
import userRoute from '@/routes/manager/user';
import UserController from '@/controllers/core/UserController';

const router = express.Router();

router.get('/profile', UserController.profile);
router.post('/follow', UserController.follow);
// default use userRoute admin
router.use(userRoute);

export default router;

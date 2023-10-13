import express from 'express';
import userRoute from './user';

const router = express.Router();

router.use('/', userRoute);

export default router;

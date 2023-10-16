import express from 'express';
import userRoute from './user';
import postRoute from './post';

const router = express.Router();

router.use('/', userRoute, postRoute);

export default router;

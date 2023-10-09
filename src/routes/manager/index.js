import express from 'express';
import userRoute from './user';
import tagRoute from './tag';
import topicRoute from './topic';
import postRoute from './post';

const router = express.Router();

router.use('/', userRoute, tagRoute, topicRoute, postRoute);

export default router;

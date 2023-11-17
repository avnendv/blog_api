import express from 'express';
import searchRoute from './search';
import userRoute from './user';
import topicRoute from './topic';
import postRoute from './post';
import accountRoute from './account';

const router = express.Router();

router.use('/', searchRoute, userRoute, topicRoute, postRoute, accountRoute);

export default router;

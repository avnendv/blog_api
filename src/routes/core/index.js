import express from 'express';
import searchRoute from './search';
import userRoute from './user';
import postRoute from './post';

const router = express.Router();

router.use('/', searchRoute, userRoute, postRoute);

export default router;

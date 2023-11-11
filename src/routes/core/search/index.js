import express from 'express';
import SearchController from '@/controllers/core/SearchController';

const router = express.Router();

router.get('/search', SearchController.search);

export default router;

import express from 'express';
import UserController from '@/controllers/UserController';

const router = express.Router();

// auth
router.post('/register', UserController.register);
router.post('/login', UserController.login);

export default router;

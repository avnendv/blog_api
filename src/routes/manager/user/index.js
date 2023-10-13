import express from 'express';
import UserController from '@/controllers/manager/UserController';

const router = express.Router();

// auth
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/check', UserController.check);
router.get('/profile', UserController.profile);
router.delete('/logout', UserController.logout);

export default router;

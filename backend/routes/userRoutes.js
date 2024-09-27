import express from 'express';
import { registerUser, loginUser, getAllUsers } from '../controllers/userController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', authMiddleware, adminMiddleware, getAllUsers); // Admin yetkili

export default router;

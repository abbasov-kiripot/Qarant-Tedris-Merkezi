import express from 'express';
import { registerUser, loginUser, getAllUsers } from '../controllers/userController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser); // Kullanıcı kaydı
router.post('/login', loginUser); // Kullanıcı girişi
router.get('/', authMiddleware, adminMiddleware, getAllUsers); // Tüm kullanıcıları listele (Sadece admin)

export default router;

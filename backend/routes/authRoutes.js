import express from 'express';
import { register, login, authenticateToken } from '../controllers/authController.js';

const router = express.Router();

// Kullanıcı kaydı
router.post('/register', register);

// Kullanıcı girişi
router.post('/login', login);

// Örnek korumalı rota
router.get('/protected', authenticateToken, (req, res) => {
  res.send('This is a protected route');
});

export default router;

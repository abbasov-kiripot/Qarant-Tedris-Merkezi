import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// Kullanıcı giriş yapma
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Kullanıcıyı email ile bul
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      // Token oluştur
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
      res.status(200).json({ token, message: 'Giriş başarılı!' });
    } else {
      res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre' });
    }
  } catch (error) {
    // Hata oluşursa 500 ile yanıt ver
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
});

export default router;

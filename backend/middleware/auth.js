// routes/auth.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Kullanıcı kaydı
router.post('/register', async (req, res) => {
  const { username, email, phone, password } = req.body;

  try {
    // Kullanıcının zaten var olup olmadığını kontrol et
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Bu kullanıcı adı zaten alınmış.' });
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcı oluştur
    const newUser = new User({ username, email, phone, password: hashedPassword });
    await newUser.save();

    // Token oluştur
    const token = jwt.sign({ userId: newUser._id }, 'secretkey', { expiresIn: '1h' });

    res.status(201).json({ token, message: 'Qeydiyyat uğurla tamamlandı!' });
  } catch (error) {
    res.status(500).json({ message: 'Qeydiyyat zamanı bir hata oluştu.' });
  }
});

export default router;

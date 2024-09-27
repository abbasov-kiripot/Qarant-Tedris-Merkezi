import express from 'express';

const router = express.Router();

// Yeni kullanıcı kaydı yapma
router.post('/register', async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    // Yeni kullanıcıyı oluşturuyoruz
    const newUser = new User({
      username,
      email,
      phone,
      password,
    });

    await newUser.save();

    res.status(201).json({ message: 'Kullanıcı başarıyla oluşturuldu.' });
  } catch (error) {
    res.status(500).json({ message: 'Kullanıcı oluşturulurken bir hata oluştu.' });
  }
});

// Admin panelinde kullanıcıları listeleme, silme ve düzenleme işlemleri buraya eklenebilir.

export default router;

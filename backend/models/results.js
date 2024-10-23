import express from 'express';
import bcrypt from 'bcrypt';

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

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Email veya şifre hatalı." });
    }

    // Giriş başarılı
    return res.status(200).json({ message: "Giriş başarılı!" });
  } catch (error) {
    return res.status(500).json({ message: "Sunucu hatası." });
  }
});

// Admin panelinde kullanıcıları listeleme, silme ve düzenleme işlemleri buraya eklenebilir.

// Şifreyi kaydetmeden önce hash'leriz
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

// Şifre doğrulama fonksiyonu
userSchema.methods.isPasswordCorrect = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
export default router;
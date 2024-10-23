import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// Yeni kullanıcı oluşturma
export const createUser = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    // Şifre hashleme
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcıyı kaydet
    const newUser = new User({
      username,
      email,
      phone,
      password: hashedPassword,  // Hashlenmiş şifre
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Bu e-posta zaten kullanılıyor.' });
    }
    res.status(500).json({ message: 'Kullanıcı kaydedilirken bir hata oluştu.' });
  }
};

// Kullanıcı girişi yapma
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Kullanıcının email ile var olup olmadığını kontrol et
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Kullanıcı bulunamadı. Lütfen e-posta adresinizi kontrol edin.' });
    }

    // Şifre doğrulama
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Geçersiz şifre. Lütfen tekrar deneyin.' });
    }

    // Başarılı giriş sonrası JWT token oluştur
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || 'GIZLIANAHTAR', { expiresIn: '1h' });

    // Başarılı giriş yanıtı
    res.status(200).json({ 
      message: 'Giriş başarılı', 
      token,
      user: {
        id: user._id,
        email: user.email,
        // İsterseniz burada daha fazla kullanıcı bilgisi ekleyebilirsiniz
      } 
    });
  } catch (error) {
    console.error('Giriş hatası:', error); // Hata detaylarını konsola yazdır
    res.status(500).json({ message: 'Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.' });
  }
};

// Tüm kullanıcıları getirme
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Kullanıcılar getirilirken bir hata oluştu.' });
  }
};

// Kullanıcı güncelleme
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body; // Şifreyi body'den al

    // Eğer şifre varsa, hashle
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      req.body.password = hashedPassword; // Body'deki şifreyi hashlenmiş olarak güncelle
    }

    // Kullanıcıyı güncelle
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }
    
    // Güncellenen kullanıcıyı yanıt olarak döndür
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Kullanıcı güncellenirken bir hata oluştu.' });
  }
};

// Kullanıcı silme
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }
    res.status(200).json({ message: 'Kullanıcı silindi.' });
  } catch (error) {
    res.status(500).json({ message: 'Kullanıcı silinirken bir hata oluştu.' });
  }
};

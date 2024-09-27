// controllers/resultsController.js
import User from '../models/User.js';

// Yeni kullanıcı oluşturma
export const createUser = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    // Şifrelerin eşleştiğini kontrol et
    if (password.length < 6) {
      return res.status(400).json({ message: 'Şifre en az 6 karakter olmalıdır.' });
    }

    // Kullanıcıyı veritabanına kaydet
    const newUser = new User({ username, email, phone, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    // E-posta benzersiz olmalıdır
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Bu e-posta zaten kullanılıyor.' });
    }
    res.status(500).json({ message: 'Kullanıcı kaydedilirken bir hata oluştu.' });
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
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }
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

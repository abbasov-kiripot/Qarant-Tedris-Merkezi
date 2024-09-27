import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Kullanıcı Kaydı
export const registerUser = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const user = new User({ username, password, role });
        await user.save();
        res.status(201).json({ message: "Kullanıcı başarıyla kaydedildi!" });
    } catch (error) {
        res.status(400).json({ message: "Kullanıcı kaydedilirken bir hata oluştu.", error });
    }
};

// Kullanıcı Girişi
export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Geçersiz kullanıcı adı veya şifre." });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Geçersiz kullanıcı adı veya şifre." });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Giriş işlemi sırasında bir hata oluştu.", error });
    }
};

// Kullanıcıları Listele (Admin yetkisi ile)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Kullanıcılar alınırken bir hata oluştu.", error });
    }
};

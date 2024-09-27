// controllers/accountController.js
import Account from '../models/account.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const account = await Account.findOne({ username });
    if (!account) return res.status(404).json({ message: 'Kullanıcı bulunamadı' });

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) return res.status(400).json({ message: 'Yanlış şifre' });

    const token = jwt.sign({ id: account._id }, 'secret', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Bir hata oluştu' });
  }
};

export const createAccount = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAccount = new Account({ username, password: hashedPassword });
    await newAccount.save();
    res.status(201).json({ message: 'Kullanıcı oluşturuldu' });
  } catch (err) {
    res.status(500).json({ message: 'Bir hata oluştu' });
  }
};

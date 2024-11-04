import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer token formatında token al
  if (!token) return res.status(401).json({ message: 'Erişim reddedildi' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Anahtarı .env dosyasından al
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Geçersiz token' });
  }
};

export default authMiddleware;

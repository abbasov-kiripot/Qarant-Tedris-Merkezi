import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Sipariş oluşturma
router.post('/', async (req, res) => {
  const { firstName, lastName, email, street, phone, paymentMethod, examDate, city, examType, ticketPrice, receiptFile } = req.body;

  const newOrder = new Order({
    firstName,
    lastName,
    email,
    street,
    phone,
    paymentMethod,
    examDate,
    city,
    examType,
    ticketPrice,
    receiptFile,
  });

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Sipariş kaydetme hatası", error });
  }
});

// Tüm siparişleri listeleme
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Siparişleri listeleme hatası", error });
  }
});

// Belirli bir siparişi silme (bilgilerle)
router.delete('/', async (req, res) => {
  const { firstName, lastName, email } = req.body; // Silinecek sipariş bilgileri burada alınıyor

  // Gerekli bilgiler eksikse hata döndür
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ message: 'Siparişi silmek için gerekli bilgiler eksik.' });
  }

  try {
    const deletedOrder = await Order.findOneAndDelete({ firstName, lastName, email });

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Sipariş bulunamadı.' });
    }

    res.status(200).json({ message: 'Sipariş başarıyla silindi.' });
  } catch (error) {
    res.status(500).json({ message: 'Sipariş silme hatası.', error });
  }
});

export default router;

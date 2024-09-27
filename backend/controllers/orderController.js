import Order from '../models/Order.js';
import mongoose from 'mongoose'; // Mongoose'i dahil et

// Sipariş oluşturma
export const createOrder = async (req, res) => {
  try {
    const { firstName, lastName, email, street, phone, paymentMethod, examDate, city, examType, ticketPrice } = req.body;
    const receiptFileName = req.file ? req.file.filename : null; // CV dosyasının adı

    const newOrder = new Order({
      firstName,
      lastName,
      email,
      street,
      phone,
      paymentMethod,
      receiptFileName,
      examDate,
      city,
      examType,
      ticketPrice
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Siparişleri listeleme
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Sipariş silme
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // ID'nin geçerli bir ObjectId olup olmadığını kontrol et
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid order ID.' });
    }

    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found.' });
    }
    res.status(200).json({ message: 'Order deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Sipariş bilgilerini alma
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    // ID'nin geçerli bir ObjectId olup olmadığını kontrol et
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid order ID.' });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

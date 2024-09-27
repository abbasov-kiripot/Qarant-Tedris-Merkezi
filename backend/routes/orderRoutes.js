import express from 'express';
import multer from 'multer';
import path from 'path';
import { createOrder, getOrders, deleteOrder, getOrderById } from '../controllers/orderController.js';

// Multer konfigürasyonu
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Dosyaların kaydedileceği dizin
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Dosya adını zaman damgası ve uzantı ile oluşturma
  }
});

const upload = multer({ storage: storage });

const router = express.Router();

// Siparişler için API rotaları
router.post('/', upload.single('receiptFile'), createOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById); // Detaylı sipariş bilgisi
router.delete('/:id', deleteOrder);

export default router;

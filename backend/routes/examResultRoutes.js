import express from 'express';
import { getAllResults, addResult, deleteResult, getResultByJobNumber } from '../controllers/examResultController.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Multer ayarları (dosya yükleme için)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Dosyaların kaydedileceği dizin
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Dosya adını benzersiz yap
  }
});
const upload = multer({ storage });

// Route tanımlamaları
router.get('/', getAllResults);
router.post('/', upload.single('resultFile'), addResult);
router.delete('/:jobNumber', deleteResult);
router.post('/getResult', getResultByJobNumber);

export default router;

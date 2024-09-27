import express from 'express';
import multer from 'multer';
import path from 'path';
import { createJobApplication, getJobApplications, deleteJobApplication } from '../controllers/jobApplicationController.js';

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

// İş başvuruları için API rotaları
router.post('/', upload.single('cv'), createJobApplication);
router.get('/', getJobApplications);
router.delete('/:id', deleteJobApplication);

export default router;
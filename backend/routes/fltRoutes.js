import express from 'express';
import { getFLTs, createFLT, deleteFLT } from '../controllers/fltController.js';

const router = express.Router();

router.get('/', getFLTs); // Tüm aşamaları getir
router.post('/', createFLT); // Yeni bir aşama oluştur
router.delete('/:id', deleteFLT); // Bir aşamayı sil

export default router;

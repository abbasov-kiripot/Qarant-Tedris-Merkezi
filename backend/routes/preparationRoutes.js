import express from 'express';
import { getPreparations, createPreparation, deletePreparation } from '../controllers/preparationController.js';

const router = express.Router();

router.get('/', getPreparations); // Tüm aşamaları getir
router.post('/', createPreparation); // Yeni bir aşama oluştur
router.delete('/:id', deletePreparation); // Bir aşamayı sil

export default router;

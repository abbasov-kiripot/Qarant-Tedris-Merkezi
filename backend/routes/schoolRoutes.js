import express from 'express';
import {
  getStages,
  createStage,
  updateStage,
  deleteStage
} from '../controllers/schoolController.js';

const router = express.Router();

router.get('/', getStages); // Tüm aşamaları getir
router.post('/', createStage); // Yeni bir aşama oluştur
router.put('/:id', updateStage); // Var olan bir aşamayı güncelle
router.delete('/:id', deleteStage); // Bir aşamayı sil

export default router;

// routes/miqRoutes.js
import express from 'express';
import { getMIQs, createMIQ, deleteMIQ } from '../controllers/miqController.js';

const router = express.Router();

router.get('/', getMIQs); // Tüm MIQ'ları getir
router.post('/', createMIQ); // Yeni bir MIQ oluştur
router.delete('/:id', deleteMIQ); // Bir MIQ'yu sil

export default router;

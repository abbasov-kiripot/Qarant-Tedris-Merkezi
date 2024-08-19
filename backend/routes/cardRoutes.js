import express from 'express';
import {  createCard, updateCard, deleteCard, getAllCards } from '../controllers/cardController.js';

const router = express.Router();

router.get('/', getAllCards);
router.post('/', createCard);
router.put('/:id', updateCard);
router.delete('/:id', deleteCard);

export default router;  // Default export ekleniyor

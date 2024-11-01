// routes/registrationRoutes.js
import express from 'express';
import { createRegistration, getRegistrations, deleteRegistration } from '../controllers/registrationController.js';

const router = express.Router();

// Kayıtlar için API rotaları
router.post('/', createRegistration);
router.get('/', getRegistrations);
router.delete('/:id', deleteRegistration);

export default router;

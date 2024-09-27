// routes/registrationRoutes.js
import express from 'express';
import { createRegistration, getRegistrations,  } from '../controllers/registrationController.js';

const router = express.Router();

// Kayıtlar için API rotaları
router.post('/', createRegistration);
router.get('/', getRegistrations);
router.delete('/:id',);

export default router;

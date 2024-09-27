// routes/accountRoutes.js
import express from 'express';
import { login, createAccount } from '../controllers/accountController.js';

const router = express.Router();

router.post('/login', login);
router.post('/create', createAccount);

export default router;

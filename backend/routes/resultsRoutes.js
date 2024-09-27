// routes/Results.js
import express from 'express';
import { createUser, getUsers, updateUser, deleteUser } from '../controllers/resultsController.js';

const router = express.Router();

// Yeni kullanıcı oluşturma
router.post('/', createUser);

// Tüm kullanıcıları getirme
router.get('/', getUsers);

// Kullanıcı güncelleme
router.put('/:id', updateUser);

// Kullanıcı silme
router.delete('/:id', deleteUser);

export default router;

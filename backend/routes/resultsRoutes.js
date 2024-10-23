import express from 'express';
import { loginUser, createUser, getUsers, updateUser, deleteUser } from '../controllers/resultsController.js';

const router = express.Router();

// Yeni kullanıcı oluşturma
router.post('/', createUser);

// Kullanıcı girişi
router.post('/login', loginUser);

// Tüm kullanıcıları alma
router.get('/', getUsers);

// Kullanıcı güncelleme
router.put('/:id', updateUser);

// Kullanıcı silme
router.delete('/:id', deleteUser);

export default router;

import express from 'express';
import { 
  getAllContacts, 
  getContactById, 
  createContact, 
  updateContact, 
  deleteContact 
} from '../controllers/contactController.js';

const router = express.Router();

// Tüm kişileri al
router.get('/', getAllContacts);

// Tek bir kişiyi al
router.get('/:id', getContactById);

// Yeni bir kişi ekle
router.post('/', createContact);

// Kişiyi güncelle
router.put('/:id', updateContact);

// Kişiyi sil
router.delete('/:id', deleteContact);

export default router;

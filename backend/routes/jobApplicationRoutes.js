import express from 'express';
import { getJobApplications, createJobApplication, deleteJobApplication } from '../controllers/jobApplicationController.js';

const router = express.Router();

router.get('/', getJobApplications); // Tüm başvuruları getir
router.post('/', createJobApplication); // Yeni başvuru ekle
router.delete('/:id', deleteJobApplication); // Başvuru sil

export default router;

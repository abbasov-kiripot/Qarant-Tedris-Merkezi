import express from 'express';
import { createExam, updateExam, deleteExam, getAllExams } from '../controllers/examController.js';

const router = express.Router();

router.get('/', getAllExams);
router.post('/', createExam);
router.put('/:id', updateExam);
router.delete('/:id', deleteExam);

export default router;

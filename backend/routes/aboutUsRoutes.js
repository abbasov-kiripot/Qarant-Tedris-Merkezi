import express from 'express';
import {
  getAboutUs,
  getAboutUsById,
  createAboutUs,
  updateAboutUs,
  deleteAboutUs
} from '../controllers/aboutUsController.js';

const router = express.Router();

router.get('/', getAboutUs);
router.get('/:id', getAboutUsById);
router.post('/', createAboutUs);
router.put('/:id', updateAboutUs);
router.delete('/:id', deleteAboutUs);

export default router;

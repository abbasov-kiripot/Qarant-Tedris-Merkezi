import express from 'express';
import { createTopic, updateTopic, deleteTopic, getAllTopics } from '../controllers/topicController.js';

const router = express.Router();

router.get('/', getAllTopics);
router.post('/', createTopic);
router.put('/:id', updateTopic);
router.delete('/:id', deleteTopic);

export default router;

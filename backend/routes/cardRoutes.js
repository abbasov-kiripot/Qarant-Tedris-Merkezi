// routes/cards.js
import express from 'express';
import Card from '../models/Card.js';

const router = express.Router();

// Tüm kartları getir
router.get('/', async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch cards' });
  }
});

// Yeni kart ekle
router.post('/', async (req, res) => {
  const { title, description, imageUrl } = req.body;

  try {
    const newCard = new Card({ title, description, imageUrl });
    const savedCard = await newCard.save();
    res.status(201).json(savedCard);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save card' });
  }
});

// Kartı güncelle
router.put('/:id', async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.id,
      { title, description, imageUrl },
      { new: true }
    );

    if (!updatedCard) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.json(updatedCard);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update card' });
  }
});

// Kartı sil
router.delete('/:id', async (req, res) => {
  try {
    const deletedCard = await Card.findByIdAndDelete(req.params.id);

    if (!deletedCard) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.json({ message: 'Card deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete card' });
  }
});

export default router;

// backend/controllers/cardController.js
import Card from '../models/Card.js';

// Create a new card
export async function createCard(req, res) {
  try {
    const newCard = new Card(req.body);
    const savedCard = await newCard.save();
    res.status(201).json(savedCard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


// Get all cards
export async function getAllCards(req, res) {
  try {
    const cards = await Card.find(); // 'find()' metodunu kullanarak tüm kartları getir
    res.status(200).json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update a card
export async function updateCard(req, res) {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } // 'new: true' parametresi ile güncellenmiş veriyi döndür
    ); 
    res.status(200).json(updatedCard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Delete a card
export async function deleteCard(req, res) {
  try {
    await Card.findByIdAndDelete(req.params.id); // 'findByIdAndDelete()' metodunu kullanarak kartı sil
    res.status(200).json({ message: 'Card deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

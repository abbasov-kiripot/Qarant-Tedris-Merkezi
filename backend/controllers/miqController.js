// controllers/miqController.js
import MIQ from '../models/miq.js';

// Tüm verileri getir
export const getMIQs = async (req, res) => {
  try {
    const miqs = await MIQ.find();
    res.status(200).json(miqs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch MIQs', error: err.message });
  }
};

// Yeni veri oluştur
export const createMIQ = async (req, res) => {
  try {
    const newMIQ = new MIQ(req.body);
    const savedMIQ = await newMIQ.save();
    res.status(201).json(savedMIQ);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create MIQ', error: err.message });
  }
};

// Veriyi sil
export const deleteMIQ = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMIQ = await MIQ.findByIdAndDelete(id);
    if (!deletedMIQ) {
      return res.status(404).json({ message: 'MIQ not found' });
    }
    res.status(200).json({ message: 'MIQ deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete MIQ', error: err.message });
  }
};

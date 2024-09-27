import FLT from '../models/flt.js';

// Tüm aşamaları getir
export const getFLTs = async (req, res) => {
  try {
    const flts = await FLT.find();
    res.status(200).json(flts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch FLT stages', error: err.message });
  }
};

// Yeni bir aşama oluştur
export const createFLT = async (req, res) => {
  try {
    const newFLT = new FLT(req.body);
    const savedFLT = await newFLT.save();
    res.status(201).json(savedFLT);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create FLT stage', error: err.message });
  }
};

// Bir aşamayı sil
export const deleteFLT = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFLT = await FLT.findByIdAndDelete(id);
    if (!deletedFLT) {
      return res.status(404).json({ message: 'FLT stage not found' });
    }
    res.status(200).json({ message: 'FLT stage deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete FLT stage', error: err.message });
  }
};

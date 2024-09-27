import Preparation from '../models/preparation.js';

// Tüm aşamaları getir
export const getPreparations = async (req, res) => {
  try {
    const preparations = await Preparation.find();
    res.status(200).json(preparations);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch preparation stages', error: err.message });
  }
};

// Yeni bir aşama oluştur
export const createPreparation = async (req, res) => {
  try {
    const newPreparation = new Preparation(req.body);
    const savedPreparation = await newPreparation.save();
    res.status(201).json(savedPreparation);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create preparation stage', error: err.message });
  }
};

// Bir aşamayı sil
export const deletePreparation = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPreparation = await Preparation.findByIdAndDelete(id);
    if (!deletedPreparation) {
      return res.status(404).json({ message: 'Preparation stage not found' });
    }
    res.status(200).json({ message: 'Preparation stage deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete preparation stage', error: err.message });
  }
};

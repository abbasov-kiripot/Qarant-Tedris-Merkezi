import School from '../models/school.js';

// Tüm aşamaları getir
export const getStages = async (req, res) => {
  try {
    const stages = await School.find();
    res.status(200).json(stages);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stages', error: err.message });
  }
};

// Yeni bir aşama oluştur
export const createStage = async (req, res) => {
  try {
    const newStage = new School(req.body);
    const savedStage = await newStage.save();
    res.status(201).json(savedStage);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create stage', error: err.message });
  }
};

// Var olan bir aşamayı güncelle
export const updateStage = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedStage = await School.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedStage) {
      return res.status(404).json({ message: 'Stage not found' });
    }
    res.status(200).json(updatedStage);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update stage', error: err.message });
  }
};

// Bir aşamayı sil
export const deleteStage = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStage = await School.findByIdAndDelete(id);
    if (!deletedStage) {
      return res.status(404).json({ message: 'Stage not found' });
    }
    res.status(200).json({ message: 'Stage deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete stage', error: err.message });
  }
};

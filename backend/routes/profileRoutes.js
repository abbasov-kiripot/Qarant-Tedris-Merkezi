import express from 'express';
import Profile from '../models/profile.js'; // Profil modelini güncelledik

const router = express.Router();

// Profil sil
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProfile = await Profile.findByIdAndDelete(id);
    if (!deletedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting profile', error });
  }
});

// Öğrenci profillerini listele
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profiles' });
  }
});

// Profil güncelle
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedProfile = await Profile.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(updatedProfile);
  } catch (error) {
    res.status(400).json({ message: 'Error updating profile', error });
  }
});

// Yeni profil ekle
router.post('/', async (req, res) => {
  try {
    const newProfile = new Profile(req.body);
    const savedProfile = await newProfile.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    res.status(400).json({ message: 'Error adding profile', error });
  }
});

// Daha fazla CRUD işlemleri eklemek için burayı genişletebilirsiniz (update, delete).

export default router;

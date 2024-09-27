import AboutUs from '../models/aboutUs.js';

// Get all AboutUs entries
export const getAboutUs = async (req, res) => {
  try {
    const aboutUs = await AboutUs.find();
    res.status(200).json(aboutUs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single AboutUs entry by ID
export const getAboutUsById = async (req, res) => {
  const { id } = req.params;
  try {
    const aboutUs = await AboutUs.findById(id);
    if (!aboutUs) return res.status(404).json({ message: 'AboutUs not found' });
    res.status(200).json(aboutUs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new AboutUs entry
export const createAboutUs = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newAboutUs = new AboutUs({ title, description });
    await newAboutUs.save();
    res.status(201).json(newAboutUs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing AboutUs entry
export const updateAboutUs = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const updatedAboutUs = await AboutUs.findByIdAndUpdate(id, { title, description }, { new: true });
    if (!updatedAboutUs) return res.status(404).json({ message: 'AboutUs not found' });
    res.status(200).json(updatedAboutUs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an AboutUs entry
export const deleteAboutUs = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAboutUs = await AboutUs.findByIdAndDelete(id);
    if (!deletedAboutUs) return res.status(404).json({ message: 'AboutUs not found' });
    res.status(200).json({ message: 'AboutUs deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

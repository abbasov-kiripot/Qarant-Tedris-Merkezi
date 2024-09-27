// controllers/registrationController.js
import Registration from '../models/Registration.js';

// Kayıt oluşturma
export const createRegistration = async (req, res) => {
  try {
    const newRegistration = new Registration(req.body);
    const savedRegistration = await newRegistration.save();
    res.status(201).json(savedRegistration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Kayıtları alma
export const getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Kayıt silme
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // ID'nin geçerli bir ObjectId olup olmadığını kontrol et
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid order ID.' });
    }

    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    res.status(200).json({ message: 'Order deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
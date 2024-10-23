import JobApplication from '../models/JobApplication.js';

// Tüm başvuruları getir
export const getJobApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find({});
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Yeni başvuru ekle
export const createJobApplication = async (req, res) => {
  const { firstName, lastName, fatherName, dateOfBirth, email, phone, additionalNotes, cv } = req.body;

  const newApplication = new JobApplication({
    firstName,
    lastName,
    fatherName,
    dateOfBirth,
    email,
    phone,
    additionalNotes,
    cv,
  });

  try {
    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Başvuru sil
export const deleteJobApplication = async (req, res) => {
  const { id } = req.params;

  try {
    const application = await JobApplication.findByIdAndDelete(id);
    if (!application) {
      return res.status(404).json({ message: 'Başvuru bulunamadı' });
    }
    res.json({ message: 'Başvuru silindi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

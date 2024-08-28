import JobApplication from '../models/JobApplication.js'; // Model dosyanızı import edin

// İş başvurusu oluşturma
export const createJobApplication = async (req, res) => {
  try {
    const { firstName, lastName, fatherName, dateOfBirth, email, phone, additionalNotes } = req.body;
    const cv = req.file ? req.file.path : null; // CV dosyasının yolu

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

    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// İş başvurularını alma
export const getJobApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find();
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// İş başvurusunu silme
export const deleteJobApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedApplication = await JobApplication.findByIdAndDelete(id);
    if (!deletedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.status(200).json(deletedApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

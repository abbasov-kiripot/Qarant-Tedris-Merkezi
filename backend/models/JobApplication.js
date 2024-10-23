import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  additionalNotes: {
    type: String,
  },
  cv: {
    type: String, // Cloudinary'den alınan CV URL'si
    required: true,
  },
}, {
  timestamps: true, // CreatedAt ve UpdatedAt tarihlerini otomatik ekler
});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

export default JobApplication;

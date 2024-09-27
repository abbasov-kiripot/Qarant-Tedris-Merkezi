import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  fatherName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  additionalNotes: { type: String },
  cv: { type: String }, // CV dosyasının yolu
}, {
  timestamps: true
});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

export default JobApplication;
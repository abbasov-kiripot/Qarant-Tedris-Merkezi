// models/Registration.js
import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  exam: { type: String, required: true },
  direction: { type: String, required: true },
  city: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  fatherName: { type: String, required: true },
  phone: { type: String, required: true },
  birthDay: { type: Number, required: true },
  birthMonth: { type: Number, required: true },
  birthYear: { type: Number, required: true }
}, {
  timestamps: true
});

const Registration = mongoose.model('Registration', registrationSchema);

export default Registration;

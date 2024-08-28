import mongoose from 'mongoose';

const schoolSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const School = mongoose.model('School', schoolSchema);

export default School;

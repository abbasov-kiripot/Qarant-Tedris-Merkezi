import mongoose from 'mongoose';

const fltSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const FLT = mongoose.model('FLT', fltSchema);

export default FLT;

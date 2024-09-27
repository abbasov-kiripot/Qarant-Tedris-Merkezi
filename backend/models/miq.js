// models/miq.js
import mongoose from 'mongoose';

const miqSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const MIQ = mongoose.model('MIQ', miqSchema);

export default MIQ;

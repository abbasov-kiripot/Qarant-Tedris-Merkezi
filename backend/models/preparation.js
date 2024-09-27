import mongoose from 'mongoose';

const preparationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Preparation = mongoose.model('Preparation', preparationSchema);

export default Preparation;

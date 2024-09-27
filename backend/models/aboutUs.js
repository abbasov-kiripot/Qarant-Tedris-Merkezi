import mongoose from 'mongoose';

const aboutUsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const AboutUs = mongoose.model('AboutUs', aboutUsSchema);

export default AboutUs;

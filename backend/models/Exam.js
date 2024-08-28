import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  link: { type: String, required: true },
  image: { type: String, required: true },
});

const Exam = mongoose.model('Exam', examSchema);

export default Exam;

import mongoose from 'mongoose';

const examResultSchema = new mongoose.Schema({
  jobNumber: { type: String, required: true, unique: true }, // İş numarası
  examName: { type: String, required: true }, // Sınav adı
  examDate: { type: Date, required: true }, // Sınav tarihi
  examTime: { type: String, required: true }, // Sınav saati
  score: { type: Number, required: true }, // Puan
  correctAnswers: { type: Number, required: true }, // Doğru cevap sayısı
  wrongAnswers: { type: Number, required: true }, // Yanlış cevap sayısı
  subjects: { type: String, required: true }, // Konular
  resultFile: { type: String }, // Dosya adı (isteğe bağlı)
}, { timestamps: true }); // CreatedAt ve updatedAt alanları

const ExamResult = mongoose.model('ExamResult', examResultSchema);
export default ExamResult;

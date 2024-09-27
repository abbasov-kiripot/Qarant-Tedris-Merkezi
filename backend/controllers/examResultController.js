import ExamResult from '../models/examResultModel.js';

// Tüm sonuçları getir
export const getAllResults = async (req, res) => {
  try {
    const results = await ExamResult.find();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Yeni bir sonuç ekle
export const addResult = async (req, res) => {
  const resultData = {
    jobNumber: req.body.jobNumber,
    examName: req.body.examName,
    examDate: req.body.examDate,
    examTime: req.body.examTime,
    score: req.body.score,
    correctAnswers: req.body.correctAnswers,
    wrongAnswers: req.body.wrongAnswers,
    subjects: req.body.subjects,
    resultFile: req.file ? req.file.path : null, // Dosya yolu
  };

  try {
    const newResult = await ExamResult.create(resultData);
    res.status(201).json(newResult);
  } catch (error) {
    res.status(400).json({ message: 'Error adding result', error });
  }
};

// Belirli bir sonucu sil
export const deleteResult = async (req, res) => {
  const { jobNumber } = req.params;

  try {
    await ExamResult.deleteOne({ jobNumber });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting result', error });
  }
};

// İş numarasına göre sonucu getir
export const getResultByJobNumber = async (req, res) => {
  const { jobNumber } = req.body;

  try {
    const result = await ExamResult.findOne({ jobNumber });
    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

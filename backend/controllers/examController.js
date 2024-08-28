import Exam from '../models/Exam.js';

// Tüm sınavları getir
export const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find();
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: "Sınavlar alınırken bir hata oluştu", error });
  }
};

// Yeni bir sınav oluştur
export const createExam = async (req, res) => {
  try {
    const newExam = new Exam(req.body);
    const savedExam = await newExam.save();
    res.status(201).json(savedExam);
  } catch (error) {
    res.status(400).json({ message: "Sınav oluşturulurken bir hata oluştu", error });
  }
};

// Belirli bir sınavı güncelle
export const updateExam = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedExam = await Exam.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedExam) {
      return res.status(404).json({ message: "Sınav bulunamadı" });
    }
    res.status(200).json(updatedExam);
  } catch (error) {
    res.status(400).json({ message: "Sınav güncellenirken bir hata oluştu", error });
  }
};

// Belirli bir sınavı sil
export const deleteExam = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedExam = await Exam.findByIdAndDelete(id);
    if (!deletedExam) {
      return res.status(404).json({ message: "Sınav bulunamadı" });
    }
    res.status(200).json({ message: "Sınav başarıyla silindi" });
  } catch (error) {
    res.status(400).json({ message: "Sınav silinirken bir hata oluştu", error });
  }
};

import Topic from '../models/Topic.js';

// Tüm konuları getir
export const getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ message: "Konular alınırken bir hata oluştu", error });
  }
};

// Yeni bir konu oluştur
export const createTopic = async (req, res) => {
  try {
    const newTopic = new Topic(req.body);
    const savedTopic = await newTopic.save();
    res.status(201).json(savedTopic);
  } catch (error) {
    res.status(400).json({ message: "Konu oluşturulurken bir hata oluştu", error });
  }
};

// Belirli bir konuyu güncelle
export const updateTopic = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTopic = await Topic.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTopic) {
      return res.status(404).json({ message: "Konu bulunamadı" });
    }
    res.status(200).json(updatedTopic);
  } catch (error) {
    res.status(400).json({ message: "Konu güncellenirken bir hata oluştu", error });
  }
};

// Belirli bir konuyu sil
export const deleteTopic = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTopic = await Topic.findByIdAndDelete(id);
    if (!deletedTopic) {
      return res.status(404).json({ message: "Konu bulunamadı" });
    }
    res.status(200).json({ message: "Konu başarıyla silindi" });
  } catch (error) {
    res.status(400).json({ message: "Konu silinirken bir hata oluştu", error });
  }
};

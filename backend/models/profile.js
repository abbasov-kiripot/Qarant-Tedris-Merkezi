import mongoose from 'mongoose';

const ClassScheduleSchema = new mongoose.Schema({
  day: { type: String,  }, // Gün (örn. "Monday", "Tuesday", vb.)
  subject: { type: String, }, // Dersin adı
  startTime: { type: String,  }, // Başlangıç saati (örn. "09:00")
  endTime: { type: String,  }, // Bitiş saati (örn. "10:00")
  location: { type: String,  }, // Dersin yeri
}, { _id: false });

const ProfileSchema = new mongoose.Schema({
  fullName: { type: String, }, // Ad Soyad zorunlu
  email: { type: String, unique: true, }, // E-posta benzersiz ve zorunlu olmalı
  phone: { type: String },
  mobile: { type: String },
  address: { type: String },
  group: { type: String },
  branch: { type: String },
  subjects: { type: String },
  imageUrl: { type: String }, // Resim URL'si için alan
  gender: { type: String, enum: ['oğlan','OGLAN','OĞLAN','oglan', 'qız',  'qiz','QİZ','QIZ'], required: true }, // Cinsiyet
  schedule: [ClassScheduleSchema], // Kullanıcının haftalık ders programı
}, { timestamps: true });

const Profile = mongoose.model('Profile', ProfileSchema);
export default Profile;

import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: { type: String, required: false },
  lastName: { type: String, required: false },
  exam: { type: String, required: false },
  direction: { type: String, required: false },
  city: { type: String, required: false },
  fatherName: { type: String, required: false },
  phone: { type: String, required: false },
  birthDay: { type: String, required: false },
  birthMonth: { type: String, required: false },
  birthYear: { type: String, required: false },
  email: { type: String, required: true, unique: true, match: [/.+\@.+\..+/, 'Lütfen geçerli bir email adresi girin'] }, // Email formatı kontrolü
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
});

// Şifreyi kaydetmeden önce hash'leriz
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Şifre doğrulama fonksiyonu
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = model('User', userSchema);
export default User;

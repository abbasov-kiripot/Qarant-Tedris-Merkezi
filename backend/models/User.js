import { Schema, model } from 'mongoose';

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
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Geçerli bir email adresi giriniz.'] 
  },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
});
const User = model('User', userSchema);
export default User;

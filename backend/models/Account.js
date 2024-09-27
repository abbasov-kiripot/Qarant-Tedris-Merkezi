// models/account.js
import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const AccountSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

export default model('Account', AccountSchema);

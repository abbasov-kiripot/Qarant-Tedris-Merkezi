// models/order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  street: { type: String, required: true },
  phone: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  receiptFileName: { type: String }, // CV dosyasının yolu
  examDate: { type: String, required: true },
  city: { type: String, required: true },
  examType: { type: String, required: true },
  ticketPrice: { type: Number, required: true },
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;

// models/Order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    street: { type: String },
    phone: { type: String },
    paymentMethod: { type: String, required: true },
    examDate: { type: String, required: true },
    city: { type: String, required: true },
    examType: { type: String, required: true },
    ticketPrice: { type: Number, required: true },
    receiptFile: { type: String }, // Cloudinary URL
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;

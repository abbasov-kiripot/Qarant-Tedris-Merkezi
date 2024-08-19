import { Schema, model } from 'mongoose';

const cardSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Card = model('Card', cardSchema);

export default Card;

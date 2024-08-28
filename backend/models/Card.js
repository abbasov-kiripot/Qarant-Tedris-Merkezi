import { Schema, model } from 'mongoose';

const stageSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    // Diğer gerekli alanlar
    createdAt: { type: Date, default: Date.now }
});

const Stage = model('Stage', stageSchema);

export default Stage;

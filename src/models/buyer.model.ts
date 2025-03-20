import mongoose from 'mongoose';

const BuyerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  type: { type: String, enum: ['shopkeeper', 'technician'], required: true },
  town: { type: mongoose.Schema.Types.ObjectId, ref: 'Town', required: true },
});

export const Buyer = mongoose.model('Buyer', BuyerSchema);

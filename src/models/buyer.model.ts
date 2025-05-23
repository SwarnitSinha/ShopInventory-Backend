import mongoose from 'mongoose';

const BuyerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  shopId: {type: mongoose.Types.ObjectId, ref: 'Shop', required: true},
  phone: { type: String, required: false, trim: true },
  type: { type: String, enum: ['shopkeeper', 'technician'], required: true },
  town: { type: mongoose.Schema.Types.ObjectId, ref: 'Town', required: true },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Buyer = mongoose.model('Buyer', BuyerSchema);

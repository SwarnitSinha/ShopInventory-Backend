import mongoose from 'mongoose';

const SaleSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'Buyer', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  pricePerUnit: { type: Number, required: true, min: 0 },
  totalAmount: { type: Number, required: true, min: 0 },
  amountPaid: { type: Number, required: true, min: 0 },
  saleDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['completed', 'due'], default: 'due' },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

export const Sale = mongoose.model('Sale', SaleSchema);

import mongoose from 'mongoose';

const TownSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  shopId: {type: mongoose.Types.ObjectId, ref: 'Shop', required: true},
  district: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true, default: "India" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
});

export const Town = mongoose.model('Town', TownSchema);

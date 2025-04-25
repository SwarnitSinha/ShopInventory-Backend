import mongoose from 'mongoose';

const TownSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  shopId: {type: mongoose.Types.ObjectId, ref: 'Shop', required: true},
  district: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true, default: "India" },
});

export const Town = mongoose.model('Town', TownSchema);

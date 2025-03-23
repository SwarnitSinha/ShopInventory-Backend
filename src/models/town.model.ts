import mongoose from 'mongoose';

const TownSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  district: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true, default: "India" },
});

export const Town = mongoose.model('Town', TownSchema);

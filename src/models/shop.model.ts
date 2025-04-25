import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema({
        email: { type: String, required: false, unique: true },
        shopName: { type: String, required: true },
        ownerName: { type: String, required: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
        activeScreen: { type: Number, required: true },
});

export const Shop = mongoose.model("Shop", ShopSchema);

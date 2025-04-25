import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema({
        email: { type: String, required: false},
        shopName: { type: String, required: true },
        ownerName: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        activeScreen: { type: Number, required: true },
});

export const Shop = mongoose.model("Shop", ShopSchema);

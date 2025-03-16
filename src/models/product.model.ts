import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
        name: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        quantity: { type: Number, required: true, default: 0, min: 0 },
        purchasePrice: { type: Number, required: true, min: 0 },
        regularPrice: { type: Number, required: true, min: 0 },
        bulkPrice: { type: Number, required: true, min: 0 },
        imageUrl: { type: String, trim: true } 
});

export const Product = mongoose.model("Product", ProductSchema);

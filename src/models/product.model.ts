import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
        name: String,
        description: String,
        quantity: Number,
        purchasePrice: Number,
        regularPrice: Number,
        bulkPrice: Number,
});

export const Product = mongoose.model("Product", ProductSchema);

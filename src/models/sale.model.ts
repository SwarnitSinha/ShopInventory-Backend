import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema({
        productId: { type: String, required: true },
        buyerName: { type: String, required: true },
        quantity: { type: Number, required: true },
        pricePerUnit: { type: Number, required: true },
        totalAmount: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now },
        createdBy: { type: String, required: true },
});

export const Sale = mongoose.model("Sale", SaleSchema);

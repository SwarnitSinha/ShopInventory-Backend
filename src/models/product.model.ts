import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
        name: { type: String, required: true, trim: true },
        shopId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Shop",
                required: true,
        },
        description: { type: String, trim: true },
        quantity: { type: Number, required: true, default: 0, min: 0 },
        purchasePrice: { type: Number, required: true, min: 0 },
        regularPrice: { type: Number, required: true, min: 0 },
        bulkPrice: { type: Number, required: true, min: 0 },
        imageUrl: { type: String, trim: true },
        isDeleted: {type: Boolean, default: false},
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
});

ProductSchema.pre('findOneAndUpdate', function(next) {
        this.set({ updatedAt: new Date() });
        next();
      });

export const Product = mongoose.model("Product", ProductSchema);



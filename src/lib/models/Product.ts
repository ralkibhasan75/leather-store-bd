// src/models/Product.ts
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    brand: String,
    model: String,
    category: String,
    stock: Number,
    discount: Number,
    couponCode: String,
    tags: [String],
    thumbnail: String,
    images: [String],
    isFeatured: Boolean,
    isActive: Boolean,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);

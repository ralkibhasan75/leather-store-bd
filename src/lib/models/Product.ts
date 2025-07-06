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
    sizes: [String], // optional: e.g. ["40", "41", "42"]
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);

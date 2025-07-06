// src/lib/models/Order.ts
import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    title: String,
    model: String,
    price: Number,
    discount: Number, // ✅ Add this line
    quantity: Number,
    selectedSize: String,
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    customer: {
      name: String,
      email: String,
      phone: String,
      address: String,
    },
    payment: {
      method: String, // bKash, Nagad, Rocket, COD
      trxId: String,
    },
    items: [OrderItemSchema],
    total: Number,
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import Cart from "@/lib/models/Cart";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  await connectDB();

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { cart } = body;

  if (!Array.isArray(cart)) {
    return NextResponse.json({ error: "Invalid cart format" }, { status: 400 });
  }

  const items = cart
    .map((item) => {
      if (
        !item._id ||
        !mongoose.Types.ObjectId.isValid(item._id) ||
        typeof item.quantity !== "number" ||
        item.quantity <= 0
      ) {
        return null;
      }

      return {
        productId: new mongoose.Types.ObjectId(item._id),
        quantity: item.quantity,
      };
    })
    .filter(
      (
        item
      ): item is { productId: mongoose.Types.ObjectId; quantity: number } =>
        !!item
    );

  if (items.length === 0) {
    await Cart.deleteOne({ userId: user.userId });
    return NextResponse.json({ success: true, message: "Cart cleared" });
  }

  try {
    await Cart.findOneAndUpdate(
      { userId: user.userId },
      { $set: { items } },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Cart save error:", err);
    return NextResponse.json({ error: "Failed to save cart" }, { status: 500 });
  }
}

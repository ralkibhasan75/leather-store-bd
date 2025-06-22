import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import Cart from "@/lib/models/Cart";
import Product from "@/lib/models/Product";
import { Types } from "mongoose";

type CartItem = {
  productId: Types.ObjectId;
  quantity: number;
};

type CartDoc = {
  userId: Types.ObjectId;
  items: CartItem[];
};

export async function GET(req: NextRequest) {
  await connectDB();

  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const cart = (await Cart.findOne({
      userId: user.userId,
    }).lean()) as CartDoc | null;

    if (!cart || !Array.isArray(cart.items)) {
      return NextResponse.json({ cart: [] });
    }

    const fullCart = await Promise.all(
      cart.items.map(async (item) => {
        const product = await Product.findById(item.productId).lean();
        if (!product) return null;

        return {
          ...product,
          quantity: item.quantity,
        };
      })
    );

    const cleanedCart = fullCart.filter((item) => item !== null);
    return NextResponse.json({ cart: cleanedCart });
  } catch (error) {
    console.error("Cart load error:", error);
    return NextResponse.json({ error: "Failed to load cart" }, { status: 500 });
  }
}

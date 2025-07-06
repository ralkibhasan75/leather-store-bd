import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";
import Product from "@/lib/models/Product";
import { sendOrderConfirmationEmail } from "@/lib/mail";
import { ProductType } from "@/types/Product";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  await connectDB();

  const currentUser = await getCurrentUser();
  const userId = currentUser?.userId;

  try {
    const body = await req.json();

    const {
      customerInfo,
      payment,
      items,
      total,
    }: {
      customerInfo: {
        name: string;
        email: string;
        phone: string;
        address: string;
      };
      payment: { method: string; trxId?: string | null };
      items: { productId: string; quantity: number; selectedSize?: string }[];
      total: number;
    } = body;

    if (!customerInfo || !payment || !items || items.length === 0 || !total) {
      return NextResponse.json(
        { error: "Missing order data" },
        { status: 400 }
      );
    }

    // Fetch full product details
    const detailedItems = await Promise.all(
      items.map(async (item) => {
        const product = (await Product.findById(
          item.productId
        ).lean()) as ProductType | null;
        if (!product) throw new Error(`Product not found: ${item.productId}`);

        return {
          productId: product._id,
          title: product.title,
          model: product.model,
          price: product.price,
          quantity: item.quantity,
          selectedSize: item.selectedSize || null,
        };
      })
    );

    const order = await Order.create({
      user: userId || undefined, // Only store if available (for guests allow null)
      customer: customerInfo,
      payment,
      items: detailedItems,
      total,
      status: "Pending",
    });

    await sendOrderConfirmationEmail({
      to: customerInfo.email,
      customer: customerInfo,
      items: detailedItems,
      payment,
      total,
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Order Error:", error);
    return NextResponse.json(
      { error: "Failed to place order" },
      { status: 500 }
    );
  }
}

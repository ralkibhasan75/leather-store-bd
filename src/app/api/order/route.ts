import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";
import Product from "@/lib/models/Product";
import { sendOrderConfirmationEmail } from "@/lib/mail";
import { getCurrentUser } from "@/lib/auth";
import { ProductType } from "@/types/Product";

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

    if (!customerInfo || !payment || !items?.length || !total) {
      return NextResponse.json(
        { error: "Missing order data" },
        { status: 400 }
      );
    }

    // Fetch product details for each item
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
          discount: product.discount ?? 0,
          quantity: item.quantity,
          selectedSize: item.selectedSize ?? undefined, // ✅ FIX: ensure it's string | undefined
        };
      })
    );

    // Create order in DB
    const order = await Order.create({
      user: userId || undefined,
      customer: customerInfo,
      payment,
      items: detailedItems,
      total,
      status: "Pending",
    });

    // Format for email
    const emailItems = detailedItems.map((item) => ({
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      selectedSize: item.selectedSize,
      discount: item.discount,
    }));

    await sendOrderConfirmationEmail({
      to: customerInfo.email,
      customer: customerInfo,
      items: emailItems,
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

// src/app/api/admin/summary/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import Order from "@/lib/models/Order";
import { User } from "@/lib/models/User";

export async function GET() {
  await connectDB();

  const productCount = await Product.countDocuments();
  const orderCount = await Order.countDocuments();
  const customerCount = await User.countDocuments({ role: "client" });

  return NextResponse.json({
    productCount,
    orderCount,
    customerCount,
  });
}

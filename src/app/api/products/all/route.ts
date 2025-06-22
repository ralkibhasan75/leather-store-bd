import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const products = await Product.find({ isActive: true }).sort({
    createdAt: -1,
  });

  return NextResponse.json({ products });
}

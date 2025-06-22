// src/app/api/products/route.ts
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const products = await Product.find({ isActive: true, isFeatured: true })
    .sort({ createdAt: -1 })
    .limit(12); // Optional limit

  return NextResponse.json({ products });
}

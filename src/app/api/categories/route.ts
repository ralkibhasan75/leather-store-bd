import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const categories = await Product.distinct("category");

  return NextResponse.json(categories);
}

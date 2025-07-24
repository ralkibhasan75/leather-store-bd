import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();
  const searchQuery = req.nextUrl.searchParams.get("query") || "";

  const regex = new RegExp(searchQuery, "i"); // case-insensitive

  const products = await Product.find({
    isActive: true,
    $or: [
      { title: regex },
      { category: regex },
      { tags: { $in: [regex] } },
      { brand: regex },
    ],
  });

  return NextResponse.json({ products });
}

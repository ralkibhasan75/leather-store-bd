import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export async function GET(req: NextRequest) {
  await connectDB();

  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({ products: [] });

  // Convert slug back to category name for query
  const regexCategory = new RegExp(`^${slug.replace(/-/g, " ")}$`, "i");

  const products = await Product.find({
    category: { $regex: regexCategory },
    isActive: true,
  });

  return NextResponse.json({ products });
}

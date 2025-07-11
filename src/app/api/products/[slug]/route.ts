import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { slug: string } }
) {
  try {
    await connectDB();

    const slug = context.params.slug;

    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ message: "Invalid slug" }, { status: 400 });
    }

    const product = await Product.findOne({ slug, isActive: true });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error("❌ API Error [slug route]:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

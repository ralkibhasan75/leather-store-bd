import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const tagsParam = searchParams.get("tags");
  const excludeId = searchParams.get("id");

  if (!tagsParam) {
    return NextResponse.json({ error: "Missing tags" }, { status: 400 });
  }

  const tags = tagsParam.split(",").map((tag) => tag.trim());

  try {
    const query: any = {
      tags: { $in: tags },
    };

    if (excludeId) {
      query._id = { $ne: new mongoose.Types.ObjectId(excludeId) };
    }

    const relatedProducts = await Product.find(query)
      .limit(8)
      .select("title thumbnail price");

    return NextResponse.json(relatedProducts);
  } catch (err) {
    console.error("Failed to fetch related products:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

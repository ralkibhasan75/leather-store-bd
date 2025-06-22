import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/db"; // Your DB connection
import Product from "@/lib/models/Product"; // Your Mongoose product model

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const brand = formData.get("brand") as string;
    const model = formData.get("model") as string;
    const category = formData.get("category") as string;
    const stock = Number(formData.get("stock"));
    const discount = Number(formData.get("discount") || 0);
    const couponCode = formData.get("couponCode") as string;
    const isFeatured = formData.get("isFeatured") === "on";
    const isActive = formData.get("isActive") !== "off";

    const tags = JSON.parse((formData.get("tags") as string) || "[]");
    const thumbnailUrl = formData.get("thumbnailUrl") as string;
    const galleryUrls = formData
      .getAll("galleryUrls")
      .map((entry) => String(entry));
    console.log("📝 Incoming Product:", {
      title,
      thumbnailUrl,
      galleryUrls,
      tags,
    });
    const product = await Product.create({
      title,
      description,
      price,
      brand,
      model,
      category,
      stock,
      discount,
      couponCode,
      tags,
      thumbnail: thumbnailUrl,
      images: galleryUrls,
      isFeatured,
      isActive,
    });

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    console.error("❌ API Product Create Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

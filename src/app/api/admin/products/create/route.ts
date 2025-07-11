import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";

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
    const sizes = JSON.parse((formData.get("sizes") as string) || "[]");

    const thumbnailUrl = formData.get("thumbnailUrl") as string;
    const galleryUrls = formData
      .getAll("galleryUrls")
      .map((entry) => String(entry));

    // ✅ Validate required sizes for belt/shoe
    if (["belt", "shoe"].includes(category)) {
      if (!Array.isArray(sizes) || sizes.length === 0) {
        return NextResponse.json(
          {
            success: false,
            error: "Sizes are required for belt and shoe categories.",
          },
          { status: 400 }
        );
      }

      const invalidSizes = sizes.filter(
        (s: any) => isNaN(Number(s)) || Number(s) <= 0
      );

      if (invalidSizes.length > 0) {
        return NextResponse.json(
          {
            success: false,
            error: `Invalid sizes provided: ${invalidSizes.join(", ")}`,
          },
          { status: 400 }
        );
      }
    }

    // ✅ Product create (slug will be auto-generated in schema)
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
      sizes,
      thumbnail: thumbnailUrl,
      images: galleryUrls,
      isFeatured,
      isActive,
    });

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

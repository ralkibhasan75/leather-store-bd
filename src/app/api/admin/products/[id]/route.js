import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import { NextResponse } from "next/server";

// GET single product
export async function GET(_, context) {
  await connectDB();
  const { params } = context;

  try {
    const product = await Product.findById(params.id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ product });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE product
export async function DELETE(_, context) {
  await connectDB();
  const { params } = context;

  try {
    const product = await Product.findByIdAndDelete(params.id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
// PATCH product
export async function PATCH(req, context) {
  await connectDB();
  const { params } = context;

  try {
    const body = await req.json();

    const {
      title,
      brand,
      model,
      category,
      price,
      discount,
      couponCode,
      stock,
      description,
      isActive,
      isFeatured,
      thumbnail,
      images,
      tags,
      sizes,
    } = body;

    if (["belt", "shoe"].includes(category)) {
      if (!Array.isArray(sizes) || sizes.length === 0) {
        return NextResponse.json(
          { error: "Sizes are required for belt and shoe categories." },
          { status: 400 }
        );
      }

      const invalidSizes = sizes.filter(
        (s) => isNaN(Number(s)) || Number(s) <= 0
      );

      if (invalidSizes.length > 0) {
        return NextResponse.json(
          { error: `Invalid sizes provided: ${invalidSizes.join(", ")}` },
          { status: 400 }
        );
      }
    }

    const product = await Product.findById(params.id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Update fields
    product.title = title;
    product.brand = brand;
    product.model = model;
    product.category = category;
    product.price = parseFloat(price);
    product.discount = parseFloat(discount || 0);
    product.couponCode = couponCode || "";
    product.stock = parseInt(stock);
    product.description = description;
    product.isActive = isActive;
    product.isFeatured = isFeatured;
    product.thumbnail = thumbnail;
    product.images = images || [];
    product.tags = tags || [];
    product.sizes = sizes || [];

    // Save so slug pre-save hook works
    await product.save();

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

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

    const updated = {
      title: body.title,
      brand: body.brand,
      model: body.model,
      category: body.category,
      price: parseFloat(body.price),
      discount: parseFloat(body.discount || 0),
      couponCode: body.couponCode || "",
      stock: parseInt(body.stock),
      description: body.description,
      isActive: body.isActive,
      isFeatured: body.isFeatured,
      thumbnail: body.thumbnail,
      images: body.images || [],
      tags: body.tags || [],
    };

    const product = await Product.findByIdAndUpdate(params.id, updated, {
      new: true,
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

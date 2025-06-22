import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const product = await Product.findByIdAndDelete(params.id);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
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
}

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const product = await Product.findById(params.id);
  if (!product)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ product });
}

// /src/app/api/admin/products/delete-multiple/route.ts
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  const { ids } = await req.json();

  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json(
      { error: "No product IDs provided" },
      { status: 400 }
    );
  }

  await Product.deleteMany({ _id: { $in: ids } });
  return NextResponse.json({ success: true });
}

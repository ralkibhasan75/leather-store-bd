// src/app/api/admin/orders/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";

export async function PUT(req: NextRequest, { params }: any) {
  await connectDB();

  try {
    const { status } = await req.json();
    await Order.findByIdAndUpdate(params.id, { status });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: any) {
  await connectDB();

  try {
    await Order.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete order" },
      { status: 500 }
    );
  }
}

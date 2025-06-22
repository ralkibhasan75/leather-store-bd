import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  await connectDB();

  const user = await getCurrentUser();

  if (!user || user.role !== "client") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await Order.find({ user: user.userId })
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json({ orders });
}

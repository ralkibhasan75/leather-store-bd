import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { sendPasswordResetEmail } from "@/lib/mail";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  await connectDB();
  const { email } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ success: true }); // Avoid email enumeration
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expiry = Date.now() + 15 * 60 * 1000;

  user.resetToken = token;
  user.resetTokenExpiry = expiry;
  await user.save();

  await sendPasswordResetEmail(email, token);

  return NextResponse.json({ success: true });
}

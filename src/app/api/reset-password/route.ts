import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import { hash, compare } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  const { token, password } = await req.json();

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return NextResponse.json({
      success: false,
      message: "Invalid or expired token",
    });
  }

  // ✅ Check if same password as old
  const isSame = await compare(password, user.password);
  if (isSame) {
    return NextResponse.json({
      success: false,
      message: "You are using your previous password. Please choose a new one.",
    });
  }

  // ✅ Update password
  const hashed = await hash(password, 10);
  user.set("password", hashed);
  user.markModified("password");

  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;

  await user.save();

  return NextResponse.json({ success: true });
}

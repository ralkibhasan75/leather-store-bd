import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";

export async function POST(req: Request) {
  await connectDB();
  const { name, email, phone, password } = await req.json();

  if (!name || !email || !password || !phone) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  if (!/^(?:\+?88)?01[3-9]\d{8}$/.test(phone)) {
    return NextResponse.json(
      { error: "Invalid Bangladeshi phone number" },
      { status: 400 }
    );
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { error: "Email already exists" },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
  });

  return NextResponse.json({ success: true, userId: user._id });
}

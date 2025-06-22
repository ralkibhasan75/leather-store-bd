// src/lib/auth.ts
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export type CurrentUserType = {
  email: string;
  userId: string;
  name: string;
  role: string;
};

export async function getCurrentUser(): Promise<CurrentUserType | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as CurrentUserType;
    return decoded;
  } catch {
    return null;
  }
}

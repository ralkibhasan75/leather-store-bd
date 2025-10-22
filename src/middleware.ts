import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ====== SITE SUSPENSION FLAG ======
const SITE_UNPAID = true; // 🔴 toggle this flag to enable or disable suspension
const EXCLUDED_PATHS = ["/unpaid", "/api", "/_next", "/favicon.ico", "/admin"]; // allow system routes

// ====== ADMIN PROTECTION ======
function decodeJWT(token: string): { role?: string } | null {
  try {
    const base64Payload = token.split(".")[1];
    const payload = Buffer.from(base64Payload, "base64").toString("utf-8");
    return JSON.parse(payload);
  } catch (err) {
    console.error("❌ Failed to decode JWT:", err);
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 🔴 1. SITE PAYMENT CHECK
  if (SITE_UNPAID && !EXCLUDED_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL("/unpaid", request.url));
  }

  // 🧩 2. ADMIN AREA PROTECTION
  const protectedAdminPaths = ["/dashboard/admin", "/api/admin"];
  const isAdminPath = protectedAdminPaths.some((path) =>
    pathname.startsWith(path)
  );
  if (!isAdminPath) return NextResponse.next();

  const token = request.cookies.get("token")?.value;
  if (!token) {
    console.log("❌ No token found in cookies");
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  const decoded = decodeJWT(token);

  if (!decoded || decoded.role !== "admin") {
    console.log("❌ Blocked: Not admin or invalid token");
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  console.log("✅ Middleware Passed for Admin");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"], // match all except system internals
};

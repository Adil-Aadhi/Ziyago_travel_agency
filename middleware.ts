import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Please define JWT_SECRET in .env.local");
}

const secret = new TextEncoder().encode(JWT_SECRET);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;

  const { pathname } = request.nextUrl;

  // Allow the login page without authentication
  if (pathname === "/admin/login") {
    // If already logged in, don't show login again
    if (token) {
      try {
        await jwtVerify(token, secret);

        return NextResponse.redirect(
          new URL("/admin", request.url)
        );
      } catch {
        // Invalid/expired token.
        // Delete it and allow the user to login again.
        const response = NextResponse.next();

        response.cookies.delete("admin_token");

        return response;
      }
    }

    return NextResponse.next();
  }

  // Protect everything under /admin
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }

    try {
      await jwtVerify(token, secret);

      return NextResponse.next();
    } catch {
      const response = NextResponse.redirect(
        new URL("/admin/login", request.url)
      );

      response.cookies.delete("admin_token");

      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
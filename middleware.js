import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value; // Get JWT token from cookies
  const pathname = req.nextUrl.pathname;

  // Define protected routes (use regex-like matching)
  const protectedRoutes = [/^\/gallery$/, /^\/receipt(\/\d+)?$/];

  // Check if the request path matches any protected route
  const isProtected = protectedRoutes.some((route) => route.test(pathname));

  // If the user is trying to access a protected route without authentication
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next(); // Allow request to proceed
}

export const config = {
  matcher: ["/gallery", "/receipt/:path*"], // Apply middleware dynamically
};

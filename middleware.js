import { NextResponse } from "next/server";

// Define the protected routes
const protectedRoutes = ["/gallery", "/receipt"];

export function middleware(req) {
  const token = req.cookies.get("token")?.value; // Get JWT token from cookies

  // If the user is trying to access a protected route without authentication
  if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
    // Redirect the user to the sign-in page
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next(); // Allow the request to proceed
}

export const config = {
  matcher: ["/gallery", "/receipt"], // Apply middleware only to these routes
};

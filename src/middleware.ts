import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Define auth routes - the only routes accessible without authentication
const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/password",
  "/auth/password/email",
  "/auth/password/reset",
  "/auth/password/verify",
];

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const path = req.nextUrl.pathname;

  // Check if the current path is an auth route
  const isAuthRoute = authRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`)
  );

  // If user is logged in and trying to access auth pages, redirect to home
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If user is not logged in and not on auth routes, redirect to login
  if (!token && !isAuthRoute) {
    // Store the current URL to redirect back after login
    const callbackUrl = encodeURIComponent(req.url);
    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${callbackUrl}`, req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authStorage = request.cookies.get("auth-storage");
  const { pathname } = request.nextUrl;

  let isAuthenticated = false;
  if (authStorage) {
    try {
      const { state } = JSON.parse(authStorage.value);
      isAuthenticated = state.isAuthenticated;
    } catch (e) {
      // Invalid cookie
    }
  }

  // Protect the dashboard route
  if (pathname.startsWith("/dashboard") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to dashboard if already logged in and visiting login
  if (pathname === "/login" && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};

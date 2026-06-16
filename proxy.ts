import { NextRequest, NextResponse } from "next/server"
import { getSessionCookie } from "better-auth/cookies"
import { auth } from "./lib/auth";

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const { pathname } = request.nextUrl

  if (!session && !sessionCookie && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (session && sessionCookie && pathname === "/login") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
}

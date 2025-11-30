import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect admin routes
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const cookieName = process.env.ADMIN_SESSION_COOKIE_NAME || "disruptec_admin"
    const adminCookie = request.cookies.get(cookieName)

    if (!adminCookie || adminCookie.value !== "1") {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/admin/:path*",
}

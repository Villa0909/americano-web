import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Solo protegemos las rutas de administración
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Permitir la página de acceso
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const authenticated =
    request.cookies.get("admin_authenticated")?.value === "true";

  if (!authenticated) {
    const loginUrl = new URL(
      "/admin/login",
      request.url
    );

    loginUrl.searchParams.set(
      "redirect",
      pathname
    );

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
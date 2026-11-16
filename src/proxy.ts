import { NextResponse, type NextRequest } from "next/server";
import { authRoutes, protectedRoutes, routes } from "@/config/site";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/token";

function matches(pathname: string, list: readonly string[]) {
  return list.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await verifySessionToken(
    request.cookies.get(SESSION_COOKIE)?.value,
    process.env.SESSION_SECRET,
  );

  if (!session && matches(pathname, protectedRoutes)) {
    return NextResponse.redirect(new URL(routes.signIn, request.url));
  }

  if (session && matches(pathname, authRoutes)) {
    return NextResponse.redirect(new URL(routes.dashboard, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};

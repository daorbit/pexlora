import { NextResponse, type NextRequest } from "next/server";
import { authRoutes, protectedRoutes, routes } from "@/config/site";
import { SESSION_COOKIE, SIGNED_IN_COOKIE, verifySessionToken } from "@/lib/auth/token";
import { NEXT_PARAM, safeNextPath, withNextParam } from "@/lib/url/next-path";

function matches(pathname: string, list: readonly string[]) {
  return list.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export async function proxy(request: NextRequest) {
  const { pathname, search, searchParams } = request.nextUrl;
  const session = await verifySessionToken(
    request.cookies.get(SESSION_COOKIE)?.value,
    process.env.SESSION_SECRET,
  );

  if (!session && matches(pathname, protectedRoutes)) {
    return NextResponse.redirect(new URL(withNextParam(routes.signIn, `${pathname}${search}`), request.url));
  }

  if (session && matches(pathname, authRoutes)) {
    const next = safeNextPath(searchParams.get(NEXT_PARAM)) ?? routes.dashboard;
    return NextResponse.redirect(new URL(next, request.url));
  }

  const response = NextResponse.next();
  if (session && !request.cookies.has(SIGNED_IN_COOKIE)) {
    response.cookies.set(SIGNED_IN_COOKIE, "1", {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(session.expiresAt),
    });
  } else if (!session && request.cookies.has(SIGNED_IN_COOKIE)) {
    response.cookies.delete(SIGNED_IN_COOKIE);
  }
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};

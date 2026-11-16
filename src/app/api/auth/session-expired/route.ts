import { NextResponse, type NextRequest } from "next/server";
import { routes } from "@/config/site";
import { FLASH_COOKIE } from "@/content/toasts";
import { SESSION_COOKIE, SIGNED_IN_COOKIE } from "@/lib/auth/token";

export function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL(routes.signIn, request.url));
  response.cookies.delete(SESSION_COOKIE);
  response.cookies.delete(SIGNED_IN_COOKIE);
  response.cookies.set(FLASH_COOKIE, "session-expired", { path: "/", sameSite: "lax", maxAge: 60 });
  return response;
}

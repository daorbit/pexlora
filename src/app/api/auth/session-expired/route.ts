import { NextResponse, type NextRequest } from "next/server";
import { routes } from "@/config/site";
import { SESSION_COOKIE } from "@/lib/auth/token";

export function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL(routes.signIn, request.url));
  response.cookies.delete(SESSION_COOKIE);
  return response;
}

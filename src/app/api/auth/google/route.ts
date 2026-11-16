import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { createGoogleAuthRequest, OAUTH_COOKIE, OAUTH_COOKIE_TTL_SECONDS } from "@/lib/auth/google";
import { env } from "@/lib/env";
import { NEXT_PARAM, safeNextPath } from "@/lib/url/next-path";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const { url, cookie } = createGoogleAuthRequest({
    link: searchParams.get("link") === "1",
    next: safeNextPath(searchParams.get(NEXT_PARAM)),
  });
  const cookieStore = await cookies();

  cookieStore.set(OAUTH_COOKIE, JSON.stringify(cookie), {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: OAUTH_COOKIE_TTL_SECONDS,
  });

  return NextResponse.redirect(url);
}

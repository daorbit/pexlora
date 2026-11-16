import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createGoogleAuthRequest, OAUTH_COOKIE, OAUTH_COOKIE_TTL_SECONDS } from "@/lib/auth/google";
import { env } from "@/lib/env";

export async function GET() {
  const { url, cookie } = createGoogleAuthRequest();
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

import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { routes } from "@/config/site";
import { getGoogleProfile, OAUTH_COOKIE, type OAuthState } from "@/lib/auth/google";
import { signInWithGoogle } from "@/lib/auth/google-sign-in";
import { env } from "@/lib/env";

function redirectTo(path: string) {
  return NextResponse.redirect(`${env.appUrl}${path}`);
}

function readOAuthState(raw: string | undefined): OAuthState | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as OAuthState;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const cookieStore = await cookies();
  const saved = readOAuthState(cookieStore.get(OAUTH_COOKIE)?.value);
  cookieStore.delete(OAUTH_COOKIE);

  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (searchParams.get("error") === "access_denied") {
    return redirectTo(routes.signIn);
  }

  if (!code || !state || !saved || saved.state !== state) {
    return redirectTo(`${routes.signIn}?error=google`);
  }

  try {
    await signInWithGoogle(await getGoogleProfile(code, saved.verifier));
  } catch (error) {
    console.error("Google sign-in failed", error);
    return redirectTo(`${routes.signIn}?error=google`);
  }

  return redirectTo(routes.dashboard);
}

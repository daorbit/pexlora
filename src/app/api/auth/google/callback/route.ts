import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { routes } from "@/config/site";
import type { GoogleLinkResult } from "@/content/account";
import { getGoogleProfile, OAUTH_COOKIE, type OAuthState } from "@/lib/auth/google";
import { linkGoogleToCurrentUser, signInWithGoogle } from "@/lib/auth/google-sign-in";
import { env } from "@/lib/env";

function redirectTo(path: string) {
  return NextResponse.redirect(`${env.appUrl}${path}`);
}

function failureRedirect(link: boolean) {
  return redirectTo(link ? linkRedirectPath("error") : `${routes.signIn}?error=google`);
}

function linkRedirectPath(result: GoogleLinkResult) {
  return `${routes.dashboardSettings}?google=${result}`;
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

  const link = Boolean(saved?.link);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const googleError = searchParams.get("error");
  if (googleError === "access_denied") {
    return redirectTo(link ? routes.dashboardSettings : routes.signIn);
  }

  if (googleError || !code || !state || !saved || saved.state !== state) {
    console.error("Google callback rejected", {
      googleError,
      hasCode: Boolean(code),
      hasState: Boolean(state),
      hasCookie: Boolean(saved),
      stateMatches: saved?.state === state,
      host: request.nextUrl.host,
    });
    return failureRedirect(link);
  }

  try {
    const profile = await getGoogleProfile(code, saved.verifier);
    if (link) return redirectTo(linkRedirectPath(await linkGoogleToCurrentUser(profile)));
    await signInWithGoogle(profile);
  } catch (error) {
    console.error("Google sign-in failed", error);
    return failureRedirect(link);
  }

  return redirectTo(routes.dashboard);
}

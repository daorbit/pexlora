import { cookies } from "next/headers";
import { routes } from "@/config/site";
import { createOneTapNonce, ONE_TAP_COOKIE, OAUTH_COOKIE_TTL_SECONDS, verifyGoogleIdToken } from "@/lib/auth/google";
import { signInWithGoogle } from "@/lib/auth/google-sign-in";
import { env } from "@/lib/env";

const noStore = { "Cache-Control": "no-store" };

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return origin !== null && origin === new URL(env.appUrl).origin;
}

export async function GET() {
  const nonce = createOneTapNonce();
  const cookieStore = await cookies();
  cookieStore.set(ONE_TAP_COOKIE, nonce, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.isProduction,
    path: routes.googleOneTap,
    maxAge: OAUTH_COOKIE_TTL_SECONDS,
  });
  return Response.json({ nonce }, { headers: noStore });
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const nonce = cookieStore.get(ONE_TAP_COOKIE)?.value;
  cookieStore.delete({ name: ONE_TAP_COOKIE, path: routes.googleOneTap });

  if (!isSameOrigin(request) || !nonce) {
    return Response.json({ error: "Sign-in request rejected." }, { status: 403, headers: noStore });
  }

  const body = (await request.json().catch(() => null)) as { credential?: unknown } | null;
  if (typeof body?.credential !== "string") {
    return Response.json({ error: "Missing Google credential." }, { status: 400, headers: noStore });
  }

  try {
    await signInWithGoogle(await verifyGoogleIdToken(body.credential, nonce));
  } catch (error) {
    console.error("Google One Tap sign-in failed", error);
    return Response.json({ error: "Google sign-in failed." }, { status: 401, headers: noStore });
  }

  return Response.json({ ok: true }, { headers: noStore });
}

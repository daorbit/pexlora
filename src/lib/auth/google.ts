import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { routes } from "@/config/site";
import { env } from "@/lib/env";
import type { GoogleProfile } from "@/services/user.service";

const AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_ISSUERS = ["https://accounts.google.com", "accounts.google.com"];
const googleKeys = createRemoteJWKSet(new URL("https://www.googleapis.com/oauth2/v3/certs"));

export const OAUTH_COOKIE = "pexlora_oauth";
export const OAUTH_COOKIE_TTL_SECONDS = 600;
export const ONE_TAP_COOKIE = "pexlora_one_tap";

export type OAuthState = { state: string; verifier: string; link?: boolean; next?: string | null };

function base64Url(buffer: Buffer) {
  return buffer.toString("base64url");
}

function redirectUri() {
  return env.google.redirectUri ?? `${env.appUrl}${routes.googleCallback}`;
}

export function createGoogleAuthRequest({ link = false, next = null }: { link?: boolean; next?: string | null } = {}) {
  const state = base64Url(randomBytes(24));
  const verifier = base64Url(randomBytes(32));
  const challenge = base64Url(createHash("sha256").update(verifier).digest());

  const url = new URL(AUTH_URL);
  url.search = new URLSearchParams({
    client_id: env.google.clientId,
    redirect_uri: redirectUri(),
    response_type: "code",
    scope: "openid email profile",
    state,
    code_challenge: challenge,
    code_challenge_method: "S256",
    prompt: "select_account",
  }).toString();

  return { url: url.toString(), cookie: { state, verifier, link, next } satisfies OAuthState };
}

async function exchangeCode(code: string, verifier: string) {
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: env.google.clientId,
      client_secret: env.google.clientSecret,
      redirect_uri: redirectUri(),
      grant_type: "authorization_code",
      code_verifier: verifier,
    }),
  });

  if (!response.ok) {
    throw new Error(`Google token exchange failed: ${response.status} ${await response.text()}`);
  }

  const data = (await response.json()) as { id_token?: string };
  if (!data.id_token) throw new Error("Google response did not include an ID token");
  return data.id_token;
}

export function createOneTapNonce() {
  return base64Url(randomBytes(24));
}

export async function verifyGoogleIdToken(idToken: string, expectedNonce?: string): Promise<GoogleProfile> {
  const { payload } = await jwtVerify(idToken, googleKeys, {
    issuer: GOOGLE_ISSUERS,
    audience: env.google.clientId,
  });

  if (expectedNonce !== undefined && payload.nonce !== expectedNonce) {
    throw new Error("Google ID token nonce does not match");
  }

  if (typeof payload.email !== "string" || payload.email_verified !== true || !payload.sub) {
    throw new Error("Google account email is not verified");
  }

  return {
    googleId: payload.sub,
    email: payload.email,
    name: typeof payload.name === "string" && payload.name ? payload.name : payload.email.split("@")[0],
    avatarUrl: typeof payload.picture === "string" ? payload.picture : undefined,
  };
}

export async function getGoogleProfile(code: string, verifier: string): Promise<GoogleProfile> {
  return verifyGoogleIdToken(await exchangeCode(code, verifier));
}

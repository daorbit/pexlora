import { jwtVerify, SignJWT } from "jose";

export const SESSION_COOKIE = "pexlora_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

export type SessionPayload = {
  userId: string;
  expiresAt: number;
};

function getKey(secret: string) {
  return new TextEncoder().encode(secret);
}

export function signSessionToken(payload: SessionPayload, secret: string) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(payload.expiresAt / 1000))
    .sign(getKey(secret));
}

export async function verifySessionToken(
  token: string | undefined,
  secret: string | undefined,
): Promise<SessionPayload | null> {
  if (!token || !secret) return null;
  try {
    const { payload } = await jwtVerify<SessionPayload>(token, getKey(secret), {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    return null;
  }
}

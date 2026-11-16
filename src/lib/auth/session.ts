import "server-only";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { env } from "@/lib/env";
import {
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  signSessionToken,
  verifySessionToken,
} from "@/lib/auth/token";

export async function createSession(userId: string, version = 0) {
  const expiresAt = Date.now() + SESSION_TTL_SECONDS * 1000;
  const token = await signSessionToken({ userId, version, expiresAt }, env.sessionSecret);
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: "lax",
    path: "/",
    expires: new Date(expiresAt),
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  await connection();
  return verifySessionToken(
    cookieStore.get(SESSION_COOKIE)?.value,
    env.sessionSecret,
  );
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

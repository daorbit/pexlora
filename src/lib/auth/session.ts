import "server-only";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { env } from "@/lib/env";
import {
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  SIGNED_IN_COOKIE,
  signSessionToken,
  verifySessionToken,
} from "@/lib/auth/token";
import { isAccountSuspended } from "@/services/user.service";

export class AccountSuspendedError extends Error {
  constructor() {
    super("account_suspended");
    this.name = "AccountSuspendedError";
  }
}

export async function createSession(userId: string, version = 0) {
  if (await isAccountSuspended(userId)) throw new AccountSuspendedError();
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
  cookieStore.set(SIGNED_IN_COOKIE, "1", { secure: env.isProduction, sameSite: "lax", path: "/", expires: new Date(expiresAt) });
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
  cookieStore.delete(SIGNED_IN_COOKIE);
}

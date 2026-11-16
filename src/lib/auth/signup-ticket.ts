import "server-only";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { env } from "@/lib/env";

const TICKET_COOKIE = "pexlora_signup";
const TICKET_TTL_SECONDS = 60 * 60;
const AUDIENCE = "signup-verification";

export type SignupTicket = { email: string; next?: string };

const key = () => new TextEncoder().encode(env.sessionSecret);

export async function setSignupTicket(ticket: SignupTicket) {
  const token = await new SignJWT(ticket)
    .setProtectedHeader({ alg: "HS256" })
    .setAudience(AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(`${TICKET_TTL_SECONDS}s`)
    .sign(key());

  (await cookies()).set(TICKET_COOKIE, token, {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: TICKET_TTL_SECONDS,
  });
}

export async function readSignupTicket(): Promise<SignupTicket | null> {
  const token = (await cookies()).get(TICKET_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify<SignupTicket>(token, key(), { algorithms: ["HS256"], audience: AUDIENCE });
    return typeof payload.email === "string" ? { email: payload.email, next: payload.next } : null;
  } catch {
    return null;
  }
}

export async function clearSignupTicket() {
  (await cookies()).delete(TICKET_COOKIE);
}

export function maskEmail(email: string) {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  const visible = local.slice(0, Math.min(2, local.length));
  return `${visible}${"•".repeat(Math.max(1, local.length - visible.length))}@${domain}`;
}

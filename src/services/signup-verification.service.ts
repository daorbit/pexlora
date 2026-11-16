import "server-only";
import { createHmac, randomInt, timingSafeEqual } from "node:crypto";
import { SIGNUP_CODE } from "@/config/security";
import { connectToDatabase } from "@/lib/db/mongoose";
import { env } from "@/lib/env";
import { PendingSignup } from "@/models/PendingSignup";

const PENDING_TTL_MS = 60 * 60 * 1000;
const CODE_TTL_MS = SIGNUP_CODE.ttlMinutes * 60 * 1000;
const COOLDOWN_MS = SIGNUP_CODE.resendCooldownSeconds * 1000;

type NewSignup = { name: string; email: string; passwordHash: string };

export type IssueResult = { status: "sent"; code: string } | { status: "cooldown"; retryAfterSeconds: number } | { status: "limit" };

export type VerifyResult =
  | { status: "verified"; signup: NewSignup }
  | { status: "invalid"; attemptsLeft: number }
  | { status: "expired" };

function generateCode() {
  return Array.from({ length: SIGNUP_CODE.length }, () => randomInt(0, 10)).join("");
}

function hashCode(email: string, code: string) {
  return createHmac("sha256", env.sessionSecret).update(`signup:${email}:${code}`).digest("hex");
}

function sameHash(a: string, b: string) {
  const left = Buffer.from(a, "hex");
  const right = Buffer.from(b, "hex");
  return left.length === right.length && timingSafeEqual(left, right);
}

function codeFields(email: string, code: string, now: number) {
  return {
    codeHash: hashCode(email, code),
    attempts: 0,
    lastSentAt: new Date(now),
    codeExpiresAt: new Date(now + CODE_TTL_MS),
    expiresAt: new Date(now + PENDING_TTL_MS),
  };
}

export async function startSignup(signup: NewSignup): Promise<IssueResult> {
  await connectToDatabase();
  const now = Date.now();
  const existing = await PendingSignup.findOne({ email: signup.email }).lean();

  if (existing) {
    const wait = existing.lastSentAt.getTime() + COOLDOWN_MS - now;
    if (wait > 0) return { status: "cooldown", retryAfterSeconds: Math.ceil(wait / 1000) };
    if (existing.sends >= SIGNUP_CODE.maxSends) return { status: "limit" };
  }

  const code = generateCode();
  await PendingSignup.updateOne(
    { email: signup.email },
    { $set: { ...signup, ...codeFields(signup.email, code, now), sends: (existing?.sends ?? 0) + 1 } },
    { upsert: true },
  );
  return { status: "sent", code };
}

export async function resendSignupCode(email: string): Promise<IssueResult | { status: "missing" }> {
  await connectToDatabase();
  const now = Date.now();
  const pending = await PendingSignup.findOne({ email }).lean();
  if (!pending) return { status: "missing" };

  const wait = pending.lastSentAt.getTime() + COOLDOWN_MS - now;
  if (wait > 0) return { status: "cooldown", retryAfterSeconds: Math.ceil(wait / 1000) };
  if (pending.sends >= SIGNUP_CODE.maxSends) return { status: "limit" };

  const code = generateCode();
  await PendingSignup.updateOne({ email }, { $set: codeFields(email, code, now), $inc: { sends: 1 } });
  return { status: "sent", code };
}

export async function verifySignupCode(email: string, code: string): Promise<VerifyResult> {
  await connectToDatabase();
  const pending = await PendingSignup.findOneAndUpdate(
    { email, codeExpiresAt: { $gt: new Date() }, attempts: { $lt: SIGNUP_CODE.maxAttempts } },
    { $inc: { attempts: 1 } },
    { returnDocument: "after" },
  ).lean();

  if (!pending) return { status: "expired" };

  if (!sameHash(pending.codeHash, hashCode(email, code))) {
    return { status: "invalid", attemptsLeft: Math.max(0, SIGNUP_CODE.maxAttempts - pending.attempts) };
  }

  await PendingSignup.deleteOne({ email });
  return { status: "verified", signup: { name: pending.name, email: pending.email, passwordHash: pending.passwordHash } };
}

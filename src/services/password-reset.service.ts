import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { connectToDatabase } from "@/lib/db/mongoose";
import { PasswordReset } from "@/models/PasswordReset";

export const RESET_TOKEN_TTL_MINUTES = 60;
const RESEND_COOLDOWN_MS = 60 * 1000;

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createPasswordResetToken(userId: string) {
  await connectToDatabase();

  const recent = await PasswordReset.exists({
    userId,
    createdAt: { $gt: new Date(Date.now() - RESEND_COOLDOWN_MS) },
  });
  if (recent) return null;

  const token = randomBytes(32).toString("base64url");
  await PasswordReset.deleteMany({ userId });
  await PasswordReset.create({
    userId,
    tokenHash: hashToken(token),
    expiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MINUTES * 60 * 1000),
  });
  return token;
}

export async function consumePasswordResetToken(token: string) {
  await connectToDatabase();
  const reset = await PasswordReset.findOneAndDelete({
    tokenHash: hashToken(token),
    expiresAt: { $gt: new Date() },
  }).lean();
  if (!reset) return null;

  await PasswordReset.deleteMany({ userId: reset.userId });
  return reset.userId.toString();
}

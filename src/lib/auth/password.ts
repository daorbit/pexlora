import "server-only";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

let dummyHash: Promise<string> | undefined;

export function hashPassword(password: string) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function verifyPasswordSafely(password: string, hash: string | null | undefined) {
  if (hash) return bcrypt.compare(password, hash);
  dummyHash ??= hashPassword("timing-equalizer");
  await bcrypt.compare(password, await dummyHash);
  return false;
}

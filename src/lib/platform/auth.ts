import "server-only";
import { errors, importSPKI, jwtVerify, type CryptoKey } from "jose";
import { ApiError } from "@/lib/api/errors";
import { connectToDatabase } from "@/lib/db/mongoose";
import { env } from "@/lib/env";
import { PlatformTokenUse } from "@/models/PlatformTokenUse";

export const PLATFORM_AUDIENCE = "pexlora";

const ISSUER = "da-super-admin";
const MAX_LIFETIME_SECONDS = 90;
const CLOCK_TOLERANCE_SECONDS = 30;

export type PlatformAdmin = { id: string; email: string; scopes: string[] };

let keyCache: { source: string; keys: Map<string, Promise<CryptoKey>> } | null = null;

function toPem(value: string) {
  const trimmed = value.trim();
  return trimmed.startsWith("-----BEGIN") ? trimmed : Buffer.from(trimmed, "base64").toString("utf8");
}

function publicKeys() {
  const source = env.platformPublicKeys;
  if (keyCache?.source === source) return keyCache.keys;
  const parsed = source ? (JSON.parse(source) as Record<string, unknown>) : {};
  const keys = new Map(
    Object.entries(parsed)
      .filter((entry): entry is [string, string] => typeof entry[1] === "string")
      .map(([kid, pem]) => [kid, importSPKI(toPem(pem), "ES256")]),
  );
  keyCache = { source, keys };
  return keys;
}

async function claim(jti: string, expiresAt: Date) {
  await connectToDatabase();
  try {
    await PlatformTokenUse.create({ jti, expiresAt });
    return true;
  } catch (error) {
    if ((error as { code?: number }).code === 11000) return false;
    throw error;
  }
}

function bearer(request: Request) {
  const header = request.headers.get("authorization") ?? "";
  return header.startsWith("Bearer ") ? header.slice(7).trim() : "";
}

export async function requirePlatformAdmin(request: Request, scopes: string[]): Promise<PlatformAdmin> {
  const keys = publicKeys();
  if (!keys.size) throw new ApiError("platform_not_configured", 503);
  const token = bearer(request);
  if (!token) throw new ApiError("platform_missing", 401);

  let payload: Record<string, unknown>;
  try {
    const verified = await jwtVerify(
      token,
      async (header) => {
        const key = header.kid ? keys.get(header.kid) : undefined;
        if (!key) throw new errors.JWKSNoMatchingKey();
        return key;
      },
      { issuer: ISSUER, audience: PLATFORM_AUDIENCE, algorithms: ["ES256"], clockTolerance: CLOCK_TOLERANCE_SECONDS, requiredClaims: ["jti", "sub", "iat", "exp"] },
    );
    payload = verified.payload as Record<string, unknown>;
  } catch (error) {
    throw new ApiError(error instanceof errors.JWTExpired ? "platform_expired" : "platform_invalid", 401);
  }

  const { sub, email, scopes: granted, jti, iat, exp } = payload as { sub: string; email?: unknown; scopes?: unknown; jti: string; iat: number; exp: number };
  if (exp - iat > MAX_LIFETIME_SECONDS || !Array.isArray(granted)) throw new ApiError("platform_invalid", 401);
  if (!scopes.every((scope) => granted.includes(scope))) throw new ApiError("platform_forbidden", 403);
  if (!(await claim(jti, new Date((exp + CLOCK_TOLERANCE_SECONDS) * 1000)))) throw new ApiError("platform_replayed", 401);

  return { id: sub, email: typeof email === "string" ? email : "", scopes: granted.map(String) };
}

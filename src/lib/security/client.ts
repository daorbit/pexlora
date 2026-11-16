import "server-only";
import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { env } from "@/lib/env";

export function clientIp(source: Headers) {
  const forwarded = source.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || source.get("x-real-ip") || "unknown";
}

export function hashIdentifier(value: string) {
  return createHash("sha256").update(`${value}:${env.sessionSecret}`).digest("hex");
}

export function clientId(source: Headers) {
  return hashIdentifier(clientIp(source));
}

export async function requestClientId() {
  return clientId(await headers());
}

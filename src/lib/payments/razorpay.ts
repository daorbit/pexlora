import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { env } from "@/lib/env";

const API_BASE = "https://api.razorpay.com/v1";

export type RazorpayOrder = { id: string; amount: number; currency: string; status: string };

function authHeader() {
  const { keyId, keySecret } = env.razorpay;
  return `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`;
}

export async function createRazorpayOrder(input: {
  amount: number;
  currency: string;
  receipt: string;
  notes: Record<string, string>;
}): Promise<RazorpayOrder> {
  const response = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: { Authorization: authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(input),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Razorpay order failed with status ${response.status}`);
  return response.json();
}

function hmacHex(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

function safeEqualHex(expected: string, received: string) {
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(received, "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}

export function isValidPaymentSignature(orderId: string, paymentId: string, signature: string) {
  return safeEqualHex(hmacHex(`${orderId}|${paymentId}`, env.razorpay.keySecret), signature);
}

export function isValidWebhookSignature(rawBody: string, signature: string) {
  return safeEqualHex(hmacHex(rawBody, env.razorpayWebhookSecret), signature);
}

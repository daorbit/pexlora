import { routes } from "@/config/site";
import { apiRequest } from "@/services/api-client";

export async function fetchOneTapNonce() {
  const response = await apiRequest(routes.googleOneTap, { method: "GET", cache: "no-store" });
  const data: { nonce: string } = await response.json();
  return data.nonce;
}

export async function completeOneTap(credential: string) {
  await apiRequest(routes.googleOneTap, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ credential }),
  });
}

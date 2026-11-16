import { routes } from "@/config/site";
import { apiRequest } from "@/services/api-client";

export async function verifyPayment(input: { orderId: string; paymentId: string; signature: string }) {
  const response = await apiRequest(routes.verifyPaymentApi, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const data: { expiresAt: string | null } = await response.json();
  return data.expiresAt;
}

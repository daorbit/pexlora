import { routes } from "@/config/site";
import { apiRequest } from "@/services/api-client";

export async function consumeQuota(): Promise<number | null> {
  const response = await apiRequest(routes.usageApi, { method: "POST" });
  const data: { quotaRemaining: number | null } = await response.json();
  return data.quotaRemaining;
}

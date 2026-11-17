import { isPlanId, type PlanId } from "@/config/plans";
import { routes } from "@/config/site";

export const CHECKOUT_PARAM = "buy";

export function checkoutReturnPath(plan: PlanId) {
  return `${routes.pricing}?${CHECKOUT_PARAM}=${plan}`;
}

export function checkoutIntentFrom(path: string | null | undefined): PlanId | null {
  if (!path) return null;
  const url = new URL(path, "http://localhost");
  if (url.pathname !== routes.pricing) return null;
  const plan = url.searchParams.get(CHECKOUT_PARAM);
  return isPlanId(plan) ? plan : null;
}

import type { PlanId } from "@/config/plans";
import { routes } from "@/config/site";

export const CHECKOUT_PARAM = "buy";

export function checkoutReturnPath(plan: PlanId) {
  return `${routes.pricing}?${CHECKOUT_PARAM}=${plan}`;
}

import type { PlanId } from "@/config/plans";
import type { PlanGem } from "@/components/icons/PlanGemIcon";

export const planVisuals: Record<PlanId, { tone: string; gem: PlanGem }> = {
  "pro-30": { tone: "tone-silver", gem: "rhombus" },
  "pro-365": { tone: "tone-lime", gem: "brilliant" },
  "pro-lifetime": { tone: "tone-gold", gem: "crown" },
};

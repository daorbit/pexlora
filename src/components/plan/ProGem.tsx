import { memberCopy, planCopy } from "@/content/pricing";
import type { ActivePlan } from "@/lib/auth/plan";
import { cn } from "@/lib/utils/cn";
import { formatDate } from "@/lib/utils/format-date";
import { PlanGemIcon } from "@/components/icons/PlanGemIcon";
import { planGems } from "@/components/pricing/plan-visuals";

export function ProGem({ plan, className }: { plan: ActivePlan; className?: string }) {
  const planName = planCopy[plan.id].name;
  const validity = plan.expiresAt ? memberCopy.until(formatDate(plan.expiresAt, "long")) : memberCopy.lifetime;

  return (
    <span
      tabIndex={0}
      aria-label={`${memberCopy.label(planName)}. ${validity}`}
      className={cn("group relative inline-flex rounded-lg p-1 outline-ring focus-visible:outline-2", className)}
    >
      <PlanGemIcon gem={planGems[plan.id]} facets="dark" className="size-8" />
      <span
        role="tooltip"
        className="pointer-events-none absolute top-full right-1/2 z-50 mt-2 flex translate-x-1/2 flex-col items-center gap-0.5 rounded-xl bg-ink px-3 py-2 text-center whitespace-nowrap text-ink-foreground opacity-0 shadow-card transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        <span className="text-[13px] font-semibold">
          {memberCopy.badge} · {planName}
        </span>
        <span className="text-[11.5px] opacity-70">{validity}</span>
      </span>
    </span>
  );
}

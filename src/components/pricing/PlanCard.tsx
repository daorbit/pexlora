import type { ReactNode } from "react";
import { formatPrice, type Plan } from "@/config/plans";
import { planCopy, pricingCopy } from "@/content/pricing";
import { cn } from "@/lib/utils/cn";
import { PlanGemIcon } from "@/components/icons/PlanGemIcon";
import { PlanPerks } from "@/components/pricing/PlanPerks";
import { planGems } from "@/components/pricing/plan-visuals";

export function PlanCard({ plan, action }: { plan: Plan; action: ReactNode }) {
  const copy = planCopy[plan.id];
  const featured = Boolean(plan.featured);

  return (
    <article
      className={cn(
        "flex flex-col gap-5 rounded-3xl p-6 text-foreground sm:p-7.5",
        featured
          ? "theme-invert bg-background shadow-[0_30px_60px_-30px_rgba(16,18,13,0.55)] md:py-10"
          : "border border-separator bg-surface",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <PlanGemIcon gem={planGems[plan.id]} facets={featured ? "dark" : "light"} className="size-11 sm:size-12" />
          <div className="flex flex-col">
            <h3 className="text-lg font-bold tracking-[-0.02em]">{copy.name}</h3>
            <p className="text-[13px] text-secondary">{copy.note}</p>
          </div>
        </div>
        {featured && (
          <span className="shrink-0 rounded-md bg-primary px-2 py-1 text-[10.5px] font-extrabold tracking-[0.08em] text-primary-foreground uppercase">
            {pricingCopy.featured}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="flex items-baseline gap-2">
          <span
            className={cn(
              "leading-none font-extrabold tracking-[-0.045em] tabular-nums",
              featured ? "text-[48px] sm:text-[58px]" : "text-[44px] sm:text-[50px]",
            )}
          >
            {formatPrice(plan.amountPaise)}
          </span>
          <span className="text-sm font-medium text-tertiary">{copy.period}</span>
        </p>
        <p className={cn("text-[13px]", featured ? "font-semibold text-accent-text" : "text-tertiary")}>
          {pricingCopy.perDay(plan)}
        </p>
      </div>

      {action}

      <PlanPerks featured={featured} />
    </article>
  );
}

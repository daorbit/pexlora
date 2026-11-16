import type { ReactNode } from "react";
import { formatPrice, type Plan } from "@/config/plans";
import { planCopy, pricingCopy } from "@/content/pricing";
import { cn } from "@/lib/utils/cn";
import { PlanGemIcon } from "@/components/icons/PlanGemIcon";
import { planGems } from "@/components/pricing/plan-visuals";

export function PlanCard({ plan, action }: { plan: Plan; action: ReactNode }) {
  const copy = planCopy[plan.id];
  const featured = Boolean(plan.featured);

  return (
    <article
      className={cn(
        "flex flex-col gap-5.5 rounded-[28px] p-7.5 text-foreground",
        featured
          ? "theme-invert bg-background py-10 shadow-[0_30px_60px_-30px_rgba(16,18,13,0.55)]"
          : "border border-separator bg-surface",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <PlanGemIcon gem={planGems[plan.id]} facets={featured ? "dark" : "light"} className={featured ? "size-18" : "size-16"} />
        {featured && (
          <span className="rounded-lg bg-primary px-2.5 py-1.5 text-[11px] font-extrabold tracking-[0.08em] text-primary-foreground uppercase">
            {pricingCopy.featured}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold tracking-[-0.02em]">{copy.name}</h3>
        <p className="text-sm text-secondary">{copy.note}</p>
      </div>

      <div className="flex flex-col gap-1">
        <p className="flex items-baseline gap-2">
          <span
            className={cn(
              "leading-none font-extrabold tracking-[-0.045em] tabular-nums",
              featured ? "text-[58px]" : "text-[50px]",
            )}
          >
            {formatPrice(plan.amountPaise)}
          </span>
          <span className="text-sm font-medium text-tertiary">{copy.period}</span>
        </p>
        <p className={cn("text-[13px]", featured ? "font-semibold text-accent-text" : "text-tertiary")}>{pricingCopy.perDay(plan)}</p>
      </div>

      {action}

      <ul className="flex flex-col gap-2.75 text-sm text-secondary">
        {pricingCopy.perks.map((perk) => (
          <li key={perk}>{perk}</li>
        ))}
      </ul>
    </article>
  );
}

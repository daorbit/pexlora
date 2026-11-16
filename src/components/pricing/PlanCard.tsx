import type { ReactNode } from "react";
import { formatPrice, type Plan } from "@/config/plans";
import { planCopy, pricingCopy } from "@/content/pricing";
import { cn } from "@/lib/utils/cn";
import { CheckList } from "@/components/ui/CheckList";
import { PlanGemIcon } from "@/components/icons/PlanGemIcon";
import { planVisuals } from "@/components/pricing/plan-visuals";

export function PlanCard({ plan, action }: { plan: Plan; action: ReactNode }) {
  const copy = planCopy[plan.id];
  const { tone, gem } = planVisuals[plan.id];

  return (
    <article
      className={cn(
        "relative flex flex-col gap-7 rounded-3xl bg-surface p-6 text-foreground ring-1 ring-separator sm:p-7",
        tone,
        plan.featured && "ring-2 ring-tone md:-my-3 md:py-10",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl tile-fill text-primary-foreground">
            <PlanGemIcon gem={gem} className="size-6" />
          </span>
          <div className="flex flex-col">
            <h3 className="text-[17px] font-semibold tracking-[-0.02em]">{copy.name}</h3>
            <p className="text-[13px] text-secondary">{copy.note}</p>
          </div>
        </div>
        {plan.featured && (
          <span className="shrink-0 rounded-md bg-primary px-2 py-1 text-[11px] font-semibold tracking-[0.04em] text-primary-foreground uppercase">
            {pricingCopy.featured}
          </span>
        )}
      </div>

      <p className="flex items-baseline gap-2 border-b border-separator pb-7">
        <span className="text-[48px] leading-none font-bold tracking-[-0.045em] tabular-nums">{formatPrice(plan.amountPaise)}</span>
        <span className="text-sm font-medium text-tertiary">{copy.period}</span>
      </p>

      <CheckList items={pricingCopy.perks} />
      <div className="mt-auto pt-1">{action}</div>
    </article>
  );
}

import Link from "next/link";
import { memberCopy, planCopy } from "@/content/pricing";
import type { ActivePlan } from "@/lib/auth/plan";
import { cn } from "@/lib/utils/cn";
import { PlanGemIcon } from "@/components/icons/PlanGemIcon";
import { planGems } from "@/components/pricing/plan-visuals";

type ProBadgeProps = { plan: ActivePlan; label?: string; className?: string; href?: string };

export function ProBadge({ plan, label = memberCopy.badge, className, href }: ProBadgeProps) {
  const title = memberCopy.label(planCopy[plan.id].name);
  const classes = cn(
    "inline-flex shrink-0 items-center gap-1 rounded-md bg-ink py-0.5 pr-1.5 pl-1 text-[11px] font-bold tracking-[0.02em] text-ink-foreground",
    href && "transition-colors hover:bg-ink-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    className,
  );
  const content = (
    <>
      <PlanGemIcon gem={planGems[plan.id]} facets="dark" className="size-3.5" />
      {label}
    </>
  );

  if (href) {
    return (
      <Link href={href} title={title} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <span title={title} className={classes}>
      {content}
    </span>
  );
}

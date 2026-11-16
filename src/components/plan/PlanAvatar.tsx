import type { ComponentProps } from "react";
import type { ActivePlan } from "@/lib/auth/plan";
import { UserAvatar } from "@/components/ui/UserAvatar";
import { PlanGemIcon } from "@/components/icons/PlanGemIcon";
import { planGems } from "@/components/pricing/plan-visuals";

type PlanAvatarProps = ComponentProps<typeof UserAvatar> & { plan: ActivePlan | null };

export function PlanAvatar({ plan, ...avatar }: PlanAvatarProps) {
  if (!plan) return <UserAvatar {...avatar} />;

  return (
    <span className="relative inline-flex shrink-0">
      <UserAvatar {...avatar} />
      <span className="absolute -right-1 -bottom-1 inline-flex size-4.5 items-center justify-center rounded-full bg-surface ring-2 ring-surface">
        <PlanGemIcon gem={planGems[plan.id]} facets="dark" className="size-3.5" />
      </span>
    </span>
  );
}

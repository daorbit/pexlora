"use client";

import { LoaderCircle } from "lucide-react";
import { PLAN_IDS, PLANS } from "@/config/plans";
import { routes } from "@/config/site";
import { checkoutCopy, planCopy, pricingCopy } from "@/content/pricing";
import { useCheckout } from "@/hooks/useCheckout";
import { useSignedIn } from "@/hooks/useSignedIn";
import { withNextParam } from "@/lib/url/next-path";
import { cn } from "@/lib/utils/cn";
import { Button, ButtonLink } from "@/components/ui/Button";
import { PlanCard } from "@/components/pricing/PlanCard";

export function PricingPlans() {
  const signedIn = useSignedIn();
  const { buy, pendingPlan } = useCheckout();

  return (
    <div className="grid items-center gap-4 sm:gap-5 md:grid-cols-3">
      {PLAN_IDS.map((id) => {
        const plan = PLANS[id];
        const variant = plan.featured ? "primary" : "outline";
        const actionClass = cn("h-12 w-full sm:h-13", plan.featured ? "font-bold" : "border-[1.5px] border-foreground");
        const pending = pendingPlan === id;
        const action = signedIn ? (
          <Button
            variant={variant}
            size="xl"
            disabled={pendingPlan !== null}
            onClick={() => buy(id)}
            className={actionClass}
          >
            {pending && <LoaderCircle className="size-4 animate-spin" aria-hidden />}
            {pending ? checkoutCopy.processing : planCopy[id].cta}
          </Button>
        ) : (
          <ButtonLink href={withNextParam(routes.signIn, routes.pricing)} variant={variant} size="xl" className={actionClass}>
            {pricingCopy.signInToBuy}
          </ButtonLink>
        );
        return <PlanCard key={id} plan={plan} action={action} />;
      })}
    </div>
  );
}

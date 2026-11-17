"use client";

import { LoaderCircle } from "lucide-react";
import { PLAN_IDS, PLANS } from "@/config/plans";
import { routes } from "@/config/site";
import { checkoutCopy, planCopy } from "@/content/pricing";
import { useCheckout } from "@/hooks/useCheckout";
import { useResumeCheckout } from "@/hooks/useResumeCheckout";
import { useSignedIn } from "@/hooks/useSignedIn";
import { checkoutReturnPath } from "@/lib/payments/checkout-intent";
import { withNextParam } from "@/lib/url/next-path";
import { cn } from "@/lib/utils/cn";
import { Button, ButtonLink } from "@/components/ui/Button";
import { PlanCard } from "@/components/pricing/PlanCard";
import { ProWelcomeDialog } from "@/components/pricing/ProWelcomeDialog";

export function PricingPlans() {
  const signedIn = useSignedIn();
  const { buy, pendingPlan, welcome, closeWelcome } = useCheckout();
  useResumeCheckout(buy, signedIn);

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
          <ButtonLink href={withNextParam(routes.signUp, checkoutReturnPath(id))} variant={variant} size="xl" className={actionClass}>
            {planCopy[id].cta}
          </ButtonLink>
        );
        return <PlanCard key={id} plan={plan} action={action} />;
      })}
      {welcome && <ProWelcomeDialog {...welcome} onClose={closeWelcome} />}
    </div>
  );
}

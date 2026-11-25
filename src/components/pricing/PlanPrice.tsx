import { formatPrice, type Plan } from "@/config/plans";
import { offerCopy } from "@/content/offers";
import { planCopy, pricingCopy } from "@/content/pricing";
import { offerAmountPaise } from "@/lib/offers/offer-pricing";
import { cn } from "@/lib/utils/cn";
import { OfferSavingChip } from "@/components/offer/OfferSavingChip";

export function PlanPrice({ plan, featured }: { plan: Plan; featured: boolean }) {
  const offerPlan = { ...plan, amountPaise: offerAmountPaise(plan.amountPaise) };
  const priceClass = cn(
    "leading-none font-extrabold tracking-[-0.045em] tabular-nums",
    featured ? "text-[48px] sm:text-[58px]" : "text-[44px] sm:text-[50px]",
  );

  return (
    <div className="flex flex-col gap-1.5">
      <p className="flex flex-wrap items-baseline gap-x-2">
        <span className={cn(priceClass, "offer-on:hidden")}>{formatPrice(plan.amountPaise)}</span>
        <span className={cn(priceClass, "hidden offer-on:inline")}>{formatPrice(offerPlan.amountPaise)}</span>
        <s className="hidden text-lg font-semibold text-tertiary tabular-nums offer-on:inline">
          <span className="sr-only">{offerCopy.regularPrice} </span>
          {formatPrice(plan.amountPaise)}
        </s>
        <span className="text-sm font-medium text-tertiary">{planCopy[plan.id].period}</span>
      </p>
      <p
        className={cn(
          "flex flex-wrap items-center gap-2 text-[13px]",
          featured ? "font-semibold text-accent-text" : "text-tertiary",
        )}
      >
        <span className="offer-on:hidden">{pricingCopy.perDay(plan)}</span>
        <span className="hidden offer-on:inline">{pricingCopy.perDay(offerPlan)}</span>
        <OfferSavingChip className="hidden offer-on:inline" />
      </p>
    </div>
  );
}

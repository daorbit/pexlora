import { routes } from "@/config/site";
import { pricingCopy } from "@/content/pricing";
import { ButtonLink } from "@/components/ui/Button";

export function PricingFreeNote() {
  return (
    <div className="flex flex-col items-start gap-4 rounded-3xl border border-separator bg-surface p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-7">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold tracking-[-0.02em] sm:text-xl">{pricingCopy.freeTitle}</h2>
        <p className="text-sm text-secondary sm:text-[15px]">{pricingCopy.freeBody}</p>
      </div>
      <ButtonLink href={routes.home} variant="ink" size="lg" arrow className="w-full shrink-0 sm:w-auto">
        {pricingCopy.freeCta}
      </ButtonLink>
    </div>
  );
}

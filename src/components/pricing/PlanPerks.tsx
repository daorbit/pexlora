import { Check } from "lucide-react";
import { pricingCopy } from "@/content/pricing";
import { cn } from "@/lib/utils/cn";

export function PlanPerks({ featured }: { featured: boolean }) {
  return (
    <div className="flex flex-col gap-3 border-t border-separator pt-5">
      <p className="text-[11px] font-semibold tracking-[0.08em] text-tertiary uppercase">{pricingCopy.perksTitle}</p>
      <ul className="flex flex-col gap-2.5 text-sm">
        {pricingCopy.perks.map((perk) => (
          <li key={perk} className="flex items-start gap-2.5">
            <span
              className={cn(
                "mt-px flex size-4.5 shrink-0 items-center justify-center rounded-full",
                featured ? "bg-primary text-primary-foreground" : "bg-fill text-foreground",
              )}
            >
              <Check className="size-3" strokeWidth={3} aria-hidden />
            </span>
            <span className="text-foreground/85">{perk}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

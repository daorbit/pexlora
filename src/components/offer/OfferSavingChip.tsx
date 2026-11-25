import { offerCopy } from "@/content/offers";
import { cn } from "@/lib/utils/cn";

export function OfferSavingChip({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "rounded-md bg-primary px-1.5 py-0.5 text-[12px] leading-tight font-bold whitespace-nowrap text-primary-foreground",
        className,
      )}
    >
      {offerCopy.saving}
    </span>
  );
}

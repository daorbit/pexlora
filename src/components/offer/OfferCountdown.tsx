import { countdownUnits, offerCopy } from "@/content/offers";
import { cn } from "@/lib/utils/cn";

export function OfferCountdown({ minutesLeft, className }: { minutesLeft: number | null; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", minutesLeft === null && "invisible", className)}>
      <span className="text-[13px] font-medium text-foreground/80">{offerCopy.endsIn}</span>
      <div className="flex gap-1.5">
        {countdownUnits(minutesLeft ?? 0).map((unit) => (
          <span key={unit.label} className="flex w-12 flex-col items-center rounded-lg bg-background/45 py-1">
            <span className="text-[17px] leading-tight font-bold tabular-nums">{unit.value}</span>
            <span className="text-[10.5px] leading-tight text-foreground/75">{unit.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

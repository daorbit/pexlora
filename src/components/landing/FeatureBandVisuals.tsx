import { ArrowRight } from "lucide-react";
import { featureBands } from "@/content/landing";
import { cn } from "@/lib/utils/cn";
import { StrikeText } from "@/components/ui/StrikeText";
import { SwapStack } from "@/components/ui/SwapStack";

const chip =
  "inline-flex h-12 items-center gap-3 rounded-xl px-4 text-[24px] font-bold tracking-[-0.04em] whitespace-nowrap sm:h-20 sm:gap-4 sm:rounded-2xl sm:px-6 sm:text-[48px] lg:h-35 lg:gap-6 lg:rounded-[28px] lg:px-11 lg:text-[84px] lg:tracking-[-0.05em]";

const giantNumber =
  "text-[40px] leading-[0.95] font-extrabold tracking-[-0.06em] whitespace-nowrap sm:text-[72px] md:text-[96px] lg:text-[150px] lg:leading-[0.9] lg:tracking-[-0.07em]";

export function LocationVisual() {
  return (
    <StrikeText
      text={featureBands.location.value}
      className="font-mono text-[20px] leading-none font-medium tracking-[-0.05em] sm:text-[40px] md:text-[60px] lg:text-[92px] lg:tracking-[-0.06em]"
    />
  );
}

export function AiLabelVisual() {
  const { before, after } = featureBands.ai;

  return (
    <SwapStack
      first={
        <span className={cn(chip, "bg-foreground text-background")}>
          <span className="size-5 rounded-md bg-warning sm:size-10 sm:rounded-lg lg:size-14 lg:rounded-2xl" aria-hidden />
          {before}
        </span>
      }
      second={<span className={cn(chip, "bg-primary text-primary-foreground")}>{after}</span>}
    />
  );
}

export function SizeVisual() {
  const { from, format, to } = featureBands.convert;

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 sm:gap-x-6 lg:gap-x-10">
      <span className={cn(giantNumber, "text-border-strong")}>{from}</span>
      <ArrowRight className="size-7 shrink-0 text-tertiary sm:size-11 lg:size-16" strokeWidth={2} aria-hidden />
      <SwapStack
        className={giantNumber}
        first={<span>{format}</span>}
        second={<span className="text-primary">{to}</span>}
      />
    </div>
  );
}

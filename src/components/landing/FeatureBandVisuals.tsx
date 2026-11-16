import { featureBands } from "@/content/landing";
import { cn } from "@/lib/utils/cn";
import { StrikeText } from "@/components/ui/StrikeText";
import { SwapStack } from "@/components/ui/SwapStack";

const chip =
  "inline-flex h-16 items-center gap-4 rounded-2xl px-6 text-[34px] font-bold tracking-[-0.05em] whitespace-nowrap sm:h-24 sm:text-[56px] lg:h-35 lg:gap-6 lg:rounded-[28px] lg:px-11 lg:text-[84px]";

const giantNumber = "text-[56px] leading-[0.9] font-extrabold tracking-[-0.07em] whitespace-nowrap md:text-[96px] lg:text-[150px]";

export function LocationVisual() {
  return (
    <StrikeText
      text={featureBands.location.value}
      className="font-mono text-[26px] leading-none font-medium tracking-[-0.06em] sm:text-[44px] md:text-[64px] lg:text-[92px]"
    />
  );
}

export function AiLabelVisual() {
  const { before, after } = featureBands.ai;

  return (
    <SwapStack
      first={
        <span className={cn(chip, "bg-foreground text-background")}>
          <span className="size-8 rounded-lg bg-warning sm:size-11 lg:size-14 lg:rounded-2xl" aria-hidden />
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
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 lg:gap-x-10">
      <span className={cn(giantNumber, "text-border-strong")}>{from}</span>
      <span className="text-[32px] text-tertiary lg:text-[60px]" aria-hidden>
        →
      </span>
      <SwapStack
        className={giantNumber}
        first={<span>{format}</span>}
        second={<span className="text-primary">{to}</span>}
      />
    </div>
  );
}

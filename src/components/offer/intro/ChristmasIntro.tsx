import { ChristmasTrain } from "@/components/offer/intro/ChristmasTrain";
import { IntroSnow } from "@/components/offer/intro/IntroSnow";
import { SnowDrift } from "@/components/offer/SnowDrift";

export function ChristmasIntro() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] animate-intro-fade overflow-hidden motion-reduce:hidden"
    >
      <IntroSnow />

      <div className="absolute inset-x-0 bottom-0 animate-ground-rise">
        <div className="train-climb">
          <ChristmasTrain />
        </div>
        <div className="relative -mt-3 sm:-mt-4">
          <SnowDrift className="h-6 fill-surface sm:h-8 dark:fill-ink-hover" />
          <div className="h-5 bg-surface sm:h-8 dark:bg-ink-hover" />
        </div>
      </div>
    </div>
  );
}

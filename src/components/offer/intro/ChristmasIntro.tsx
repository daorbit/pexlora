import { ChristmasTrain } from "@/components/offer/intro/ChristmasTrain";
import { SnowDrift } from "@/components/offer/SnowDrift";
import { Snowfall } from "@/components/offer/Snowfall";

const snowLayers = ["left-0", "left-[2.5%]", "left-[5%]", "-left-[2%]"];

export function ChristmasIntro() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] animate-intro-fade overflow-hidden motion-reduce:hidden"
    >
      {snowLayers.map((layer) => (
        <Snowfall key={layer} size="large" className={`text-border-strong dark:text-foreground/75 ${layer}`} />
      ))}

      <div className="absolute inset-x-0 bottom-0 animate-ground-rise">
        <ChristmasTrain />
        <div className="relative -mt-3 sm:-mt-4">
          <SnowDrift className="h-6 fill-surface sm:h-8 dark:fill-ink-hover" />
          <div className="h-5 bg-surface sm:h-8 dark:bg-ink-hover" />
        </div>
      </div>
    </div>
  );
}

import { SnowFlake } from "@/components/offer/SnowFlake";
import { introSnowLayers, swayTimes } from "@/components/offer/intro/intro-snow-layers";
import { cn } from "@/lib/utils/cn";

export function IntroSnow() {
  return (
    <div className="absolute inset-0 text-border-strong dark:text-foreground">
      {introSnowLayers.map((layer) => (
        <div key={layer.className} className={cn("absolute inset-0", layer.className)}>
          {layer.flakes.map((flake, index) => (
            <SnowFlake
              key={flake}
              className={cn(flake, swayTimes[index % swayTimes.length])}
              dotClassName={layer.dots[index % layer.dots.length]}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

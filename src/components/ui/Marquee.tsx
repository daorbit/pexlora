import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
};

export function Marquee({ children, className, trackClassName }: MarqueeProps) {
  const track = cn("flex shrink-0 items-baseline", trackClassName);

  return (
    <div className={cn("overflow-hidden", className)}>
      <div className="flex w-max motion-safe:animate-marquee-x">
        <div className={track}>{children}</div>
        <div className={track} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

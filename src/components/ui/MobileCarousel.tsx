"use client";

import type { ReactNode } from "react";
import { useMobileCarousel, type CarouselBreakpoint } from "@/hooks/useMobileCarousel";
import { cn } from "@/lib/utils/cn";
import { CarouselDots } from "@/components/ui/CarouselDots";

type MobileCarouselProps = {
  label: string;
  until?: CarouselBreakpoint;
  as?: "ul" | "ol";
  className?: string;
  trackClassName?: string;
  dotsClassName?: string;
  children: ReactNode;
};

const hideFrom: Record<CarouselBreakpoint, string> = { sm: "sm:hidden", md: "md:hidden" };
const clipUntil: Record<CarouselBreakpoint, string> = { sm: "max-sm:overflow-hidden", md: "max-md:overflow-hidden" };

export function MobileCarousel({
  label,
  until = "sm",
  as: List = "ul",
  className,
  trackClassName,
  dotsClassName,
  children,
}: MobileCarouselProps) {
  const { viewportRef, selected, snapCount, scrollTo } = useMobileCarousel(until);

  return (
    <div className={cn("flex min-w-0 flex-col", className)} role="region" aria-roledescription="carousel" aria-label={label}>
      <div ref={viewportRef} className={clipUntil[until]}>
        <List className={cn("flex touch-pan-y", trackClassName)}>{children}</List>
      </div>
      <CarouselDots
        count={snapCount}
        selected={selected}
        onSelect={scrollTo}
        className={cn(hideFrom[until], dotsClassName)}
      />
    </div>
  );
}

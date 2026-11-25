"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { routes } from "@/config/site";
import { formatTimeLeft, offerCopy } from "@/content/offers";
import { useOfferMinutesLeft } from "@/hooks/useOfferMinutesLeft";
import { cn } from "@/lib/utils/cn";
import { ChristmasTreeIcon } from "@/components/icons/ChristmasTreeIcon";
import { LightString } from "@/components/offer/LightString";
import { OfferSavingChip } from "@/components/offer/OfferSavingChip";
import { Snowfall } from "@/components/offer/Snowfall";
import { TreeCluster } from "@/components/offer/TreeCluster";
import { Container } from "@/components/ui/Container";
import { ResponsiveLabel } from "@/components/ui/ResponsiveLabel";

export function OfferRibbon() {
  const minutesLeft = useOfferMinutesLeft();

  return (
    <aside aria-label={offerCopy.region} data-nosnippet className="relative z-46 hidden offer-ribbon:block">
      <div className="theme-dark relative overflow-hidden bg-festive-pine text-foreground">
        <TreeCluster className="left-4 xl:left-8" />
        <TreeCluster className="right-4 -scale-x-100 xl:right-8" />
        <Snowfall className="text-foreground/70" />
        <Container className="relative flex h-10 items-center justify-center">
          <Link
            href={routes.pricing}
            className="group flex h-full min-w-0 items-center justify-center gap-1.5 text-[12.5px] font-semibold whitespace-nowrap focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring sm:gap-2.5 sm:text-[13.5px]"
          >
            <ChristmasTreeIcon className="size-6 shrink-0 origin-bottom motion-safe:animate-sway" />
            <span>
              <ResponsiveLabel short={offerCopy.nameShort} full={offerCopy.name} />
            </span>
            <OfferSavingChip className="motion-safe:animate-gift-wiggle" />
            <span>
              <ResponsiveLabel short={offerCopy.scopeShort} full={offerCopy.scope} />
            </span>
            <span className={cn("font-medium text-foreground/85 tabular-nums", minutesLeft === null && "invisible")}>
              <span className="max-sm:sr-only">{offerCopy.endsIn} </span>
              {formatTimeLeft(minutesLeft ?? 0)}
            </span>
            <span className="underline decoration-primary decoration-2 underline-offset-4 max-sm:sr-only">
              {offerCopy.cta}
            </span>
            <ArrowRight className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </Container>
      </div>
      <LightString />
    </aside>
  );
}

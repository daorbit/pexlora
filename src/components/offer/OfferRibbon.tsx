"use client";

import Image from "next/image";
import { routes } from "@/config/site";
import { formatTimeLeft, offerCopy } from "@/content/offers";
import { useOfferMinutesLeft } from "@/hooks/useOfferMinutesLeft";
import { cn } from "@/lib/utils/cn";
import { ChristmasTreeIcon } from "@/components/icons/ChristmasTreeIcon";
import { LightString } from "@/components/offer/LightString";
import { OfferCountdown } from "@/components/offer/OfferCountdown";
import { SnowDrift } from "@/components/offer/SnowDrift";
import { Snowfall } from "@/components/offer/Snowfall";
import { TreeCluster } from "@/components/offer/TreeCluster";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Highlight } from "@/components/ui/Highlight";
import { ResponsiveLabel } from "@/components/ui/ResponsiveLabel";

export function OfferRibbon() {
  const minutesLeft = useOfferMinutesLeft();

  return (
    <aside aria-label={offerCopy.region} data-nosnippet className="relative z-46 hidden offer-ribbon:block">
      <div className="theme-dark relative overflow-hidden bg-festive-pine text-foreground">
        <TreeCluster className="bottom-1.5 left-4 2xl:left-8" />
        <TreeCluster className="right-4 bottom-1.5 -scale-x-100 2xl:right-8" />
        <Snowfall className="text-foreground/70" />
        <LightString className="top-0" />

        <Container className="relative flex h-18 items-center gap-3 pt-2.5 pb-2 sm:h-24 sm:gap-5 sm:pt-3 lg:justify-center lg:gap-8">
          <ChristmasTreeIcon className="size-9 shrink-0 origin-bottom motion-safe:animate-sway sm:hidden" />
          <Image
            src="/christmas/snowman.svg"
            alt=""
            width={130}
            height={120}
            unoptimized
            className="h-19 w-auto shrink-0 self-end max-sm:hidden"
          />

          <div className="min-w-0 flex-1 lg:flex-none">
            <p className="text-[15px] leading-tight font-bold tracking-[-0.02em] sm:text-[21px] lg:text-[26px]">
              <ResponsiveLabel short={offerCopy.nameShort} full={offerCopy.name} /> <Highlight>{offerCopy.saving}</Highlight>{" "}
              <span className="max-sm:sr-only">{offerCopy.scope}</span>
            </p>
            <p
              className={cn(
                "mt-1 text-[12px] leading-tight text-foreground/85 tabular-nums sm:hidden",
                minutesLeft === null && "invisible",
              )}
            >
              {offerCopy.endsIn} {formatTimeLeft(minutesLeft ?? 0)}
            </p>
            <p className="mt-1.5 text-[13px] leading-tight text-foreground/85 max-sm:hidden">{offerCopy.note}</p>
          </div>

          <OfferCountdown minutesLeft={minutesLeft} className="max-lg:hidden" />

          <ButtonLink href={routes.pricing} arrow className="h-9 shrink-0 px-3.5 text-[13px] sm:h-10 sm:px-4.5 sm:text-sm">
            {offerCopy.cta}
          </ButtonLink>
        </Container>
      </div>
      <SnowDrift className="absolute -bottom-px left-0 h-2.5 fill-background dark:fill-ink-hover sm:h-3.5" />
    </aside>
  );
}

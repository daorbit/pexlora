import { differenceCards, differenceCopy } from "@/content/landing";
import { Band } from "@/components/ui/Band";
import { Highlight } from "@/components/ui/Highlight";
import { MobileCarousel } from "@/components/ui/MobileCarousel";
import { BandTitle } from "@/components/landing/BandTitle";
import { DifferenceCard } from "@/components/landing/DifferenceCard";

export function DifferenceSection() {
  const title = `${differenceCopy.title} ${differenceCopy.titleMarker}`;

  return (
    <Band id="difference" tone="pearl" containerClassName="flex flex-col gap-6 sm:gap-10 lg:gap-14">
      <div className="grid grid-cols-1 items-end gap-3 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
        <BandTitle size="md">
          {differenceCopy.title} <Highlight>{differenceCopy.titleMarker}</Highlight>
        </BandTitle>
        <p className="text-[15px] leading-relaxed text-secondary sm:text-[17px]">{differenceCopy.description}</p>
      </div>
      <MobileCarousel label={title} until="lg" trackClassName="gap-3 lg:grid lg:grid-cols-5 lg:gap-4">
        {differenceCards.map((card) => (
          <li key={card.src} className="min-w-0 shrink-0 grow-0 basis-[80%] sm:basis-[42%] md:basis-[31%] lg:basis-auto">
            <DifferenceCard card={card} />
          </li>
        ))}
      </MobileCarousel>
    </Band>
  );
}

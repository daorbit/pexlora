import { stepsCopy } from "@/content/landing";
import { Band } from "@/components/ui/Band";
import { Highlight } from "@/components/ui/Highlight";
import { BandTitle } from "@/components/landing/BandTitle";
import { StepsTrack } from "@/components/landing/StepsTrack";

export function StepsSection() {
  return (
    <Band id="how-it-works" tone="pearl" containerClassName="flex flex-col gap-8 sm:gap-12 lg:gap-16">
      <div className="grid grid-cols-1 items-end gap-3 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)]">
        <BandTitle size="lg" className="max-w-[13em]">
          {stepsCopy.title} <Highlight>{stepsCopy.titleMarker}</Highlight> {stepsCopy.titleEnd}
        </BandTitle>
        <p className="text-[15px] leading-relaxed text-secondary sm:text-base lg:pb-2">{stepsCopy.lead}</p>
      </div>
      <StepsTrack />
    </Band>
  );
}

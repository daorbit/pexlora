import { differenceCopy } from "@/content/landing";
import { Band } from "@/components/ui/Band";
import { Highlight } from "@/components/ui/Highlight";
import { BandTitle } from "@/components/landing/BandTitle";
import { DifferenceStage } from "@/components/landing/DifferenceStage";

export function DifferenceSection() {
  return (
    <Band id="difference" tone="pearl">
      <div className="theme-dark ink-panel flex flex-col items-center gap-6 rounded-3xl px-4 py-8 text-foreground sm:gap-10 sm:rounded-[32px] sm:p-10 lg:px-14 lg:py-16">
        <BandTitle size="md" className="text-center">
          {differenceCopy.title} <Highlight>{differenceCopy.titleMarker}</Highlight>
        </BandTitle>
        <DifferenceStage />
      </div>
    </Band>
  );
}

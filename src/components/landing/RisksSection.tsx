import { risksCopy } from "@/content/landing";
import { Band } from "@/components/ui/Band";
import { BandText } from "@/components/landing/BandText";
import { BandTitle } from "@/components/landing/BandTitle";
import { MetadataTicker } from "@/components/landing/MetadataTicker";

export function RisksSection() {
  return (
    <Band
      id="why"
      tone="ink"
      containerClassName="grid grid-cols-1 items-center gap-6 sm:gap-12 lg:grid-cols-2 lg:gap-18"
    >
      <div className="flex flex-col gap-3 sm:gap-5.5">
        <BandTitle>{risksCopy.title}</BandTitle>
        <BandText className="max-w-115">{risksCopy.description}</BandText>
      </div>
      <MetadataTicker />
    </Band>
  );
}

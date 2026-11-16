import { risksCopy } from "@/content/landing";
import { Band } from "@/components/ui/Band";
import { BandTitle } from "@/components/landing/BandTitle";
import { MetadataTicker } from "@/components/landing/MetadataTicker";

export function RisksSection() {
  return (
    <Band
      id="why"
      tone="ink"
      containerClassName="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-18"
    >
      <div className="flex flex-col gap-5.5">
        <BandTitle>{risksCopy.title}</BandTitle>
        <p className="max-w-115 text-[17px] leading-[1.55] text-secondary lg:text-[19px]">{risksCopy.description}</p>
      </div>
      <MetadataTicker />
    </Band>
  );
}

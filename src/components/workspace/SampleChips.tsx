"use client";

import Image from "next/image";
import { sampleImages, type SampleImage } from "@/config/samples";
import { dropzoneCopy } from "@/content/workspace";
import { ResponsiveLabel } from "@/components/ui/ResponsiveLabel";

export function SampleChips({ onSelect }: { onSelect: (sample: SampleImage) => void }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
      <span className="text-[12px] text-secondary sm:text-[13px]">
        <ResponsiveLabel short={dropzoneCopy.samplesShort} full={dropzoneCopy.samples} />
      </span>
      {sampleImages.map((sample) => (
        <button
          key={sample.id}
          type="button"
          onClick={() => onSelect(sample)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-separator bg-surface py-1 pr-2.5 pl-1 text-[12.5px] font-semibold sm:gap-2 sm:rounded-xl sm:pr-3 sm:text-[13px] transition-colors hover:border-border-strong focus-visible:outline-2 focus-visible:outline-ring"
        >
          <Image src={sample.src} alt="" width={22} height={22} className="size-[22px] rounded-md object-cover" />
          {sample.label}
        </button>
      ))}
    </div>
  );
}

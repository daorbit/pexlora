"use client";

import Image from "next/image";
import { sampleImages, type SampleImage } from "@/config/samples";
import { dropzoneCopy } from "@/content/workspace";

export function SampleChips({ onSelect }: { onSelect: (sample: SampleImage) => void }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <span className="text-[13px] text-secondary">{dropzoneCopy.samples}</span>
      {sampleImages.map((sample) => (
        <button
          key={sample.id}
          type="button"
          onClick={() => onSelect(sample)}
          className="inline-flex items-center gap-2 rounded-xl border border-separator bg-surface py-1 pr-3 pl-1 text-[13px] font-semibold transition-colors hover:border-border-strong focus-visible:outline-2 focus-visible:outline-ring"
        >
          <Image src={sample.src} alt="" width={22} height={22} className="size-[22px] rounded-md object-cover" />
          {sample.label}
        </button>
      ))}
    </div>
  );
}

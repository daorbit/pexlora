"use client";

import Image from "next/image";
import { compareCopy } from "@/content/workspace";
import { formatBytes } from "@/lib/utils/format-bytes";
import { cn } from "@/lib/utils/cn";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { sliderBadgeClass } from "@/components/ui/before-after-styles";

type CompareSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeBytes: number;
  afterBytes: number;
};

export function CompareSlider({ beforeSrc, afterSrc, beforeBytes, afterBytes }: CompareSliderProps) {
  return (
    <BeforeAfterSlider
      label={compareCopy.label}
      className="h-[min(60vh,440px)] rounded-2xl bg-fill"
      before={<Image src={beforeSrc} alt="" fill unoptimized className="object-contain" />}
      after={<Image src={afterSrc} alt="" fill unoptimized className="object-contain" />}
    >
      <span className={cn(sliderBadgeClass, "left-3")}>
        {compareCopy.before} · {formatBytes(beforeBytes)}
      </span>
      <span className={cn(sliderBadgeClass, "right-3")}>
        {compareCopy.after} · {formatBytes(afterBytes)}
      </span>
    </BeforeAfterSlider>
  );
}

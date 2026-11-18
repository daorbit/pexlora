"use client";

import { useId } from "react";
import { optionsCopy } from "@/content/workspace";
import { useImagePreview } from "@/hooks/useImagePreview";
import type { ShapeOptions } from "@/lib/image/options";
import { shapeFrame, shapePath } from "@/lib/image/shape-path";

export function ShapePreview({ file, options }: { file?: File; options: ShapeOptions }) {
  const preview = useImagePreview(file);
  const clipId = `shape-${useId().replace(/[^\w-]/g, "")}`;
  if (!preview) return null;

  const frame = shapeFrame(options.shape, preview);

  return (
    <svg
      viewBox={`0 0 ${frame.width} ${frame.height}`}
      role="img"
      aria-label={optionsCopy.shapePreview}
      className="mx-auto max-h-80 w-full sm:max-h-[26rem]"
    >
      <defs>
        <clipPath id={clipId}>
          <path d={shapePath(options, frame)} className="transition-all duration-300" />
        </clipPath>
      </defs>
      {options.background === "white" && <rect width={frame.width} height={frame.height} className="fill-white" />}
      <image href={preview.url} x={-frame.x} y={-frame.y} width={preview.width} height={preview.height} clipPath={`url(#${clipId})`} />
    </svg>
  );
}

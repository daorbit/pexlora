"use client";

import { optionsCopy } from "@/content/workspace";
import { useImagePreview } from "@/hooks/useImagePreview";
import type { CropOptions } from "@/lib/image/options";
import { cropRect } from "@/lib/files/raster/crop";

type CropPreviewProps = { file?: File; options: CropOptions };

const THIRDS = [1 / 3, 2 / 3];

export function CropPreview({ file, options }: CropPreviewProps) {
  const preview = useImagePreview(file);
  if (!preview) return null;

  const { width, height, url } = preview;
  const rect = cropRect(options, preview);
  const line = Math.max(width, height) / 160;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={optionsCopy.cropPreview}
      className="max-h-80 w-full rounded-xl sm:max-h-[26rem]"
    >
      <image href={url} width={width} height={height} />
      <path
        d={`M0 0H${width}V${height}H0Z M${rect.x} ${rect.y}v${rect.height}h${rect.width}v${-rect.height}Z`}
        fillRule="evenodd"
        className="fill-black/55 transition-all duration-300"
      />
      <g className="stroke-white" fill="none">
        {THIRDS.map((share) => (
          <g key={share} strokeOpacity={0.45} strokeWidth={line / 2}>
            <line x1={rect.x + rect.width * share} y1={rect.y} x2={rect.x + rect.width * share} y2={rect.y + rect.height} />
            <line x1={rect.x} y1={rect.y + rect.height * share} x2={rect.x + rect.width} y2={rect.y + rect.height * share} />
          </g>
        ))}
        <rect x={rect.x} y={rect.y} width={rect.width} height={rect.height} strokeWidth={line} />
      </g>
    </svg>
  );
}

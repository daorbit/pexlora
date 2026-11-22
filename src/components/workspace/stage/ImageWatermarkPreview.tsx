"use client";

import { optionsCopy } from "@/content/workspace";
import { useImagePreview } from "@/hooks/useImagePreview";
import { imageWatermarkLayout, WATERMARK_FONT_FAMILY, WATERMARK_FONT_WEIGHT } from "@/lib/image/image-watermark";
import type { ImageWatermarkOptions } from "@/lib/image/options";

export function ImageWatermarkPreview({ file, options }: { file?: File; options: ImageWatermarkOptions }) {
  const preview = useImagePreview(file);
  if (!preview) return null;

  const { width, height, url } = preview;
  const text = options.text.trim();
  const layout = imageWatermarkLayout(width, height, options);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={optionsCopy.imageWatermarkPreview} className="mx-auto max-h-80 w-full sm:max-h-[26rem]">
      <image href={url} width={width} height={height} />
      {text && (
        <g
          opacity={layout.alpha}
          fill={layout.fill}
          stroke={layout.stroke}
          strokeWidth={layout.strokeWidth}
          strokeLinejoin="round"
          paintOrder="stroke"
          fontSize={layout.fontSize}
          fontWeight={WATERMARK_FONT_WEIGHT}
          fontFamily={WATERMARK_FONT_FAMILY}
          dominantBaseline="central"
        >
          {layout.marks.map((mark, index) => (
            <text key={index} transform={`translate(${mark.x} ${mark.y}) rotate(${mark.angle})`} textAnchor={mark.anchor}>
              {text}
            </text>
          ))}
        </g>
      )}
    </svg>
  );
}

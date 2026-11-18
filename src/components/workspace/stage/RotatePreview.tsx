"use client";

import { optionsCopy } from "@/content/workspace";
import { useImagePreview } from "@/hooks/useImagePreview";
import type { RotateImageOptions } from "@/lib/image/options";

export function RotatePreview({ file, options }: { file?: File; options: RotateImageOptions }) {
  const preview = useImagePreview(file);
  if (!preview) return null;

  const { url, width, height } = preview;
  const degrees = Number(options.angle);
  const sideways = degrees === 90 || degrees === 270;
  const outWidth = sideways ? height : width;
  const outHeight = sideways ? width : height;
  const scaleX = options.flip === "horizontal" ? -1 : 1;
  const scaleY = options.flip === "vertical" ? -1 : 1;
  const transform = `translate(${outWidth / 2} ${outHeight / 2}) rotate(${degrees}) scale(${scaleX} ${scaleY}) translate(${-width / 2} ${-height / 2})`;

  return (
    <svg
      viewBox={`0 0 ${outWidth} ${outHeight}`}
      role="img"
      aria-label={optionsCopy.rotatePreview}
      className="mx-auto max-h-80 w-full rounded-xl sm:max-h-[26rem]"
    >
      <image href={url} width={width} height={height} transform={transform} />
    </svg>
  );
}

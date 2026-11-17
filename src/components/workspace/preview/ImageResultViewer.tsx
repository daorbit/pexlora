"use client";

import Image from "next/image";
import { resultPreviewCopy } from "@/content/workspace";
import { useImagePreview } from "@/hooks/useImagePreview";
import { formatBytes } from "@/lib/utils/format-bytes";
import { PreviewFrame } from "@/components/workspace/preview/PreviewFrame";
import type { PreviewProps } from "@/components/workspace/preview/types";

export function ImageResultViewer({ blob, url, name }: PreviewProps) {
  const preview = useImagePreview(blob);
  const label = preview ? resultPreviewCopy.imageSize(preview.width, preview.height, formatBytes(blob.size)) : null;

  return (
    <PreviewFrame name={name} url={url} label={label}>
      <div className="relative h-[min(60vh,440px)] overflow-hidden rounded-2xl bg-fill">
        <Image src={url} alt={resultPreviewCopy.title(name)} fill unoptimized className="object-contain p-2" />
      </div>
    </PreviewFrame>
  );
}

"use client";

import Image from "next/image";
import { toolIconSrc } from "@/config/tools";
import { useImagePreview } from "@/hooks/useImagePreview";
import type { RecentResult } from "@/lib/storage/workspace-sessions";
import { HubItemIcon } from "@/components/tools/HubItemIcon";

const PREVIEWABLE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];

export function HistoryThumb({ result }: { result: RecentResult }) {
  const preview = useImagePreview(PREVIEWABLE_TYPES.includes(result.blob.type) ? result.blob : null);

  return (
    <span className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-fill sm:size-14">
      {preview ? (
        <>
          <Image src={preview.url} alt="" width={56} height={56} unoptimized className="size-full object-cover" />
          <HubItemIcon
            src={toolIconSrc(result.tool)}
            size="xs"
            className="absolute right-0.5 bottom-0.5 size-5 rounded-md shadow-thumb"
          />
        </>
      ) : (
        <HubItemIcon src={toolIconSrc(result.tool)} size="sm" />
      )}
    </span>
  );
}

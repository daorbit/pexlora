"use client";

import { useState } from "react";
import { resultPreviewCopy } from "@/content/workspace";
import { formatBytes } from "@/lib/utils/format-bytes";
import { OptionHint } from "@/components/workspace/options/OptionsBar";
import { PreviewFrame } from "@/components/workspace/preview/PreviewFrame";
import type { PreviewProps } from "@/components/workspace/preview/types";

export function MediaResultViewer({ blob, url, name, kind }: PreviewProps & { kind: "audio" | "video" }) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);

  return (
    <PreviewFrame name={name} url={url} label={formatBytes(blob.size)}>
      {failedUrl === url ? (
        <OptionHint>{resultPreviewCopy.cantPlay}</OptionHint>
      ) : kind === "video" ? (
        <video
          src={url}
          controls
          playsInline
          preload="metadata"
          onError={() => setFailedUrl(url)}
          className="max-h-[min(60vh,440px)] w-full rounded-2xl bg-black"
        />
      ) : (
        <audio src={url} controls preload="metadata" onError={() => setFailedUrl(url)} className="w-full" />
      )}
    </PreviewFrame>
  );
}

"use client";

import { previewTextCopy } from "@/content/converters";
import { useBlobData } from "@/hooks/useBlobData";
import { loadTextPreview } from "@/lib/files/preview-data";
import { Skeleton } from "@/components/ui/Skeleton";
import { OptionHint } from "@/components/workspace/options/OptionsBar";
import { PreviewFrame } from "@/components/workspace/preview/PreviewFrame";
import type { PreviewProps } from "@/components/workspace/preview/types";

export function TextResultViewer({ blob, url, name }: PreviewProps) {
  const { data, error } = useBlobData(blob, name, loadTextPreview);

  if (error) return <OptionHint tone="danger">{previewTextCopy.error}</OptionHint>;
  if (!data) return <Skeleton className="h-40 w-full rounded-2xl" />;

  const empty = data.total === 1 && !data.lines[0];

  return (
    <PreviewFrame name={name} url={url} label={empty ? undefined : previewTextCopy.lines(data.lines.length, data.total)}>
      {empty ? (
        <OptionHint>{previewTextCopy.emptyText}</OptionHint>
      ) : (
        <pre
          translate="no"
          className="notranslate max-h-[min(60vh,440px)] overflow-auto rounded-2xl bg-fill p-4 font-mono text-[12px] leading-relaxed whitespace-pre-wrap text-foreground"
        >
          {data.lines.join("\n")}
        </pre>
      )}
    </PreviewFrame>
  );
}

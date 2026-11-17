"use client";

import { useState } from "react";
import { resultPreviewCopy } from "@/content/workspace";
import { useZipEntries } from "@/hooks/useZipEntries";
import { Skeleton } from "@/components/ui/Skeleton";
import { OptionHint } from "@/components/workspace/options/OptionsBar";
import { ResultPreview } from "@/components/workspace/preview/ResultPreview";
import { ZipEntryList } from "@/components/workspace/preview/ZipEntryList";
import type { PreviewProps } from "@/components/workspace/preview/types";

export function ZipResultViewer({ blob }: PreviewProps) {
  const { entries, error } = useZipEntries(blob);
  const [selected, setSelected] = useState(0);

  if (error) return <OptionHint tone="danger">{resultPreviewCopy.zipError}</OptionHint>;
  if (!entries) return <Skeleton className="h-40 w-full rounded-2xl" />;
  if (!entries.length) return <OptionHint>{resultPreviewCopy.zipEmpty}</OptionHint>;

  const entry = entries[Math.min(selected, entries.length - 1)];

  return (
    <div className="flex flex-col gap-3">
      <ZipEntryList entries={entries} selected={entry.url} onSelect={setSelected} />
      <ResultPreview key={entry.url} blob={entry.blob} url={entry.url} name={entry.name} nested />
    </div>
  );
}

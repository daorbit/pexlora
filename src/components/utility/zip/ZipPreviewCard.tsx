"use client";

import dynamic from "next/dynamic";
import { X } from "lucide-react";
import { zipExtractCopy } from "@/content/utility-tools";
import { resultPreviewCopy } from "@/content/workspace";
import type { EntryPreview } from "@/hooks/useEntryPreview";
import { entryFileName } from "@/lib/files/zip/zip-entries";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { workspaceCard } from "@/components/workspace/layouts/styles";

const ResultPreview = dynamic(() =>
  import("@/components/workspace/preview/ResultPreview").then((module) => module.ResultPreview),
);

type ZipPreviewCardProps = {
  preview: EntryPreview | null;
  onClose: () => void;
  className?: string;
};

function PreviewMessage({ children }: { children: string }) {
  return <p className="m-auto max-w-xs px-4 py-10 text-center text-sm text-tertiary">{children}</p>;
}

export function ZipPreviewCard({ preview, onClose, className }: ZipPreviewCardProps) {
  const name = preview && entryFileName(preview.entry.name);

  return (
    <section className={cn("flex min-h-0 flex-1 flex-col overflow-y-auto p-3.5 sm:p-4", workspaceCard, className)}>
      {preview && name ? (
        <div key={preview.entry.name} className="flex flex-1 flex-col gap-2.5 motion-safe:animate-fade-in">
          <div className="flex items-center justify-between gap-2">
            <h3 translate="no" className="notranslate min-w-0 truncate px-1 text-[15px] font-semibold">
              {name}
            </h3>
            <Button variant="icon" size="sm" aria-label={zipExtractCopy.closePreview} onClick={onClose}>
              <X className="size-4" aria-hidden />
            </Button>
          </div>
          {preview.source ? (
            <ResultPreview {...preview.source} name={name} nested />
          ) : (
            <PreviewMessage>{resultPreviewCopy.noPreview}</PreviewMessage>
          )}
        </div>
      ) : (
        <PreviewMessage>{zipExtractCopy.previewEmpty}</PreviewMessage>
      )}
    </section>
  );
}

"use client";

import { PDF_PREVIEW_SIDE } from "@/config/limits";
import { resultPreviewCopy } from "@/content/workspace";
import { usePdfThumbnails } from "@/hooks/usePdfThumbnails";
import { Skeleton } from "@/components/ui/Skeleton";
import { OptionHint } from "@/components/workspace/options/OptionsBar";
import { PdfPreviewPage } from "@/components/workspace/preview/PdfPreviewPage";
import { PreviewFrame } from "@/components/workspace/preview/PreviewFrame";
import type { PreviewProps } from "@/components/workspace/preview/types";

export function PdfResultViewer({ blob, url, name }: PreviewProps) {
  const { count, urls, error } = usePdfThumbnails(blob, PDF_PREVIEW_SIDE);

  if (error) return <OptionHint tone="danger">{error}</OptionHint>;

  return (
    <PreviewFrame name={name} url={url} label={count ? resultPreviewCopy.pages(count) : null}>
      <div className="max-h-[36rem] overflow-y-auto rounded-2xl bg-fill p-3 sm:p-4">
        {count ? (
          <ol className="flex flex-col gap-4">
            {Array.from({ length: count }, (_, index) => (
              <PdfPreviewPage key={index} page={index + 1} src={urls[index]} />
            ))}
          </ol>
        ) : (
          <Skeleton className="mx-auto aspect-[3/4] w-full max-w-2xl rounded-xl" />
        )}
      </div>
    </PreviewFrame>
  );
}

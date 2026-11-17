"use client";

import { ExternalLink } from "lucide-react";
import { PDF_PREVIEW_SIDE } from "@/config/limits";
import { resultPreviewCopy } from "@/content/workspace";
import { usePdfThumbnails } from "@/hooks/usePdfThumbnails";
import { Skeleton } from "@/components/ui/Skeleton";
import { textLinkClass } from "@/components/ui/text-link-styles";
import { OptionHint } from "@/components/workspace/options/OptionsBar";
import { PdfPreviewPage } from "@/components/workspace/preview/PdfPreviewPage";

type PdfResultViewerProps = { blob: Blob; url: string; name: string };

export function PdfResultViewer({ blob, url, name }: PdfResultViewerProps) {
  const { count, urls, error } = usePdfThumbnails(blob, PDF_PREVIEW_SIDE);

  if (error) return <OptionHint tone="danger">{error}</OptionHint>;

  return (
    <section className="flex flex-col gap-2.5" aria-label={resultPreviewCopy.title(name)}>
      <div className="flex items-center justify-between gap-2 px-1">
        <span className="text-[13px] font-semibold text-secondary tabular-nums">
          {count ? resultPreviewCopy.pages(count) : null}
        </span>
        <a
          href={url}
          target="_blank"
          rel="noopener"
          className={textLinkClass}
        >
          {resultPreviewCopy.openFull}
          <ExternalLink className="size-3.5" aria-hidden />
        </a>
      </div>
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
    </section>
  );
}

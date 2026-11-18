"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { PDF_THUMBNAIL_SIDE } from "@/config/limits";
import { organizeCopy, pdfImageCopy } from "@/content/workspace";
import { usePdfThumbnails } from "@/hooks/usePdfThumbnails";
import { allPages, formatPageSpec, resolvePages } from "@/lib/files/pdf/page-spec";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { OptionHint } from "@/components/workspace/options/OptionsBar";

type PdfPageSelectorProps = {
  file: File;
  spec: string;
  disabled: boolean;
  onChange: (spec: string) => void;
};

export function PdfPageSelector({ file, spec, disabled, onChange }: PdfPageSelectorProps) {
  const { count, urls, error } = usePdfThumbnails(file);

  if (error) return <OptionHint tone="danger">{error}</OptionHint>;
  if (!count) return <Skeleton className="h-40 w-full rounded-2xl" />;

  const selected = new Set(resolvePages(spec, count));
  const commit = (pages: number[]) => onChange(formatPageSpec([...new Set(pages)].sort((a, b) => a - b), count));
  const toggle = (page: number) => {
    const next = new Set(selected);
    if (next.has(page)) next.delete(page);
    else next.add(page);
    if (next.size) commit([...next]);
  };
  const quick = [
    { label: pdfImageCopy.all, pages: allPages(count) },
    { label: pdfImageCopy.odd, pages: allPages(count).filter((page) => page % 2 === 1) },
    { label: pdfImageCopy.even, pages: allPages(count).filter((page) => page % 2 === 0) },
    { label: pdfImageCopy.first, pages: [1] },
  ].filter((option) => option.pages.length);

  return (
    <section className="flex flex-col gap-3" aria-label={pdfImageCopy.pickerTitle}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex min-w-0 flex-col">
          <span className="text-[15px] font-semibold">{pdfImageCopy.pickerTitle}</span>
          <span key={selected.size} className="text-xs text-tertiary tabular-nums motion-safe:animate-fade-in">
            {pdfImageCopy.selected(selected.size, count)}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label={pdfImageCopy.pickerTitle}>
          {quick.map((option) => (
            <Button key={option.label} variant="secondary" size="sm" disabled={disabled} onClick={() => commit(option.pages)}>
              {option.label}
            </Button>
          ))}
        </div>
      </div>
      <ol className="grid max-h-[34rem] grid-cols-3 gap-2.5 overflow-y-auto rounded-2xl bg-fill p-2.5 sm:grid-cols-4 xl:grid-cols-5">
        {allPages(count).map((page) => {
          const on = selected.has(page);
          return (
            <li key={page} className="flex min-w-0">
              <button
                type="button"
                aria-pressed={on}
                aria-label={pdfImageCopy.toggle(page, on)}
                disabled={disabled}
                onClick={() => toggle(page)}
                className={cn(
                  "group/page flex w-full flex-col items-center gap-1.5 rounded-xl p-1.5 transition-[background-color,box-shadow,scale] duration-200 focus-visible:outline-2 focus-visible:outline-ring motion-safe:active:scale-95",
                  on ? "bg-accent-soft ring-2 ring-foreground" : "bg-surface ring-1 ring-separator hover:ring-border-strong",
                )}
              >
                <span
                  className={cn(
                    "relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-lg border border-separator bg-white transition-opacity duration-200",
                    !on && "opacity-55",
                  )}
                >
                  {urls[page - 1] ? (
                    <Image
                      src={urls[page - 1]}
                      alt={organizeCopy.pageLabel(page)}
                      width={PDF_THUMBNAIL_SIDE}
                      height={PDF_THUMBNAIL_SIDE}
                      unoptimized
                      className="max-h-full w-auto max-w-full object-contain motion-safe:animate-fade-in"
                    />
                  ) : (
                    <Skeleton className="size-full rounded-none" />
                  )}
                  <span
                    className={cn(
                      "absolute top-1.5 right-1.5 flex size-6 items-center justify-center rounded-full transition-colors",
                      on ? "bg-primary text-primary-foreground" : "bg-surface text-transparent ring-1 ring-border-strong",
                    )}
                  >
                    <Check key={String(on)} className={cn("size-3.5", on && "motion-safe:animate-pop")} strokeWidth={3.2} aria-hidden />
                  </span>
                </span>
                <span className="font-mono text-xs text-secondary tabular-nums">{page}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

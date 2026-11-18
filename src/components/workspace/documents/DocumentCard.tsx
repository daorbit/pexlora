"use client";

import Image from "next/image";
import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { documentsCopy } from "@/content/workspace";
import type { QueueItem } from "@/hooks/useFileQueue";
import { usePdfCover } from "@/hooks/usePdfCover";
import { formatBytes } from "@/lib/utils/format-bytes";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { docColor } from "@/components/workspace/documents/doc-colors";

type DocumentCardProps = {
  item: QueueItem;
  index: number;
  last: boolean;
  disabled: boolean;
  onMove: (id: string, offset: number) => void;
  onRemove: (id: string) => void;
  onPages: (id: string, pages: number) => void;
};

const sheet = "absolute aspect-[3/4] w-[58%] rounded-md border border-separator bg-white";

export function DocumentCard({ item, index, last, disabled, onMove, onRemove, onPages }: DocumentCardProps) {
  const isPdf = item.format.kind === "pdf";
  const cover = usePdfCover(item.file, isPdf);
  const pages = isPdf ? cover.count : 1;
  const src = isPdf ? cover.url : item.previewUrl;
  const name = item.file.name;

  useEffect(() => {
    if (pages) onPages(item.id, pages);
  }, [item.id, pages, onPages]);

  return (
    <li className="group/doc flex min-w-0 flex-col gap-2.5 rounded-2xl border border-separator bg-subtle p-2.5 transition-[border-color,translate] duration-300 hover:border-border-strong motion-safe:animate-fade-up motion-safe:[animation-duration:0.4s] sm:p-3">
      <div className="flex items-center justify-between gap-1">
        <span
          key={index}
          className={cn("flex size-7 items-center justify-center rounded-full text-[13px] font-bold tabular-nums motion-safe:animate-pop", docColor(index).chip)}
        >
          {index + 1}
        </span>
        <span className="flex items-center">
          <Button variant="icon" size="sm" aria-label={documentsCopy.moveEarlier(name)} disabled={disabled || index === 0} onClick={() => onMove(item.id, -1)}>
            <ChevronLeft className="size-4" aria-hidden />
          </Button>
          <Button variant="icon" size="sm" aria-label={documentsCopy.moveLater(name)} disabled={disabled || last} onClick={() => onMove(item.id, 1)}>
            <ChevronRight className="size-4" aria-hidden />
          </Button>
          <Button variant="icon" size="sm" aria-label={documentsCopy.remove(name)} disabled={disabled} onClick={() => onRemove(item.id)}>
            <X className="size-4" aria-hidden />
          </Button>
        </span>
      </div>

      <div className="relative flex aspect-[5/4] items-center justify-center">
        {isPdf && pages > 1 && (
          <>
            <span aria-hidden className={cn(sheet, "-translate-x-3 -rotate-6 transition-transform duration-300 group-hover/doc:-translate-x-5 group-hover/doc:-rotate-9")} />
            <span aria-hidden className={cn(sheet, "translate-x-3 rotate-5 transition-transform duration-300 group-hover/doc:translate-x-5 group-hover/doc:rotate-8")} />
          </>
        )}
        <span
          className={cn(
            "relative flex aspect-[3/4] w-[62%] items-center justify-center overflow-hidden rounded-md border border-border-strong bg-white shadow-card transition-transform duration-300 group-hover/doc:-translate-y-1",
            !isPdf && "aspect-auto h-full w-full rounded-xl",
          )}
        >
          {src ? (
            <Image src={src} alt="" fill unoptimized sizes="200px" className={cn(isPdf ? "object-contain" : "object-cover", "motion-safe:animate-fade-in")} />
          ) : cover.failed ? (
            <item.format.icon className="size-8 text-tertiary" strokeWidth={1.5} aria-hidden />
          ) : (
            <Skeleton className="size-full rounded-none" />
          )}
        </span>
      </div>

      <div className="flex min-w-0 flex-col gap-0.5">
        <p translate="no" className="notranslate truncate text-sm font-semibold">
          {name}
        </p>
        <p className="font-mono text-xs text-secondary tabular-nums">
          {isPdf && pages ? `${documentsCopy.pages(pages)} · ` : ""}
          {formatBytes(item.file.size)}
        </p>
        {item.status === "error" && <p className="text-xs text-danger">{item.error}</p>}
      </div>
    </li>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Check, ExternalLink, X } from "lucide-react";
import { galleryCopy } from "@/content/workspace";
import type { QueueItem } from "@/hooks/useFileQueue";
import { formatBytes, sizeChangePercent } from "@/lib/utils/format-bytes";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/workspace/ProgressBar";
import { SaveFileButton } from "@/components/workspace/SaveFileButton";

type GalleryCardProps = {
  item: QueueItem;
  target: string;
  disabled: boolean;
  onRemove: (id: string) => void;
};

function Preview({ item }: { item: QueueItem }) {
  const sources = [item.result?.url, item.previewUrl].filter((src): src is string => Boolean(src));
  const [failed, setFailed] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const src = sources[failed];
  const Icon = item.format.icon;

  if (!src) {
    return (
      <span className="flex size-full items-center justify-center bg-fill text-secondary">
        <Icon className="size-8" strokeWidth={1.5} aria-hidden />
      </span>
    );
  }

  return (
    <>
      {!loaded && <span className="absolute inset-0 bg-fill-strong motion-safe:animate-pulse" aria-hidden />}
      <Image
        key={src}
        src={src}
        alt=""
        fill
        unoptimized
        sizes="(min-width: 1024px) 280px, 50vw"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed((count) => count + 1)}
        className={cn(
          "object-cover transition-[opacity,scale] duration-500 group-hover/card:scale-[1.03]",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />
    </>
  );
}

function CardStatus({ item }: { item: QueueItem }) {
  if (item.status === "error") return <p className="text-[13px] text-danger">{item.error}</p>;
  if (item.status === "processing") return <p className="text-[13px] text-secondary">{galleryCopy.working}</p>;
  if (item.status !== "done" || !item.result) return <p className="text-[13px] text-tertiary">{galleryCopy.ready}</p>;

  const change = sizeChangePercent(item.file.size, item.result.blob.size);
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 motion-safe:animate-fade-up motion-safe:[animation-duration:0.4s]">
      <Badge tone={change <= 0 ? "success" : "neutral"} className="tabular-nums">
        {galleryCopy.change(change)}
      </Badge>
      <div className="flex items-center gap-1">
        <a
          href={item.result.url}
          target="_blank"
          rel="noopener"
          className="inline-flex h-8 items-center gap-1 rounded-lg px-2 text-[13px] font-semibold text-secondary transition-colors hover:bg-fill hover:text-foreground"
        >
          <ExternalLink className="size-3.5" aria-hidden />
          {galleryCopy.view}
        </a>
        <SaveFileButton file={item.result} />
      </div>
    </div>
  );
}

export function GalleryCard({ item, target, disabled, onRemove }: GalleryCardProps) {
  const done = item.status === "done";
  const output = item.result ? formatBytes(item.result.blob.size) : null;

  return (
    <li
      className={cn(
        "group/card flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-subtle transition-[border-color,box-shadow] duration-300 motion-safe:animate-fade-up motion-safe:[animation-duration:0.4s]",
        done ? "border-primary ring-1 ring-primary" : "border-separator",
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-fill">
        <Preview item={item} />
        <span
          translate="no"
          className="notranslate absolute top-2.5 left-2.5 inline-flex items-center gap-1 rounded-md bg-ink/80 px-1.5 py-1 font-mono text-[11px] text-ink-foreground backdrop-blur-sm"
        >
          {item.format.label}
          <ArrowRight className="size-3" strokeWidth={2.6} aria-label="to" />
          {target}
        </span>
        <button
          type="button"
          aria-label={galleryCopy.remove(item.file.name)}
          onClick={() => onRemove(item.id)}
          disabled={disabled}
          className="absolute top-2 right-2 flex size-8 items-center justify-center rounded-full bg-surface/90 text-foreground shadow-thumb transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-ring disabled:opacity-0"
        >
          <X className="size-4" aria-hidden />
        </button>
        {done && (
          <span className="absolute right-2.5 bottom-2.5 flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-thumb motion-safe:animate-pop">
            <Check className="size-4" strokeWidth={3} aria-hidden />
          </span>
        )}
        {item.status === "processing" && <ProgressBar />}
      </div>
      <div className="flex flex-col gap-2 p-3 sm:p-3.5">
        <p translate="no" className="notranslate truncate text-sm font-semibold">
          {item.file.name}
        </p>
        <p className="flex items-center gap-1.5 font-mono text-xs text-secondary tabular-nums">
          {formatBytes(item.file.size)}
          {output && (
            <>
              <ArrowRight className="size-3 shrink-0" aria-label="to" />
              <span className="font-medium text-foreground">{output}</span>
            </>
          )}
        </p>
        <CardStatus item={item} />
      </div>
    </li>
  );
}

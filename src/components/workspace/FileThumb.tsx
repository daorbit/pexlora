"use client";

import Image from "next/image";
import { useState } from "react";
import { Check } from "lucide-react";
import type { QueueItem } from "@/hooks/useFileQueue";
import { cn } from "@/lib/utils/cn";

const frame = "relative size-16 shrink-0 overflow-hidden rounded-xl sm:size-22";

function FormatIcon({ item }: { item: QueueItem }) {
  const Icon = item.format.icon;
  return (
    <span className="flex size-full items-center justify-center bg-fill text-secondary">
      <Icon className="size-6 sm:size-7" strokeWidth={1.75} aria-hidden />
    </span>
  );
}

export function FileThumb({ item }: { item: QueueItem }) {
  const [state, setState] = useState<"loading" | "ready" | "failed">("loading");
  const showImage = Boolean(item.previewUrl) && state !== "failed";

  return (
    <span className={frame}>
      {showImage ? (
        <>
          {state === "loading" && <span className="absolute inset-0 bg-fill-strong motion-safe:animate-pulse" aria-hidden />}
          <Image
            src={item.previewUrl!}
            alt=""
            width={88}
            height={88}
            unoptimized
            onLoad={() => setState("ready")}
            onError={() => setState("failed")}
            className={cn("size-full object-cover transition-opacity duration-300", state === "ready" ? "opacity-100" : "opacity-0")}
          />
        </>
      ) : (
        <FormatIcon item={item} />
      )}
      {item.status === "done" && (
        <span className="absolute right-1 bottom-1 inline-flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-thumb motion-safe:animate-pop">
          <Check className="size-3" strokeWidth={3.2} aria-hidden />
        </span>
      )}
    </span>
  );
}

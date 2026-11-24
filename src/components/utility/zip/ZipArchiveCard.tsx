"use client";

import Image from "next/image";
import { utilityToolIconSrc } from "@/config/utility-tools";
import { zipCopy, zipExtractCopy } from "@/content/utility-tools";
import type { Archive } from "@/hooks/useUnzip";
import { cn } from "@/lib/utils/cn";
import { formatBytes } from "@/lib/utils/format-bytes";
import { Button } from "@/components/ui/Button";
import { workspaceCard } from "@/components/workspace/layouts/styles";

export function ZipArchiveCard({ archive, onOpenAnother }: { archive: Archive; onOpenAnother: () => void }) {
  return (
    <div className={cn("flex items-center gap-3 p-3.5 motion-safe:animate-fade-up sm:p-4", workspaceCard)}>
      <Image src={utilityToolIconSrc("unzip-files")} alt="" width={44} height={44} unoptimized className="size-11 shrink-0 motion-safe:animate-pop" />
      <div className="flex min-w-0 flex-1 flex-col">
        <span translate="no" className="notranslate truncate text-[15px] font-semibold">
          {archive.name}
        </span>
        <span className="text-[13px] text-secondary tabular-nums">
          {zipCopy.files(archive.entries.length, formatBytes(archive.size))}
        </span>
      </div>
      <Button variant="secondary" size="sm" onClick={onOpenAnother} className="shrink-0">
        {zipExtractCopy.another}
      </Button>
    </div>
  );
}

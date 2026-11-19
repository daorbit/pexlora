"use client";

import { urlImportCopy } from "@/content/import-sources";
import { cn } from "@/lib/utils/cn";
import { DriveImportButton } from "@/components/drive/DriveImportButton";
import { DropboxImportButton } from "@/components/import/DropboxImportButton";
import type { ImportSourceSize } from "@/components/import/ImportSourceButton";
import { UrlImportButton } from "@/components/import/UrlImportButton";

type ImportSourcesProps = {
  onFiles: (files: File[]) => void;
  accept: string;
  multiple?: boolean;
  disabled?: boolean;
  size?: ImportSourceSize;
  className?: string;
};

const gaps: Record<ImportSourceSize, string> = { labelled: "gap-2", md: "gap-2", sm: "gap-1" };

export function ImportSources({ onFiles, accept, multiple = true, disabled, size = "md", className }: ImportSourcesProps) {
  const shared = { onFiles, disabled, size };
  const labelled = size === "labelled";

  return (
    <div className={cn("flex items-center", labelled && "flex-wrap justify-center", gaps[size], className)}>
      {labelled && <span className="pr-1 text-[13px] text-secondary">{urlImportCopy.importFrom}</span>}
      <DriveImportButton {...shared} accept={accept} multiple={multiple} />
      <DropboxImportButton {...shared} accept={accept} multiple={multiple} />
      <UrlImportButton {...shared} />
    </div>
  );
}

import type { ReactNode } from "react";
import { File } from "lucide-react";
import { formatBytes } from "@/lib/utils/format-bytes";

export function ZipFileRow({ name, size, action }: { name: string; size: number; action: ReactNode }) {
  return (
    <li className="flex items-center gap-3 px-3 py-2.5 sm:px-4">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-fill text-secondary">
        <File className="size-4" aria-hidden />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span translate="no" className="notranslate truncate text-[14px] font-medium">
          {name}
        </span>
        <span className="text-xs text-tertiary tabular-nums">{formatBytes(size)}</span>
      </span>
      {action}
    </li>
  );
}

export function ZipFileList({ header, children }: { header: ReactNode; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-separator bg-surface">
      <div className="flex min-h-12 flex-wrap items-center justify-between gap-2 border-b border-separator px-3 py-2 sm:px-4">{header}</div>
      <ul className="max-h-96 divide-y divide-separator overflow-y-auto">{children}</ul>
    </div>
  );
}

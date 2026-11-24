import type { ReactNode } from "react";
import { File } from "lucide-react";
import { formatOfName } from "@/lib/files/zip/zip-entries";
import { cn } from "@/lib/utils/cn";
import { formatBytes } from "@/lib/utils/format-bytes";
import { rowDelay } from "@/components/utility/zip/row-delays";

type ZipFileRowProps = {
  name: string;
  size: number;
  folder?: string;
  order?: number;
  active?: boolean;
  selectLabel?: string;
  onSelect?: () => void;
  action: ReactNode;
};

function FileLabel({ name, size, folder, active }: Pick<ZipFileRowProps, "name" | "size" | "folder" | "active">) {
  const Icon = formatOfName(name)?.icon ?? File;

  return (
    <>
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors",
          active ? "bg-primary text-primary-foreground" : "bg-fill text-secondary",
        )}
      >
        <Icon className="size-4" aria-hidden />
      </span>
      <span className="flex min-w-0 flex-1 flex-col text-left">
        <span translate="no" className="notranslate truncate text-[14px] font-medium">
          {name}
        </span>
        <span className="flex min-w-0 gap-1.5 text-xs text-tertiary tabular-nums">
          <span className="shrink-0">{formatBytes(size)}</span>
          {folder && (
            <span translate="no" className="notranslate truncate">
              {folder}
            </span>
          )}
        </span>
      </span>
    </>
  );
}

export function ZipFileRow({ action, order, selectLabel, onSelect, ...label }: ZipFileRowProps) {
  const content = "flex min-w-0 flex-1 items-center gap-3 rounded-xl";

  return (
    <li
      className={cn(
        "flex items-center gap-3 rounded-2xl px-2.5 py-2 transition-colors",
        label.active ? "bg-accent-soft" : onSelect && "hover:bg-fill",
        order !== undefined && ["motion-safe:animate-row-in", rowDelay(order)],
      )}
    >
      {onSelect ? (
        <button
          type="button"
          onClick={onSelect}
          aria-label={selectLabel}
          aria-pressed={label.active}
          className={cn(content, "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring")}
        >
          <FileLabel {...label} />
        </button>
      ) : (
        <span className={content}>
          <FileLabel {...label} />
        </span>
      )}
      {action}
    </li>
  );
}

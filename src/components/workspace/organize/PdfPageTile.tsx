import Image from "next/image";
import { ChevronLeft, ChevronRight, Undo2, X } from "lucide-react";
import { organizeCopy } from "@/content/workspace";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { PDF_THUMBNAIL_SIDE } from "@/config/limits";

type PdfPageTileProps = {
  page: number;
  src?: string;
  disabled: boolean;
  removed?: boolean;
  onToggle: () => void;
  onEarlier?: () => void;
  onLater?: () => void;
};

const discButton =
  "absolute top-1 right-1 flex size-7 items-center justify-center rounded-full bg-foreground text-background shadow-card transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-ring disabled:opacity-50";

export function PdfPageTile({ page, src, disabled, removed, onToggle, onEarlier, onLater }: PdfPageTileProps) {
  const ToggleIcon = removed ? Undo2 : X;

  return (
    <li className="flex min-w-0 flex-col gap-1">
      <div
        className={cn(
          "relative flex aspect-[3/4] items-center justify-center overflow-hidden rounded-xl border border-separator bg-white p-1 transition-opacity",
          removed && "opacity-45 grayscale",
        )}
      >
        {src ? (
          <Image
            src={src}
            alt={organizeCopy.pageLabel(page)}
            width={PDF_THUMBNAIL_SIDE}
            height={PDF_THUMBNAIL_SIDE}
            unoptimized
            className="max-h-full w-auto max-w-full object-contain"
          />
        ) : (
          <Skeleton className="size-full" />
        )}
        <button
          type="button"
          aria-label={removed ? organizeCopy.restore(page) : organizeCopy.remove(page)}
          disabled={disabled}
          onClick={onToggle}
          className={discButton}
        >
          <ToggleIcon className="size-4" aria-hidden />
        </button>
      </div>
      <div className="flex h-8 items-center justify-between">
        {onEarlier ? (
          <Button variant="icon" size="sm" aria-label={organizeCopy.moveEarlier(page)} disabled={disabled} onClick={onEarlier}>
            <ChevronLeft className="size-4" aria-hidden />
          </Button>
        ) : (
          <span className="size-8" aria-hidden />
        )}
        <span className="text-xs font-semibold text-secondary tabular-nums">{page}</span>
        {onLater ? (
          <Button variant="icon" size="sm" aria-label={organizeCopy.moveLater(page)} disabled={disabled} onClick={onLater}>
            <ChevronRight className="size-4" aria-hidden />
          </Button>
        ) : (
          <span className="size-8" aria-hidden />
        )}
      </div>
    </li>
  );
}

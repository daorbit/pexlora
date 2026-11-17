import Image from "next/image";
import { PDF_PREVIEW_SIDE } from "@/config/limits";
import { resultPreviewCopy } from "@/content/workspace";
import { Skeleton } from "@/components/ui/Skeleton";

export function PdfPreviewPage({ page, src }: { page: number; src?: string }) {
  return (
    <li className="flex flex-col items-center gap-1.5">
      <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-separator bg-white shadow-card">
        {src ? (
          <Image
            src={src}
            alt={resultPreviewCopy.page(page)}
            width={PDF_PREVIEW_SIDE}
            height={PDF_PREVIEW_SIDE}
            unoptimized
            className="h-auto w-full"
          />
        ) : (
          <Skeleton className="aspect-[3/4] w-full" />
        )}
      </div>
      <span className="text-xs font-semibold text-secondary tabular-nums">{resultPreviewCopy.page(page)}</span>
    </li>
  );
}

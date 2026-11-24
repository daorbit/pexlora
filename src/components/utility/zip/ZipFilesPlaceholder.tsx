import { FolderOpen } from "lucide-react";
import { zipExtractCopy } from "@/content/utility-tools";
import { cn } from "@/lib/utils/cn";
import { Skeleton } from "@/components/ui/Skeleton";

const rows = ["w-3/5", "w-2/5", "w-1/2", "w-2/3", "w-2/5", "w-3/5"];

export function ZipFilesPlaceholder({ loading }: { loading: boolean }) {
  if (loading) {
    return (
      <div aria-hidden className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
        <Skeleton className="h-10 w-full rounded-xl" />
        {rows.map((width, index) => (
          <span key={index} className="flex items-center gap-3">
            <Skeleton className="size-9 shrink-0 rounded-xl" />
            <span className="flex flex-1 flex-col gap-2">
              <Skeleton className={cn("h-3", width)} />
              <Skeleton className="h-2.5 w-1/5" />
            </span>
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="m-auto flex max-w-xs flex-col items-center gap-2 px-6 py-10 text-center">
      <span className="mb-1 flex size-16 items-center justify-center rounded-full bg-fill text-secondary">
        <FolderOpen className="size-7 stroke-[1.5]" aria-hidden />
      </span>
      <p className="text-[17px] font-semibold tracking-[-0.02em]">{zipExtractCopy.emptyTitle}</p>
      <p className="text-sm text-secondary">{zipExtractCopy.emptyBody}</p>
    </div>
  );
}

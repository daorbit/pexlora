import type { ReactNode } from "react";
import { Lock } from "lucide-react";
import { dropzoneCopy } from "@/content/workspace";
import { cn } from "@/lib/utils/cn";

type WorkspaceFrameProps = {
  tabs?: ReactNode;
  className?: string;
  children: ReactNode;
};

export function WorkspaceFrame({ tabs, className, children }: WorkspaceFrameProps) {
  return (
    <div className={cn("w-full rounded-3xl border border-separator bg-surface p-2 sm:rounded-[28px] sm:p-2.5", className)}>
      {tabs && (
        <div className="flex flex-wrap items-center justify-between gap-3 px-1 pt-1 pb-2.5">
          {tabs}
          <p className="hidden items-center gap-2 pr-2 text-[13px] font-semibold text-secondary md:inline-flex">
            <Lock className="size-3.5" aria-hidden />
            {dropzoneCopy.onDeviceShort}
          </p>
        </div>
      )}
      {children}
    </div>
  );
}

import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type WindowFrameProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function WindowFrame({ title, children, className }: WindowFrameProps) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-separator bg-surface", className)}>
      <div className="relative flex h-10 items-center border-b border-separator bg-subtle px-4">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-fill-strong" />
          <span className="size-2.5 rounded-full bg-fill-strong" />
          <span className="size-2.5 rounded-full bg-fill-strong" />
        </div>
        <p className="absolute inset-x-0 text-center font-mono text-xs text-secondary">{title}</p>
      </div>
      {children}
    </div>
  );
}

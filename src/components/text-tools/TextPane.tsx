import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type TextPaneProps = {
  title: string;
  meta?: ReactNode;
  footer?: ReactNode;
  className?: string;
  children: ReactNode;
};

export function TextPane({ title, meta, footer, className, children }: TextPaneProps) {
  return (
    <section
      className={cn(
        "flex min-h-[420px] flex-col overflow-hidden rounded-[20px] border border-separator bg-surface transition-colors focus-within:border-border-strong",
        className,
      )}
    >
      <header className="flex min-h-12 items-center justify-between gap-3 border-b border-separator px-4 py-2">
        <h2 className="text-sm font-semibold">{title}</h2>
        <div className="flex items-center gap-1 text-[13px] text-secondary">{meta}</div>
      </header>
      <div className="relative flex flex-1 flex-col">{children}</div>
      {footer && <footer className="border-t border-separator px-4 py-3">{footer}</footer>}
    </section>
  );
}

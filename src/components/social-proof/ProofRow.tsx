import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type ProofRowProps = {
  label: string;
  className?: string;
  children: ReactNode;
};

export function ProofRow({ label, className, children }: ProofRowProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[13px] text-secondary sm:gap-x-4 sm:text-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ProofDivider() {
  return <span aria-hidden className="h-5 w-px bg-separator" />;
}

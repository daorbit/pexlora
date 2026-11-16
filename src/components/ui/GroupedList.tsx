import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

export const groupedRowClasses = "flex min-h-14 items-center gap-4 px-5 py-3.5";

export function GroupedList({ className, ...props }: ComponentProps<"ul">) {
  return (
    <ul
      className={cn(
        "divide-y divide-separator overflow-hidden rounded-xl border border-separator bg-surface",
        className,
      )}
      {...props}
    />
  );
}

export function GroupedRow({ className, ...props }: ComponentProps<"li">) {
  return <li className={cn(groupedRowClasses, className)} {...props} />;
}

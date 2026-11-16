import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

export function Eyebrow({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn("inline-flex items-center gap-2 text-xs font-semibold tracking-[0.12em] text-secondary uppercase", className)}
      {...props}
    />
  );
}

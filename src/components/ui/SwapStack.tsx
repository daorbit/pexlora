import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type SwapStackProps = {
  first: ReactNode;
  second: ReactNode;
  className?: string;
};

export function SwapStack({ first, second, className }: SwapStackProps) {
  return (
    <span className={cn("inline-grid overflow-y-clip", className)}>
      <span className="[grid-area:1/1] justify-self-start motion-safe:animate-swap-out">{first}</span>
      <span className="[grid-area:1/1] justify-self-start opacity-0 motion-safe:animate-swap-in" aria-hidden>
        {second}
      </span>
    </span>
  );
}

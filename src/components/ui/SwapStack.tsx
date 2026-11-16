import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type SwapStackProps = {
  first: ReactNode;
  second: ReactNode;
  align?: "start" | "center";
  className?: string;
};

export function SwapStack({ first, second, align = "start", className }: SwapStackProps) {
  const item = cn("[grid-area:1/1]", align === "center" ? "justify-self-center" : "justify-self-start");

  return (
    <span className={cn("inline-grid overflow-y-clip", align === "center" && "place-items-center", className)}>
      <span className={cn(item, "motion-safe:animate-swap-out")}>{first}</span>
      <span className={cn(item, "opacity-0 motion-safe:animate-swap-in")} aria-hidden>
        {second}
      </span>
    </span>
  );
}

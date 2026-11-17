import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

type Size = "wide" | "stage" | "narrow";

const sizes: Record<Size, string> = {
  wide: "max-w-[1640px]",
  stage: "max-w-[1480px]",
  narrow: "max-w-4xl",
};

export function Container({
  size = "wide",
  className,
  ...props
}: ComponentProps<"div"> & { size?: Size }) {
  return (
    <div className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizes[size], className)} {...props} />
  );
}

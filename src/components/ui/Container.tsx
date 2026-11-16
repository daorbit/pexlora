import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

type Size = "wide" | "stage" | "narrow";

const sizes: Record<Size, string> = {
  wide: "max-w-[1440px]",
  stage: "max-w-[1320px]",
  narrow: "max-w-4xl",
};

export function Container({
  size = "wide",
  className,
  ...props
}: ComponentProps<"div"> & { size?: Size }) {
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-8 lg:px-10", sizes[size], className)} {...props} />
  );
}

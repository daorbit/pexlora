import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

export function BandText({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("text-[15px] leading-[1.55] text-secondary sm:text-[17px] lg:text-[19px]", className)} {...props} />;
}

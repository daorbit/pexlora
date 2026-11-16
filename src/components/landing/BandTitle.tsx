import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

type Size = "md" | "lg" | "giant";

const sizes: Record<Size, string> = {
  md: "text-[28px] leading-[1.05] tracking-[-0.04em] sm:text-[38px] lg:text-[56px] lg:leading-none lg:tracking-[-0.045em]",
  lg: "text-[30px] leading-[1.02] tracking-[-0.04em] sm:text-[44px] lg:text-[72px] lg:leading-[0.98] lg:tracking-[-0.05em]",
  giant: "text-[44px] leading-[0.95] font-extrabold tracking-[-0.06em] text-wrap sm:text-[72px] md:text-[96px] lg:text-[150px] lg:leading-[0.9] lg:tracking-[-0.065em]",
};

export function BandTitle({ size = "lg", className, ...props }: ComponentProps<"h2"> & { size?: Size }) {
  return <h2 className={cn("font-bold", sizes[size], className)} {...props} />;
}

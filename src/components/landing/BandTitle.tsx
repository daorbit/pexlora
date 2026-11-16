import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

type Size = "md" | "lg" | "giant";

const sizes: Record<Size, string> = {
  md: "text-[38px] leading-none tracking-[-0.045em] lg:text-[56px]",
  lg: "text-[40px] leading-[0.98] tracking-[-0.05em] lg:text-[72px]",
  giant: "text-[56px] leading-[0.9] font-extrabold tracking-[-0.065em] text-wrap md:text-[96px] lg:text-[150px]",
};

export function BandTitle({ size = "lg", className, ...props }: ComponentProps<"h2"> & { size?: Size }) {
  return <h2 className={cn("font-bold", sizes[size], className)} {...props} />;
}

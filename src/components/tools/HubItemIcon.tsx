import Image from "next/image";
import { cn } from "@/lib/utils/cn";

type Size = "sm" | "md" | "lg" | "xl";

const pixels: Record<Size, number> = { sm: 36, md: 44, lg: 52, xl: 64 };

const sizeClasses: Record<Size, string> = {
  sm: "size-9",
  md: "size-11",
  lg: "size-13",
  xl: "size-16",
};

type HubItemIconProps = {
  src: string;
  size?: Size;
  className?: string;
};

export function HubItemIcon({ src, size = "md", className }: HubItemIconProps) {
  return (
    <Image
      src={src}
      alt=""
      width={pixels[size]}
      height={pixels[size]}
      unoptimized
      className={cn(
        "shrink-0 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105",
        sizeClasses[size],
        className,
      )}
    />
  );
}

import Image from "next/image";
import { cn } from "@/lib/utils/cn";

type Size = "xs" | "sm" | "md";

const pixels: Record<Size, number> = { xs: 24, sm: 32, md: 40 };

const sizeClasses: Record<Size, string> = {
  xs: "size-6",
  sm: "size-7 sm:size-8",
  md: "size-10",
};

type PersonAvatarProps = {
  src: string;
  size?: Size;
  className?: string;
};

export function PersonAvatar({ src, size = "sm", className }: PersonAvatarProps) {
  return (
    <Image
      src={src}
      alt=""
      width={pixels[size]}
      height={pixels[size]}
      unoptimized
      className={cn("shrink-0 rounded-full", sizeClasses[size], className)}
    />
  );
}

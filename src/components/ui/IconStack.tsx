import Image from "next/image";
import { cn } from "@/lib/utils/cn";

const delays = [
  "[--wave-delay:0s]",
  "[--wave-delay:0.14s]",
  "[--wave-delay:0.28s]",
  "[--wave-delay:0.42s]",
  "[--wave-delay:0.56s]",
];

export function IconStack({ srcs, className }: { srcs: string[]; className?: string }) {
  return (
    <span aria-hidden className={cn("flex shrink-0 items-center gap-1 sm:gap-1.5", className)}>
      {srcs.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt=""
          width={32}
          height={32}
          unoptimized
          loading="eager"
          className={cn("size-6 motion-safe:animate-wave-y sm:size-8", delays[index % delays.length], index > 2 && "max-sm:hidden")}
        />
      ))}
    </span>
  );
}

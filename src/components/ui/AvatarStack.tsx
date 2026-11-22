import Image from "next/image";
import { cn } from "@/lib/utils/cn";

type AvatarStackProps = {
  srcs: string[];
  className?: string;
};

export function AvatarStack({ srcs, className }: AvatarStackProps) {
  return (
    <span aria-hidden className={cn("flex items-center", className)}>
      {srcs.map((src) => (
        <Image
          key={src}
          src={src}
          alt=""
          width={32}
          height={32}
          unoptimized
          className="-ml-2 size-7 rounded-full ring-2 ring-background first:ml-0 sm:size-8"
        />
      ))}
    </span>
  );
}

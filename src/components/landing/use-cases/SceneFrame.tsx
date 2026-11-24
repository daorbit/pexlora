import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";

const photoSizes = "(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 85vw";

export const sceneChip =
  "inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[12.5px] font-semibold whitespace-nowrap shadow-thumb";

export function SceneFrame({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div aria-hidden className={cn("relative h-44 w-full overflow-hidden rounded-2xl bg-fill sm:h-48", className)}>
      {children}
    </div>
  );
}

export function ScenePhoto({ src, className }: { src: string; className?: string }) {
  return (
    <Image
      src={src}
      alt=""
      fill
      sizes={photoSizes}
      className={cn("object-cover transition-transform duration-700 group-hover:scale-105", className)}
    />
  );
}

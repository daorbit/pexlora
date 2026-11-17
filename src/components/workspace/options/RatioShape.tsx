import type { CropRatio } from "@/lib/image/options";
import { cn } from "@/lib/utils/cn";

const shapeSizes: Record<CropRatio, string> = {
  "1x1": "size-6",
  "4x5": "h-7 w-[22px]",
  "9x16": "h-7 w-4",
  "16x9": "h-4 w-7",
  "3x2": "h-[18px] w-7",
  "4x3": "h-[21px] w-7",
};

export function RatioShape({ ratio }: { ratio: CropRatio }) {
  return <span aria-hidden className={cn("block rounded-[5px] border-2 border-current", shapeSizes[ratio])} />;
}

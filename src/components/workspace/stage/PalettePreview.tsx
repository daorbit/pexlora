"use client";

import { optionsCopy } from "@/content/workspace";
import { useImagePreview } from "@/hooks/useImagePreview";
import { usePalette } from "@/hooks/usePalette";
import { toast } from "@/lib/toast/store";
import { isDark, type PaletteColor } from "@/lib/image/palette";
import { cn } from "@/lib/utils/cn";
import { CopyButton } from "@/components/ui/CopyButton";
import { Skeleton } from "@/components/ui/Skeleton";

function Swatch({ color }: { color: PaletteColor }) {
  const copy = async () => {
    await navigator.clipboard.writeText(color.hex);
    toast.success(optionsCopy.paletteCopied(color.hex));
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={optionsCopy.paletteCopyLabel(color.hex)}
      className="group relative flex h-20 flex-col justify-end overflow-hidden rounded-xl ring-1 ring-separator focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:h-28"
    >
      <svg aria-hidden className="absolute inset-0 size-full" preserveAspectRatio="none" viewBox="0 0 1 1">
        <rect width="1" height="1" fill={color.hex} />
      </svg>
      <span
        translate="no"
        className={cn(
          "notranslate relative px-2 pb-2 text-left font-mono text-[11px] font-medium sm:text-xs",
          isDark(color.rgb) ? "text-white" : "text-black/85",
        )}
      >
        {color.hex}
      </span>
    </button>
  );
}

export function PalettePreview({ file, count }: { file?: File; count: number }) {
  const preview = useImagePreview(file);
  const colors = usePalette(preview?.url, count);

  if (!colors) return <Skeleton className="h-40 w-full rounded-xl" />;
  if (!colors.length) return <p className="text-sm text-secondary">{optionsCopy.paletteEmpty}</p>;

  return (
    <div className="flex flex-col gap-3">
      <ul className="grid grid-cols-4 gap-2 sm:grid-cols-6">
        {colors.map((color, index) => (
          <li key={`${color.hex}-${index}`}>
            <Swatch color={color} />
          </li>
        ))}
      </ul>
      <div className="flex justify-end">
        <CopyButton value={colors.map((color) => color.hex).join(", ")} label={optionsCopy.paletteCopyAll} />
      </div>
    </div>
  );
}

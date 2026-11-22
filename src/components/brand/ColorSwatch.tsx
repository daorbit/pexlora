import type { BrandColor } from "@/content/brand-kit";
import { brandKitCopy } from "@/content/brand-kit";
import { CopyButton } from "@/components/ui/CopyButton";

export function ColorSwatch({ color }: { color: BrandColor }) {
  return (
    <li className="flex flex-col overflow-hidden rounded-3xl border border-separator bg-surface">
      <svg aria-hidden viewBox="0 0 160 80" preserveAspectRatio="none" className="h-20 w-full border-b border-separator sm:h-24">
        <rect width="160" height="80" fill={color.hex} />
      </svg>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold">{color.name}</h3>
            <p translate="no" className="notranslate font-mono text-[13px] text-secondary uppercase">
              {color.hex}
            </p>
          </div>
          <CopyButton value={color.hex} label={brandKitCopy.copyHex} />
        </div>
        <p className="text-[13px] leading-snug text-secondary">{color.usage}</p>
      </div>
    </li>
  );
}

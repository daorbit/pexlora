import Image from "next/image";
import { Download } from "lucide-react";
import { brandKitCopy, type BrandAsset } from "@/content/brand-kit";
import { cn } from "@/lib/utils/cn";
import { buttonClasses } from "@/components/ui/Button";

export function BrandAssetCard({ asset }: { asset: BrandAsset }) {
  return (
    <li className="flex flex-col overflow-hidden rounded-3xl border border-separator bg-surface">
      <div
        className={cn(
          "flex aspect-[4/3] items-center justify-center",
          asset.surface === "dark" ? "theme-dark bg-background" : "bg-subtle",
        )}
      >
        <Image src={asset.src} alt={asset.label} width={112} height={112} unoptimized className="size-24 object-contain sm:size-28" />
      </div>
      <div className="flex items-center justify-between gap-3 p-4">
        <div className="flex min-w-0 flex-col">
          <h3 className="truncate text-sm font-semibold">{asset.label}</h3>
          <p className="text-[12.5px] text-secondary">{asset.note}</p>
        </div>
        <a
          href={asset.src}
          download={asset.fileName}
          aria-label={brandKitCopy.downloadLabel(asset.label)}
          className={buttonClasses({ variant: "secondary", size: "sm", className: "shrink-0" })}
        >
          <Download className="size-3.5" aria-hidden />
          {brandKitCopy.download}
        </a>
      </div>
    </li>
  );
}

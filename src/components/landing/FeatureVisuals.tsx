import Image from "next/image";
import { ArrowRight, MapPin, X } from "lucide-react";
import { sampleImages } from "@/config/samples";
import { aiTags, locationRows } from "@/content/landing";
import { FORMAT_LABELS, OUTPUT_FORMATS } from "@/lib/image/formats";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/Badge";

const visualFrame = "w-full max-w-lg";

export function AiTagsVisual() {
  return (
    <div className={visualFrame}>
      <div className="flex flex-wrap gap-2.5">
        {aiTags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-2 rounded-full border border-separator bg-surface py-2 pr-3 pl-4 text-[14px]"
          >
            <span className="text-secondary line-through decoration-warning decoration-2">{tag}</span>
            <span className="inline-flex size-5 items-center justify-center rounded-full bg-warning-soft text-warning">
              <X className="size-3" strokeWidth={3} aria-hidden />
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function FormatsVisual() {
  const photo = sampleImages[1];

  return (
    <div className={visualFrame}>
      <div className="flex flex-col gap-5 rounded-xl border border-separator bg-surface p-5">
        <div className="flex items-center gap-3">
          <Image src={photo.src} alt="" width={48} height={48} className="size-12 rounded-[10px] object-cover" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-medium">{photo.fileName}</p>
            <p className="text-[13px] text-secondary">JPEG</p>
          </div>
          <ArrowRight className="size-4 text-secondary" aria-hidden />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {OUTPUT_FORMATS.map((format) => {
            const active = format === "webp";
            return (
              <span
                key={format}
                className={cn(
                  "flex h-10 items-center justify-center rounded-lg text-[14px] font-medium",
                  active ? "bg-primary text-primary-foreground" : "border border-separator bg-fill text-foreground",
                )}
              >
                {FORMAT_LABELS[format]}
              </span>
            );
          })}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[13px] text-secondary">Quality</span>
          <span className="relative h-1 flex-1 rounded-full bg-fill">
            <span className="absolute inset-y-0 left-0 w-[85%] rounded-full bg-primary" />
          </span>
          <span className="text-[13px] tabular-nums text-secondary">90%</span>
        </div>
      </div>
    </div>
  );
}

export function LocationVisual() {
  return (
    <div className={visualFrame}>
      <div className="overflow-hidden rounded-xl border border-separator bg-surface">
        <div className="flex items-center gap-2 border-b border-separator px-5 py-3">
          <MapPin className="size-4 text-danger" aria-hidden />
          <p className="text-[13px] font-semibold">Found in phone-photo.jpg</p>
          <Badge tone="danger" className="ml-auto">
            Location exposed
          </Badge>
        </div>
        <dl className="divide-y divide-separator">
          {locationRows.map((row) => (
            <div key={row.key} className="flex items-center justify-between gap-4 px-5 py-3">
              <dt className="text-[14px] text-secondary">{row.key}</dt>
              <dd className="font-mono text-[13px]">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

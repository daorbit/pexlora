import { Check, ExternalLink, MapPin } from "lucide-react";
import { locationCopy } from "@/content/workspace";
import type { GeoLocation } from "@/lib/metadata/types";
import { cn } from "@/lib/utils/cn";
import { formatCoordinates, mapLink } from "@/lib/utils/map-link";

export function LocationCard({ location, removed }: { location: GeoLocation; removed: boolean }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl px-3 py-2.5",
        removed ? "bg-success-soft text-success" : "bg-danger-soft text-danger",
      )}
    >
      <span
        className={cn(
          "inline-flex size-8 shrink-0 items-center justify-center rounded-full text-surface",
          removed ? "bg-success" : "bg-danger",
        )}
      >
        {removed ? <Check className="size-4" strokeWidth={3} aria-hidden /> : <MapPin className="size-4" aria-hidden />}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-sm font-semibold">{removed ? locationCopy.removed : locationCopy.found}</span>
        <span className="font-mono text-xs tabular-nums opacity-80">{formatCoordinates(location)}</span>
      </span>
      <a
        href={mapLink(location)}
        target="_blank"
        rel="noopener noreferrer"
        title={locationCopy.mapNote}
        className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[13px] font-semibold underline-offset-4 hover:underline"
      >
        {locationCopy.viewOnMap}
        <ExternalLink className="size-3.5" aria-hidden />
      </a>
    </div>
  );
}

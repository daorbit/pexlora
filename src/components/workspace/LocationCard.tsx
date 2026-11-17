"use client";

import { Check, Copy, ExternalLink, MapPin } from "lucide-react";
import { locationCopy } from "@/content/workspace";
import type { GeoLocation } from "@/lib/metadata/types";
import { toast } from "@/lib/toast/store";
import { cn } from "@/lib/utils/cn";
import { decimalCoordinates, formatCoordinates, formatDms, mapLink } from "@/lib/utils/map-link";

const action =
  "inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[13px] font-semibold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-ring";

async function copyCoordinates(location: GeoLocation) {
  try {
    await navigator.clipboard.writeText(decimalCoordinates(location));
    toast.success(locationCopy.copied);
  } catch {
    toast.error(locationCopy.copyFailed);
  }
}

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
        <span translate="no" className="notranslate font-mono text-xs tabular-nums opacity-80">
          {formatCoordinates(location)}
        </span>
        <span translate="no" className="notranslate font-mono text-[11px] tabular-nums opacity-65">
          {formatDms(location)}
        </span>
      </span>
      <span className="flex items-center gap-1">
        <button type="button" onClick={() => copyCoordinates(location)} className={action}>
          <Copy className="size-3.5" aria-hidden />
          {locationCopy.copy}
        </button>
        <a href={mapLink(location)} target="_blank" rel="noopener noreferrer" title={locationCopy.mapNote} className={action}>
          {locationCopy.viewOnMap}
          <ExternalLink className="size-3.5" aria-hidden />
        </a>
      </span>
    </div>
  );
}

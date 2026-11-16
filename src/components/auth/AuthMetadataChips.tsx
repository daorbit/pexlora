import { MapPin, X } from "lucide-react";
import { authMedia } from "@/content/auth";
import { cn } from "@/lib/utils/cn";

const chipBase =
  "inline-flex items-center gap-2.5 rounded-xl border py-2 pr-2 font-medium text-white shadow-[0_12px_30px_-12px_rgb(0_0_0/0.5)] backdrop-blur-xl backdrop-saturate-150";
const chipNeutral = "border-white/12 bg-black/45 pl-3.5 text-[13.5px]";
const chipDanger = "border-danger/45 bg-danger/30 pl-2 font-mono text-[12.5px]";

function RemoveMark() {
  return (
    <span className="inline-flex size-5.5 items-center justify-center rounded-full bg-white/12 text-white/70">
      <X className="size-3" strokeWidth={2.5} />
    </span>
  );
}

export function AuthMetadataChips() {
  const total = authMedia.chips.length + 1;

  return (
    <div className="flex flex-col items-end gap-2" aria-hidden>
      <span className={cn(chipBase, chipDanger)}>
        <span className="inline-flex size-5.5 items-center justify-center rounded-full bg-danger">
          <MapPin className="size-3 text-white" strokeWidth={2.5} />
        </span>
        {authMedia.location}
        <RemoveMark />
      </span>
      {authMedia.chips.map((chip) => (
        <span key={chip} className={cn(chipBase, chipNeutral)}>
          {chip}
          <RemoveMark />
        </span>
      ))}
      <span className="inline-flex items-center rounded-xl bg-primary px-4.5 py-2.5 text-[13.5px] font-semibold text-brand-surface">
        Remove all {total}
      </span>
    </div>
  );
}

import { ImageIcon, MapPin, X } from "lucide-react";
import { authMedia } from "@/content/auth";
import { cn } from "@/lib/utils/cn";
import { staggerDelay } from "@/lib/utils/stagger";

export function AuthMetadataCard() {
  const count = authMedia.tags.length;

  return (
    <div
      aria-hidden
      className="w-full max-w-[380px] rounded-2xl border border-white/12 bg-black/45 p-2 text-white shadow-[0_24px_60px_-24px_rgb(0_0_0/0.7)] backdrop-blur-xl backdrop-saturate-150"
    >
      <div className="flex items-center gap-3 px-2.5 pt-1.5 pb-3">
        <span className="inline-flex size-9 items-center justify-center rounded-lg bg-white/10">
          <ImageIcon className="size-4 text-white/80" />
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate font-mono text-[13px]">{authMedia.fileName}</span>
          <span className="text-[12px] text-white/60">{authMedia.found(count)}</span>
        </span>
      </div>

      <ul className="flex flex-col gap-1">
        {authMedia.tags.map((tag, index) => (
          <li
            key={tag.label}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 motion-safe:animate-fade-up",
              staggerDelay(index + 2),
              tag.risky ? "bg-danger/30 ring-1 ring-danger/45" : "bg-white/6",
            )}
          >
            {tag.risky && <MapPin className="size-3.5 shrink-0 text-white" strokeWidth={2.5} />}
            <span className="w-16 shrink-0 text-[12px] text-white/60">{tag.label}</span>
            <span className={cn("min-w-0 flex-1 truncate text-[13px] font-medium", tag.risky && "font-mono")}>
              {tag.value}
            </span>
            <X className="size-3.5 shrink-0 text-white/50" strokeWidth={2.5} />
          </li>
        ))}
      </ul>

      <span className="mt-2 flex h-10 items-center justify-center rounded-xl bg-primary text-[13.5px] font-semibold text-brand-surface">
        {authMedia.removeAll(count)}
      </span>
    </div>
  );
}

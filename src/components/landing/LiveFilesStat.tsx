import { statsCopy } from "@/content/social-proof";
import { getLiveFilesToday } from "@/lib/stats/live-files";
import { formatCount } from "@/lib/utils/format-count";

export async function LiveFilesStat() {
  const files = await getLiveFilesToday();
  if (files === null) return null;

  return (
    <p className="inline-flex items-center gap-2.5 rounded-xl bg-fill px-3 py-2 text-[13px] text-secondary sm:text-sm">
      <span aria-hidden className="relative flex size-2">
        <span className="absolute inset-0 rounded-full bg-primary opacity-75 motion-safe:animate-ping" />
        <span className="relative size-2 rounded-full bg-primary" />
      </span>
      <span className="font-mono text-[11px] font-semibold tracking-widest text-accent-text uppercase">
        {statsCopy.liveBadge}
      </span>
      <span>
        <span className="font-semibold text-foreground">{formatCount(files)}</span> {statsCopy.liveLabel}
      </span>
    </p>
  );
}

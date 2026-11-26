import { Suspense } from "react";
import { allToolsHref } from "@/config/tool-hub";
import { statsCopy } from "@/content/social-proof";
import { toolsByPath } from "@/lib/file-handling/tool-paths";
import { getFilesTotal, getRatingSummary } from "@/lib/stats/social-proof";
import { Band } from "@/components/ui/Band";
import { ButtonLink } from "@/components/ui/Button";
import { LiveFilesStat } from "@/components/landing/LiveFilesStat";
import { StatsSentence } from "@/components/landing/StatsSentence";

const deviceTools = toolsByPath().device.length;

export async function StatsSection() {
  const [files, rating] = await Promise.all([getFilesTotal(), getRatingSummary()]);
  const phrases = statsCopy.sentence({ deviceTools, files, rating: rating?.average ?? null });

  return (
    <Band id="numbers" tone="ink" containerClassName="flex flex-col gap-8 sm:gap-14 lg:gap-20">
      <div className="flex items-center gap-4">
        <h2 className="font-mono text-[13px] text-tertiary">{statsCopy.eyebrow}</h2>
        <span aria-hidden className="h-px flex-1 bg-border-strong" />
      </div>
      <StatsSentence phrases={phrases} />
      <div className="flex flex-col items-start gap-4 border-t border-border-strong pt-5 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
        <Suspense fallback={null}>
          <LiveFilesStat />
        </Suspense>
        <ButtonLink href={allToolsHref()} variant="plain" arrow className="sm:ml-auto">
          {statsCopy.browse}
        </ButtonLink>
      </div>
    </Band>
  );
}

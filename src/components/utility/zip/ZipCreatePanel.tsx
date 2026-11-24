"use client";

import { zipCreateCopy } from "@/content/utility-tools";
import type { ZipBuilder } from "@/hooks/useZipBuilder";
import { cn } from "@/lib/utils/cn";
import { formatBytes } from "@/lib/utils/format-bytes";
import { Alert } from "@/components/ui/Alert";
import { OptionGroup } from "@/components/workspace/options/OptionsBar";
import { optionFieldInput, optionFieldShell } from "@/components/workspace/options/styles";
import { PanelChecklist } from "@/components/workspace/PanelChecklist";
import { SettingsPanel } from "@/components/workspace/SettingsPanel";
import { ZipActions } from "@/components/utility/zip/ZipActions";
import { ZipWorkingCard } from "@/components/utility/zip/ZipWorkingCard";

function ZipTotals({ builder }: { builder: ZipBuilder }) {
  const { files, result, totalBytes } = builder;

  return (
    <div key={result ? "done" : "ready"} className="flex flex-col gap-1 motion-safe:animate-fade-up">
      <span className="text-xs font-semibold tracking-[0.08em] text-tertiary uppercase">{zipCreateCopy.resultLabel}</span>
      <p className="text-2xl font-bold tracking-[-0.02em] tabular-nums">{zipCreateCopy.count(files.length)}</p>
      <p className={cn("font-mono text-xs tabular-nums", result ? "text-success" : "text-secondary")}>
        {result ? zipCreateCopy.after(formatBytes(result.size)) : zipCreateCopy.before(formatBytes(totalBytes))}
      </p>
    </div>
  );
}

export function ZipCreatePanel({ builder }: { builder: ZipBuilder }) {
  const { files, name, setName, fileName, working, zippedCount, tooLarge } = builder;
  const hasFiles = files.length > 0;

  return (
    <SettingsPanel>
      {working ? (
        <ZipWorkingCard direction="in" title={zipCreateCopy.working} detail={fileName} done={zippedCount} total={files.length} />
      ) : hasFiles ? (
        <ZipTotals builder={builder} />
      ) : (
        <PanelChecklist title={zipCreateCopy.help.title} items={zipCreateCopy.help.items} />
      )}
      <OptionGroup as="label" label={zipCreateCopy.nameLabel}>
        <span className={cn(optionFieldShell, "flex items-center gap-1 px-3.5")}>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={zipCreateCopy.namePlaceholder}
            disabled={working}
            className={cn(optionFieldInput, "min-w-0 flex-1")}
          />
          <span className="text-sm text-tertiary">{zipCreateCopy.extension}</span>
        </span>
      </OptionGroup>
      {tooLarge && <Alert message={zipCreateCopy.tooLarge} />}
      <ZipActions builder={builder} className={cn(hasFiles && "max-lg:hidden")} />
    </SettingsPanel>
  );
}

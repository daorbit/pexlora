"use client";

import { useMemo, useState } from "react";
import { UTILITY_TEXT_MAX_CHARACTERS } from "@/config/limits";
import { linkCleanerCopy } from "@/content/utility-tools";
import { cleanLinks } from "@/lib/utility/link-cleaner";
import { Badge } from "@/components/ui/Badge";
import { TextInput } from "@/components/text-tools/TextInput";
import { UtilityOutputPane } from "@/components/utility/UtilityOutputPane";

export function LinkCleanerWorkspace() {
  const [text, setText] = useState("");
  const result = useMemo(() => cleanLinks(text), [text]);
  const removed = [...new Set(result.links.flatMap((link) => [...link.removed, ...(link.unwrapped ? [linkCleanerCopy.unwrapped] : [])]))];
  const hasLinks = result.links.length > 0;

  return (
    <div className="grid grid-cols-1 gap-3 text-left lg:grid-cols-2">
      <TextInput
        value={text}
        onChange={setText}
        label={linkCleanerCopy.input}
        sampleText={linkCleanerCopy.sample}
        maxLength={UTILITY_TEXT_MAX_CHARACTERS}
      />
      <UtilityOutputPane
        title={linkCleanerCopy.output}
        text={hasLinks ? result.text : ""}
        shareTitle={linkCleanerCopy.shareTitle}
        emptyMessage={text ? linkCleanerCopy.noLinks : linkCleanerCopy.empty}
        summary={hasLinks && <span>{linkCleanerCopy.summary(result.removedCount, result.links.length)}</span>}
        details={
          removed.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 border-t border-separator pt-3">
              <span className="text-xs font-semibold text-tertiary">{linkCleanerCopy.removedLabel}</span>
              {removed.map((name) => (
                <Badge key={name} tone="success" translate="no" className="notranslate font-mono">
                  {name}
                </Badge>
              ))}
            </div>
          )
        }
      />
    </div>
  );
}

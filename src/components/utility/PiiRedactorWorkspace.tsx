"use client";

import { useMemo, useState } from "react";
import { UTILITY_TEXT_MAX_CHARACTERS } from "@/config/limits";
import { piiCopy } from "@/content/utility-tools";
import { MASK_STYLES, PII_KINDS, redactText, type MaskStyle, type PiiKind } from "@/lib/utility/pii-redact";
import { Segmented } from "@/components/ui/Segmented";
import { ToggleChips } from "@/components/ui/ToggleChips";
import { TextInput } from "@/components/text-tools/TextInput";
import { UtilityOutputPane } from "@/components/utility/UtilityOutputPane";

const kindOptions = PII_KINDS.map((kind) => ({ value: kind, label: piiCopy.kinds[kind] }));
const styleOptions = MASK_STYLES.map((style) => ({ value: style, label: piiCopy.styles[style].label }));

export function PiiRedactorWorkspace() {
  const [text, setText] = useState("");
  const [kinds, setKinds] = useState<PiiKind[]>([...PII_KINDS]);
  const [style, setStyle] = useState<MaskStyle>("partial");
  const result = useMemo(() => redactText(text, { kinds, style, labels: piiCopy.labels }), [text, kinds, style]);

  return (
    <div className="flex flex-col gap-3 text-left">
      <div className="flex flex-col gap-3 rounded-2xl border border-separator bg-surface p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
        <ToggleChips label={piiCopy.hide} value={kinds} options={kindOptions} onChange={setKinds} />
        <Segmented label={piiCopy.styleLabel} value={style} options={styleOptions} onChange={setStyle} size="sm" className="shrink-0 self-start" />
      </div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <TextInput value={text} onChange={setText} label={piiCopy.input} sampleText={piiCopy.sample} maxLength={UTILITY_TEXT_MAX_CHARACTERS} />
        <UtilityOutputPane
          title={piiCopy.output}
          text={text ? result.text : ""}
          shareTitle={piiCopy.shareTitle}
          emptyMessage={piiCopy.empty}
          summary={text && <span>{result.total ? piiCopy.found(result.total) : piiCopy.nothingFound}</span>}
          details={<p className="border-t border-separator pt-3 text-xs text-tertiary">{piiCopy.note}</p>}
        />
      </div>
    </div>
  );
}

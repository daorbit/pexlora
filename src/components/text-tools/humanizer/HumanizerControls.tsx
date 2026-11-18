"use client";

import { humanizerCopy } from "@/content/ai";
import { HUMANIZE_STRENGTHS, HUMANIZE_TONES, type HumanizeStrength, type HumanizeTone } from "@/lib/ai/types";
import { Segmented } from "@/components/ui/Segmented";

const toneOptions = HUMANIZE_TONES.map((value) => ({ value, label: humanizerCopy.tones[value] }));
const strengthOptions = HUMANIZE_STRENGTHS.map((value) => ({ value, label: humanizerCopy.strengths[value] }));

type HumanizerControlsProps = {
  tone: HumanizeTone;
  strength: HumanizeStrength;
  onTone: (tone: HumanizeTone) => void;
  onStrength: (strength: HumanizeStrength) => void;
  disabled: boolean;
};

export function HumanizerControls({ tone, strength, onTone, onStrength, disabled }: HumanizerControlsProps) {
  return (
    <div className="flex flex-col gap-2.5 lg:flex-row lg:flex-wrap lg:items-center">
      <Segmented<HumanizeTone>
        label={humanizerCopy.tone}
        layout="chips"
        value={tone}
        options={toneOptions}
        onChange={onTone}
        disabled={disabled}
        className="max-sm:justify-start"
      />
      <Segmented<HumanizeStrength>
        label={humanizerCopy.strength}
        layout="chips"
        value={strength}
        options={strengthOptions}
        onChange={onStrength}
        disabled={disabled}
        className="max-sm:justify-start"
      />
    </div>
  );
}

"use client";

import { textToolCopy } from "@/content/ai";
import { countWords } from "@/lib/ai/text-stats";
import { Button } from "@/components/ui/Button";

type TextInputProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  label: string;
};

export function TextInput({ value, onChange, disabled, label }: TextInputProps) {
  const words = countWords(value);

  return (
    <div className="flex flex-col overflow-hidden rounded-[20px] border border-separator bg-subtle transition-colors focus-within:border-foreground">
      <textarea
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={textToolCopy.placeholder}
        maxLength={textToolCopy.maxCharacters}
        disabled={disabled}
        rows={10}
        className="min-h-60 w-full resize-y bg-transparent px-5 py-4 text-[15.5px] leading-relaxed outline-none placeholder:text-tertiary disabled:opacity-60"
      />
      <div className="flex flex-wrap items-center gap-2 border-t border-separator px-4 py-2.5">
        <span className="text-[13px] text-secondary tabular-nums">
          {textToolCopy.words(words)} · {value.length}/{textToolCopy.maxCharacters}
        </span>
        <span className="ml-auto flex gap-1">
          {!value && (
            <Button type="button" variant="plain" className="text-[13px]" onClick={() => onChange(textToolCopy.sampleText)}>
              {textToolCopy.sample}
            </Button>
          )}
          {value && (
            <Button type="button" variant="plain" className="text-[13px]" onClick={() => onChange("")} disabled={disabled}>
              {textToolCopy.clear}
            </Button>
          )}
        </span>
      </div>
    </div>
  );
}

"use client";

import { useState, type KeyboardEvent } from "react";
import { ClipboardPaste, X } from "lucide-react";
import { textToolCopy } from "@/content/ai";
import { countWords } from "@/lib/ai/text-stats";
import { readClipboardText } from "@/lib/utils/text-actions";
import { Button } from "@/components/ui/Button";
import { TextPane } from "@/components/text-tools/TextPane";

type TextInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  disabled?: boolean;
  label?: string;
  sampleText?: string;
  maxLength?: number;
};

export function TextInput({
  value,
  onChange,
  onSubmit,
  disabled,
  label = textToolCopy.inputLabel,
  sampleText = textToolCopy.sampleText,
  maxLength = textToolCopy.maxCharacters,
}: TextInputProps) {
  const [pasteFailed, setPasteFailed] = useState(false);

  const paste = async () => {
    const text = await readClipboardText();
    setPasteFailed(!text);
    if (text) onChange(text.slice(0, maxLength));
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (onSubmit && event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      onSubmit();
    }
  };

  return (
    <TextPane
      title={label}
      meta={
        value && (
          <>
            <span className="tabular-nums">{textToolCopy.words(countWords(value))}</span>
            <Button variant="icon" size="sm" aria-label={textToolCopy.clear} onClick={() => onChange("")} disabled={disabled}>
              <X className="size-4" aria-hidden />
            </Button>
          </>
        )
      }
    >
      <textarea
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={onKeyDown}
        placeholder={value ? undefined : " "}
        maxLength={maxLength}
        disabled={disabled}
        className="min-h-[340px] w-full flex-1 resize-none bg-transparent px-5 py-4 text-[15.5px] leading-relaxed outline-none disabled:opacity-60"
      />
      {!value && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
          <Button size="lg" onClick={paste} className="pointer-events-auto">
            <ClipboardPaste className="size-4" aria-hidden />
            {textToolCopy.paste}
          </Button>
          <button
            type="button"
            onClick={() => onChange(sampleText)}
            className="pointer-events-auto text-sm font-semibold text-secondary underline-offset-4 hover:text-foreground hover:underline"
          >
            {textToolCopy.sample}
          </button>
          <p className="text-[13px] text-tertiary">{pasteFailed ? textToolCopy.pasteFailed : textToolCopy.orType}</p>
        </div>
      )}
    </TextPane>
  );
}

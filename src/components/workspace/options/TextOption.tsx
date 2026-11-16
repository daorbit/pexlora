"use client";

import { MAX_METADATA_TEXT_LENGTH } from "@/config/limits";
import { cn } from "@/lib/utils/cn";
import { OptionGroup } from "@/components/workspace/options/OptionsBar";
import { optionFieldInput, optionFieldShell } from "@/components/workspace/options/styles";

type TextOptionProps = {
  label: string;
  value: string;
  placeholder: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

export function TextOption({ label, value, placeholder, disabled, onChange }: TextOptionProps) {
  return (
    <OptionGroup as="label" label={label} className="min-w-0" labelClassName="w-20 shrink-0">
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        maxLength={MAX_METADATA_TEXT_LENGTH}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className={cn(optionFieldShell, optionFieldInput, "w-full min-w-0 px-3.5")}
      />
    </OptionGroup>
  );
}

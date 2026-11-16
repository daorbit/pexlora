"use client";

import { optionsCopy } from "@/content/workspace";
import { METADATA_FIELDS, type MetadataFields } from "@/lib/image/options";
import { OptionHint, OptionsBar } from "@/components/workspace/options/OptionsBar";
import { TextOption } from "@/components/workspace/options/TextOption";
import type { OptionsBarProps } from "@/components/workspace/options/types";

export function MetadataOptionsBar({ options, onChange, disabled }: OptionsBarProps<MetadataFields>) {
  return (
    <OptionsBar footer={<OptionHint>{optionsCopy.metadataNote}</OptionHint>}>
      <div className="grid w-full gap-x-6 gap-y-2.5 md:grid-cols-2">
        {METADATA_FIELDS.map((field) => (
          <TextOption
            key={field}
            label={optionsCopy.metadataFields[field].label}
            placeholder={optionsCopy.metadataFields[field].placeholder}
            value={options[field]}
            disabled={disabled}
            onChange={(value) => onChange({ ...options, [field]: value })}
          />
        ))}
      </div>
    </OptionsBar>
  );
}

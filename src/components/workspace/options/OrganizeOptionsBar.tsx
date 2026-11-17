"use client";

import { optionsCopy } from "@/content/workspace";
import { getOrganizeError, type OrganizeOptions } from "@/lib/image/options";
import { OptionHint, OptionsBar } from "@/components/workspace/options/OptionsBar";
import { TextOption } from "@/components/workspace/options/TextOption";
import type { OptionsBarProps } from "@/components/workspace/options/types";

export function OrganizeOptionsBar({ options, onChange, disabled }: OptionsBarProps<OrganizeOptions>) {
  const error = getOrganizeError(options);

  return (
    <OptionsBar
      footer={error ? <OptionHint tone="danger">{error}</OptionHint> : <OptionHint>{optionsCopy.organizeHint}</OptionHint>}
    >
      <TextOption
        label={optionsCopy.organizePages}
        value={options.pages}
        placeholder={optionsCopy.organizePlaceholder}
        disabled={disabled}
        onChange={(pages) => onChange({ pages })}
      />
    </OptionsBar>
  );
}

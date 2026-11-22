"use client";

import { optionsCopy } from "@/content/workspace";
import { COMPRESSION_LEVELS, type PdfCompressOptions } from "@/lib/image/options";
import { OptionGroup, OptionHint, OptionsBar } from "@/components/workspace/options/OptionsBar";
import { OptionTiles } from "@/components/workspace/options/OptionTiles";
import type { OptionsBarProps } from "@/components/workspace/options/types";

const levelOptions = COMPRESSION_LEVELS.map((level) => ({ value: level, ...optionsCopy.pdfLevels[level] }));

export function PdfCompressOptionsBar({ options, onChange, disabled }: OptionsBarProps<PdfCompressOptions>) {
  return (
    <OptionsBar footer={<OptionHint>{optionsCopy.pdfCompressHint}</OptionHint>}>
      <OptionGroup label={optionsCopy.level}>
        <OptionTiles
          label={optionsCopy.levelLabel}
          value={options.level}
          options={levelOptions}
          onChange={(level) => onChange({ level })}
          disabled={disabled}
          columns={1}
        />
      </OptionGroup>
    </OptionsBar>
  );
}

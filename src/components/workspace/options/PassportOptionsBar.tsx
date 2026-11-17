"use client";

import { optionsCopy } from "@/content/workspace";
import { sheetLayout } from "@/lib/files/convert/sheet-layout";
import { PASSPORT_COPIES, PASSPORT_OUTPUTS, PASSPORT_SIZES, PRINT_SHEETS, type PassportOptions } from "@/lib/image/options";
import { OptionGroup, OptionHint, OptionsBar } from "@/components/workspace/options/OptionsBar";
import { OptionTiles } from "@/components/workspace/options/OptionTiles";
import type { OptionsBarProps } from "@/components/workspace/options/types";

const sizeOptions = PASSPORT_SIZES.map((size) => ({ value: size, ...optionsCopy.passportSizes[size] }));
const sheetOptions = PRINT_SHEETS.map((sheet) => ({ value: sheet, ...optionsCopy.passportSheets[sheet] }));
const copyOptions = PASSPORT_COPIES.map((copies) => ({ value: copies, label: optionsCopy.passportCopyLabels[copies] }));
const outputOptions = PASSPORT_OUTPUTS.map((output) => ({ value: output, ...optionsCopy.passportOutputs[output] }));

export function PassportOptionsBar({ options, onChange, disabled }: OptionsBarProps<PassportOptions>) {
  const fits = sheetLayout(options).count > 0;
  const set = (patch: Partial<PassportOptions>) => onChange({ ...options, ...patch });

  return (
    <OptionsBar
      footer={
        <OptionHint tone={fits ? "muted" : "danger"}>{fits ? optionsCopy.passportPrintHint : optionsCopy.passportNoFit}</OptionHint>
      }
    >
      <OptionGroup label={optionsCopy.passportSize}>
        <OptionTiles
          label={optionsCopy.passportSizeLabel}
          value={options.size}
          options={sizeOptions}
          onChange={(size) => set({ size })}
          disabled={disabled}
          columns={3}
        />
      </OptionGroup>
      <OptionGroup label={optionsCopy.passportSheet}>
        <OptionTiles
          label={optionsCopy.passportSheetLabel}
          value={options.sheet}
          options={sheetOptions}
          onChange={(sheet) => set({ sheet })}
          disabled={disabled}
        />
      </OptionGroup>
      <OptionGroup label={optionsCopy.passportCopies}>
        <OptionTiles
          label={optionsCopy.passportCopiesLabel}
          value={options.copies}
          options={copyOptions}
          onChange={(copies) => set({ copies })}
          disabled={disabled}
          columns={4}
        />
      </OptionGroup>
      <OptionGroup label={optionsCopy.passportOutput}>
        <OptionTiles
          label={optionsCopy.passportOutputLabel}
          value={options.output}
          options={outputOptions}
          onChange={(output) => set({ output })}
          disabled={disabled}
        />
      </OptionGroup>
    </OptionsBar>
  );
}

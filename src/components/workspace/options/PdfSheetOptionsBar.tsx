"use client";

import { converterOptionsCopy } from "@/content/converters";
import { PDF_SHEET_LAYOUTS, type PdfSheetOptions } from "@/lib/image/options";
import { OptionGroup, OptionHint, OptionsBar } from "@/components/workspace/options/OptionsBar";
import { OptionTiles } from "@/components/workspace/options/OptionTiles";
import type { OptionsBarProps } from "@/components/workspace/options/types";

const layoutOptions = PDF_SHEET_LAYOUTS.map((layout) => ({ value: layout, ...converterOptionsCopy.sheetLayouts[layout] }));

export function PdfSheetOptionsBar({ options, onChange, disabled }: OptionsBarProps<PdfSheetOptions>) {
  return (
    <OptionsBar footer={<OptionHint>{converterOptionsCopy.pdfExcelHint}</OptionHint>}>
      <OptionGroup label={converterOptionsCopy.sheetLayout}>
        <OptionTiles
          label={converterOptionsCopy.sheetLayoutLabel}
          value={options.layout}
          options={layoutOptions}
          onChange={(layout) => onChange({ layout })}
          disabled={disabled}
          columns={2}
        />
      </OptionGroup>
    </OptionsBar>
  );
}

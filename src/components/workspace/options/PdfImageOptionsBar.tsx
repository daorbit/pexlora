"use client";

import { pdfImageCopy } from "@/content/workspace";
import { getPdfImageError, PDF_IMAGE_FORMATS, PDF_IMAGE_QUALITIES, type PdfImageOptions } from "@/lib/image/options";
import { OptionGroup, OptionHint, OptionsBar } from "@/components/workspace/options/OptionsBar";
import { OptionTiles } from "@/components/workspace/options/OptionTiles";
import { TextOption } from "@/components/workspace/options/TextOption";
import type { OptionsBarProps } from "@/components/workspace/options/types";

const formatOptions = PDF_IMAGE_FORMATS.map((value) => ({ value, ...pdfImageCopy.formats[value] }));
const qualityOptions = PDF_IMAGE_QUALITIES.map((value) => ({ value, ...pdfImageCopy.qualities[value] }));

export function PdfImageOptionsBar({ options, onChange, disabled }: OptionsBarProps<PdfImageOptions>) {
  const error = getPdfImageError(options);

  return (
    <OptionsBar
      footer={
        error ? (
          <OptionHint tone="danger">{error}</OptionHint>
        ) : (
          <OptionHint>
            {pdfImageCopy.output(options.pages.trim())}. {pdfImageCopy.zipNote}
          </OptionHint>
        )
      }
    >
      <TextOption
        label={pdfImageCopy.pages}
        value={options.pages}
        placeholder={pdfImageCopy.pagesPlaceholder}
        disabled={disabled}
        onChange={(pages) => onChange({ ...options, pages })}
      />
      <OptionGroup label={pdfImageCopy.format}>
        <OptionTiles
          label={pdfImageCopy.format}
          value={options.format}
          options={formatOptions}
          onChange={(format) => onChange({ ...options, format })}
          disabled={disabled}
        />
      </OptionGroup>
      <OptionGroup label={pdfImageCopy.quality}>
        <OptionTiles
          label={pdfImageCopy.quality}
          value={options.quality}
          options={qualityOptions}
          onChange={(quality) => onChange({ ...options, quality })}
          disabled={disabled}
        />
      </OptionGroup>
    </OptionsBar>
  );
}

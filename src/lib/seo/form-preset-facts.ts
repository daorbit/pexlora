import type { FormPreset } from "@/config/form-presets";
import type { FactRow } from "@/content/facts";
import { formPresetCopy } from "@/content/tool-pages";

const MM_PER_INCH = 25.4;
const PRINT_RESOLUTIONS = [200, 300];

const millimetres = (pixels: number, dpi: number) => Math.round((pixels / dpi) * MM_PER_INCH);

function paperRow({ width, height }: FormPreset): FactRow[] {
  if (!width || !height) return [];
  const { facts } = formPresetCopy;
  return [
    {
      label: facts.paper,
      value: `${PRINT_RESOLUTIONS.map((dpi) => facts.paperSize(millimetres(width, dpi), millimetres(height, dpi), dpi)).join(", ")}.`,
    },
  ];
}

export function formPresetRows(preset: FormPreset): FactRow[] {
  const { facts } = formPresetCopy;
  return [
    { label: facts.form, value: preset.exam },
    { label: facts.pixels, value: facts.pixelsValue(preset) },
    ...paperRow(preset),
    { label: facts.fileSize, value: facts.fileSizeValue(preset) },
    { label: facts.format, value: facts.formatValue },
  ];
}

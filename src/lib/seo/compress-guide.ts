import type { CompressTarget } from "@/config/compress-targets";
import { formPresets, type FormPreset } from "@/config/form-presets";
import { CLEAN_QUALITY, MEASURED_MAX_QUALITY, photoMeasurements } from "@/content/compress-measurements";
import { compressGuideCopy } from "@/content/compress-target-guides";
import type { FactRow } from "@/content/facts";
import type { SeoFaq } from "@/content/seo-pages/types";

const MAX_FORM_LINKS = 6;
const BEST_QUALITY = 85;
const SOFT_QUALITY = 35;

function verdict(lowest: number) {
  const { verdicts } = compressGuideCopy.tested;
  if (lowest >= BEST_QUALITY) return verdicts.best;
  if (lowest >= CLEAN_QUALITY) return verdicts.clean;
  return lowest >= SOFT_QUALITY ? verdicts.soft : verdicts.blocky;
}

function describe(qualities: number[]) {
  const { tested } = compressGuideCopy;
  const fitting = qualities.filter((quality) => quality > 0);
  if (!fitting.length) return tested.noneFit;

  const lowest = Math.min(...fitting);
  const range = tested.range(lowest, Math.max(...fitting));
  return fitting.length < qualities.length
    ? tested.someFit(fitting.length, qualities.length, range)
    : `${range}. ${verdict(lowest)}`;
}

export function measuredRows({ kb }: CompressTarget): FactRow[] {
  return photoMeasurements.flatMap(({ label, pixels, qualities }) =>
    qualities[kb] ? [{ label: compressGuideCopy.tested.row(label, pixels), value: describe(qualities[kb]) }] : [],
  );
}

export function pixelSizeFaqs({ kb, label }: CompressTarget): SeoFaq[] {
  const lowestQuality = (qualities: Record<number, number[]>) => Math.min(...(qualities[kb] ?? [0]));
  const largest = photoMeasurements.filter(({ qualities }) => lowestQuality(qualities) >= CLEAN_QUALITY).at(-1);
  if (!largest) return [];

  const unlimited = largest === photoMeasurements.at(-1) && lowestQuality(largest.qualities) >= MEASURED_MAX_QUALITY;
  const answer = unlimited ? compressGuideCopy.pixelsAnySize : compressGuideCopy.pixelsUpTo;
  return [{ question: compressGuideCopy.pixelsQuestion(label), answer: answer(label, largest.pixels) }];
}

function accepts({ minKb, maxKb }: FormPreset, kb: number) {
  if (kb > maxKb) return false;
  return minKb === null ? kb >= maxKb / 2 : kb > minKb;
}

export function formPresetsForTarget({ kb }: CompressTarget): FormPreset[] {
  return formPresets
    .filter((preset) => accepts(preset, kb))
    .sort((a, b) => Number(b.maxKb === kb) - Number(a.maxKb === kb))
    .slice(0, MAX_FORM_LINKS);
}

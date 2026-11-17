import type { FormPreset, FormPresetKind } from "@/config/form-presets";
import { MAX_FILES_PER_BATCH } from "@/config/limits";

const presetNouns: Record<FormPresetKind, string> = {
  photo: "photo",
  signature: "signature",
  thumb: "thumb impression",
  declaration: "declaration",
};

function presetDimensions({ width, height }: FormPreset) {
  if (width && height) return `${width} × ${height} px`;
  if (width) return `${width} px wide`;
  if (height) return `${height} px tall`;
  return "original shape";
}

function presetKilobytes({ minKb, maxKb }: FormPreset) {
  return minKb ? `${minKb}–${maxKb} KB` : `under ${maxKb} KB`;
}

export const formPresetCopy = {
  noun: (preset: FormPreset) => presetNouns[preset.kind],
  specs: (preset: FormPreset) => `${presetDimensions(preset)} · ${presetKilobytes(preset)} · JPG`,
  section: { eyebrow: "Form presets", title: "Ready-made sizes for popular forms." },
  headline: (preset: FormPreset) => `${preset.name} resizer.`,
  description: (preset: FormPreset) =>
    `Set to ${presetDimensions(preset)} and ${presetKilobytes(preset)} for ${preset.exam}. Drop your ${presetNouns[preset.kind]} and download a JPG that fits, made in your browser.`,
  title: (preset: FormPreset) => `${preset.name} Resizer: ${presetDimensions(preset)}, ${presetKilobytes(preset)}`,
  metaDescription: (preset: FormPreset) =>
    `Resize your ${presetNouns[preset.kind]} for ${preset.exam}: ${presetDimensions(preset)}, ${presetKilobytes(preset)}, JPG. Free, no upload, no sign-up.`,
  keywords: (preset: FormPreset) => [
    `${preset.name.toLowerCase()} size`,
    `${preset.name.toLowerCase()} resize`,
    `${preset.name.toLowerCase()} kb`,
    `${presetNouns[preset.kind]} resizer for ${preset.exam.split(" ")[0].toLowerCase()}`,
  ],
  stepsTitle: (preset: FormPreset) => `How to resize your ${preset.name.toLowerCase()}`,
};

export const toolPageCopy = {
  moreTools: { eyebrow: "More tools", title: "Do more with your files." },
  conversions: { eyebrow: "All conversions", title: "Pick a conversion." },
  conversionHeadline: (from: string, to: string) => `Convert ${from} to ${to}.`,
  conversionDescription: (from: string, to: string) =>
    `Turn ${from} images into ${to} in seconds at the highest quality setting. Convert up to ${MAX_FILES_PER_BATCH} images at once and download them clean, with every metadata tag removed.`,
  conversionTitle: (from: string, to: string) => `Convert ${from} to ${to} Online Free`,
  conversionMetaDescription: (from: string, to: string) =>
    `Free ${from} to ${to} converter. Convert ${from} images to ${to} online at maximum quality, with batch conversion and metadata removed. No sign-up.`,
  compressTargets: { eyebrow: "Target sizes", title: "Compress to an exact size." },
  compressTargetLink: (size: string) => `Under ${size}`,
  compressTargetName: (size: string) => `Compress to ${size}`,
  compressTargetHub: {
    name: "Compress to Size",
    description: "Get photos under 20 KB, 50 KB, 100 KB or any size you need for forms, exams and ID uploads.",
  },
  compressTargetHeadline: (size: string) => `Compress images to ${size}.`,
  compressTargetDescription: (size: string) =>
    `Get any photo under ${size} for job portals, exam forms and ID uploads. Quality is lowered only as much as needed, and every metadata tag is removed.`,
  compressTargetTitle: (size: string) => `Compress Image to ${size} Online Free`,
  compressTargetMetaDescription: (size: string) =>
    `Reduce JPG, PNG and WebP images to under ${size} online for free. Batch compression to an exact file size, metadata removed. No sign-up.`,
  compressTargetKeywords: (size: string) => [
    `compress image to ${size}`,
    `reduce image size to ${size}`,
    `photo under ${size}`,
    `jpg to ${size}`,
  ],
};

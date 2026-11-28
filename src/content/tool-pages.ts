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

const PRESET_TITLE_LIMIT = 50;

function presetTitle(preset: FormPreset) {
  const { name, width, height, minKb, maxKb } = preset;
  const pixels = width || height ? `${presetDimensions(preset).replace(" × ", "×")}, ` : "";
  const size = `${pixels}${minKb ? `${minKb}–${maxKb}` : maxKb} KB`;
  const full = `${name} Resizer: ${size}`;
  return full.length > PRESET_TITLE_LIMIT ? `${name}: ${size}` : full;
}

function presetShape({ width, height }: FormPreset) {
  if (!width || !height) return "";
  if (width === height) return " (square)";
  return width > height ? " (landscape)" : " (portrait)";
}

export const formPresetCopy = {
  facts: {
    eyebrow: "Size",
    title: (preset: FormPreset) => `${preset.name} size in pixels and KB`,
    summary: "The values this page is set to. Rules can change between years, so compare them with your notice and edit any number above.",
    form: "Form",
    pixels: "Width and height",
    pixelsValue: (preset: FormPreset) =>
      preset.width || preset.height
        ? `${presetDimensions(preset)}${presetShape(preset)}`
        : "Not set. The picture keeps its shape and only the file size changes.",
    paper: "On paper",
    paperSize: (width: number, height: number, dpi: number) => `${width} × ${height} mm at ${dpi} DPI`,
    fileSize: "File size",
    fileSizeValue: ({ minKb, maxKb }: FormPreset) =>
      minKb ? `Between ${minKb} and ${maxKb} KB. A file below ${minKb} KB can be rejected too.` : `Up to ${maxKb} KB.`,
    format: "Format",
    formatValue: "JPG, without EXIF or GPS data.",
  },
  noun: (preset: FormPreset) => presetNouns[preset.kind],
  specs: (preset: FormPreset) => `${presetDimensions(preset)} · ${presetKilobytes(preset)} · JPG`,
  section: { eyebrow: "Form presets", title: "Ready-made sizes for popular forms." },
  headline: (preset: FormPreset) => `${preset.name} resizer.`,
  description: (preset: FormPreset) =>
    `Set to ${presetDimensions(preset)} and ${presetKilobytes(preset)} for ${preset.exam}. Drop your ${presetNouns[preset.kind]} and download a JPG that fits, made in your browser.`,
  title: presetTitle,
  metaDescription: (preset: FormPreset) =>
    `Resize your ${presetNouns[preset.kind]} for ${preset.exam}: ${presetDimensions(preset)}, ${presetKilobytes(preset)}, JPG. Done in your browser on phone or PC. Free, no sign-up.`,
  keywords: (preset: FormPreset) => [
    `${preset.name.toLowerCase()} size`,
    `${preset.name.toLowerCase()} resize`,
    `${preset.name.toLowerCase()} kb`,
    `${presetNouns[preset.kind]} resizer for ${preset.exam.split(" ")[0].toLowerCase()}`,
    `${preset.name.toLowerCase()} resizer`,
    `${preset.name.toLowerCase()} size in kb`,
    `${preset.name.toLowerCase()} size in pixels`,
    `${preset.name.toLowerCase()} resize online free`,
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
  conversionKeywords: (from: string, to: string, slug: string) => [
    `${from} to ${to}`,
    `convert ${from} to ${to}`,
    `${from} to ${to} converter`,
    `${from} to ${to} converter free`,
    `batch convert ${from} to ${to}`,
    `change ${from} to ${to}`,
    slug.replaceAll("-", " "),
  ],
  conversionMetaDescription: (from: string, to: string) =>
    `Free ${from} to ${to} converter. Convert ${from} images to ${to} online at maximum quality, with batch conversion and metadata removed. No sign-up.`,
  imagePdfName: (from: string) => `${from} to PDF`,
  imagePdfHeadline: (from: string) => `Convert ${from} to PDF.`,
  imagePdfDescription: (from: string) =>
    `Put ${from} images into one PDF, one image per A4 page, in the order you choose. Built in your browser, with no photo metadata inside.`,
  imagePdfKeywords: (from: string) => [
    `${from} to PDF`,
    `convert ${from} to PDF`,
    `${from} to PDF converter`,
    `${from} to PDF converter free`,
    `combine ${from} images into one PDF`,
    `multiple ${from} to one PDF`,
  ],
  imagePdfTitle: (from: string) => `${from} to PDF: Combine ${from} Images into One PDF`,
  imagePdfMetaDescription: (from: string) =>
    `Free ${from} to PDF converter. Combine ${from} images into a single PDF in your browser, one image per page, with no upload and no sign-up.`,
  imagePdfLinks: { eyebrow: "Image to PDF", title: "Pick an image format." },
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
  compressTargetTitle: (size: string) => `Compress Image to ${size}: Free Photo Size Converter`,
  compressTargetMetaDescription: (size: string) =>
    `Convert any photo to under ${size} online for free. JPG, PNG, WebP and iPhone HEIC, on phone or PC, many at once, metadata removed. No sign-up.`,
  compressTargetKeywords: (size: string, slug: string) => [
    `compress image to ${size}`,
    `image to ${size} converter`,
    `${size} photo converter`,
    `${slug} converter`,
    `convert photo to ${size}`,
    `convert image to ${slug}`,
    `reduce image size to ${size}`,
    `resize image to ${size}`,
    `photo size reducer ${size}`,
    `image compressor ${slug}`,
    `photo under ${size}`,
    `jpg to ${size}`,
    `png to ${size}`,
    `${size} photo for online form`,
    `compress jpeg to ${size}`,
    `compress jpg to ${size}`,
    `photo resizer ${slug}`,
    `image converter to ${slug}`,
    `convert image to jpg ${size}`,
    `signature resize to ${slug}`,
    "image size reducer in kb",
    "photo kb converter",
  ],
};

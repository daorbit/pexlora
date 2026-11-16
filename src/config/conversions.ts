import { routes } from "@/config/site";
import { FORMAT_EXTENSIONS, FORMAT_LABELS, OUTPUT_FORMATS, type OutputFormat } from "@/lib/image/formats";

type ConversionSource = { id: string; label: string; extension: string };

const sources: ConversionSource[] = [
  { id: "jpeg", label: "JPG", extension: "jpg" },
  { id: "png", label: "PNG", extension: "png" },
  { id: "webp", label: "WebP", extension: "webp" },
  { id: "avif", label: "AVIF", extension: "avif" },
  { id: "gif", label: "GIF", extension: "gif" },
  { id: "tiff", label: "TIFF", extension: "tiff" },
];

export type Conversion = {
  slug: string;
  from: string;
  fromExtension: string;
  to: OutputFormat;
  toLabel: string;
  name: string;
  description: string;
};

export const conversions: Conversion[] = sources.flatMap((source) =>
  OUTPUT_FORMATS.filter((format) => format !== source.id).map((format) => ({
    slug: `${source.extension}-to-${FORMAT_EXTENSIONS[format]}`,
    from: source.label,
    fromExtension: source.extension,
    to: format,
    toLabel: FORMAT_LABELS[format],
    name: `${source.label} to ${FORMAT_LABELS[format]}`,
    description: `Convert ${source.label} images to ${FORMAT_LABELS[format]} online, with quality control and metadata removed.`,
  })),
);

export const popularConversionSlugs = [
  "jpg-to-webp",
  "png-to-jpg",
  "webp-to-jpg",
  "png-to-webp",
  "webp-to-png",
  "jpg-to-png",
  "jpg-to-avif",
  "avif-to-jpg",
];

export const popularConversions = popularConversionSlugs
  .map((slug) => conversions.find((conversion) => conversion.slug === slug))
  .filter((conversion): conversion is Conversion => Boolean(conversion));

export function getConversion(slug: string) {
  return conversions.find((conversion) => conversion.slug === slug);
}

export const conversionPath = (slug: string) => `/convert/${slug}`;

export const conversionIconSrc = (slug: string) => `/icons/convert/${slug}.svg`;

export function conversionHref(fromExtension: string, format: OutputFormat, quality: number) {
  const extension = FORMAT_EXTENSIONS[format];
  const conversion = getConversion(`${fromExtension}-to-${extension}`);
  return conversion
    ? `${conversionPath(conversion.slug)}?quality=${quality}`
    : `${routes.convert}?format=${extension}&quality=${quality}`;
}

export type ImagePdfVariant = { slug: string; from: string };

export const imagePdfVariants: ImagePdfVariant[] = [
  { slug: "png-to-pdf", from: "PNG" },
  { slug: "webp-to-pdf", from: "WebP" },
  { slug: "heic-to-pdf", from: "HEIC" },
];

export const imagePdfPath = (slug: string) => `/${slug}`;

export function getImagePdfVariant(slug: string) {
  return imagePdfVariants.find((variant) => variant.slug === slug)!;
}

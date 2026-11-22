export type OgKind = "tool" | "text" | "utility" | "convert" | "image-pdf" | "compress-to" | "form" | "guide";

export const OG_SIZE = { width: 1200, height: 630 } as const;

export const ogImagePath = (kind: OgKind, slug: string) => `/og/${kind}/${slug}`;

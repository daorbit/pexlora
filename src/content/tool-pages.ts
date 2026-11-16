export const toolPageCopy = {
  moreTools: { eyebrow: "More tools", title: "Do more with your files." },
  conversions: { eyebrow: "All conversions", title: "Pick a conversion." },
  conversionHeadline: (from: string, to: string) => `Convert ${from} to ${to}.`,
  conversionDescription: (from: string, to: string) =>
    `Turn ${from} images into ${to} in seconds at full quality. Convert up to 10 images at once and download them clean, with every metadata tag removed.`,
  conversionTitle: (from: string, to: string) => `Convert ${from} to ${to} Online Free`,
  conversionMetaDescription: (from: string, to: string) =>
    `Free ${from} to ${to} converter. Convert ${from} images to ${to} online at full quality, with batch conversion and metadata removed. No sign-up.`,
  compressTargets: { eyebrow: "Target sizes", title: "Compress to an exact size." },
  compressTargetLink: (size: string) => `Under ${size}`,
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

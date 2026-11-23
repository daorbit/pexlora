import type { GuideBlock } from "@/content/seo-pages/types";

export const compressGuideCopy = {
  tested: {
    eyebrow: "Tested",
    title: (size: string) => `How a photo looks at ${size}`,
    summary: (size: string) =>
      `We saved four sample photos (a selfie, a pet, a product and a travel shot) as JPG under ${size} at three sizes. The number is the JPEG quality that fits, out of 100; 95 is the highest Pexlora uses here. Busy photos need more kilobytes than plain ones, so yours may differ.`,
    caption: (size: string) => `JPEG quality that fits under ${size}, by photo size`,
    row: (label: string, pixels: string) => `${label}, ${pixels}`,
    range: (low: number, high: number) => (low === high ? `Quality ${low}` : `Quality ${low} to ${high}`),
    someFit: (fit: number, total: number, range: string) =>
      `${fit} of ${total} photos fit, at ${range.toLowerCase()}. The others only fit after being made smaller.`,
    noneFit: "None of the photos fit. Pexlora makes the photo smaller to reach the target.",
    verdicts: {
      best: "Hard to tell from the original.",
      clean: "Looks clean.",
      soft: "Some photos turn soft.",
      blocky: "Visible loss in detailed areas. Use fewer pixels.",
    },
  },
  forms: {
    eyebrow: "Forms",
    title: (size: string) => `Form sizes that fit ${size}`,
    description: "These presets set the pixels and the KB range together. Sizes change, so check the latest notice.",
  },
  pixelsQuestion: (size: string) => `What width and height should a ${size} photo be?`,
  pixelsUpTo: (size: string, pixels: string) =>
    `About ${pixels} or smaller. At that size all four of our test photos fit under ${size} and still looked clean. If your form gives exact pixels, use those instead.`,
  pixelsAnySize: (size: string, pixels: string) =>
    `There's no single size. Our ${pixels} test photos fit under ${size} at the highest quality setting, so larger photos can work too. If your form gives exact pixels, use those instead.`,
};

export const compressTargetIntros: Record<string, GuideBlock> = {
  "10kb": {
    heading: "When a form wants 10 KB",
    paragraphs: [
      "10 KB is one of the smallest limits you'll meet, and it suits signatures best: black ink on white paper compresses very well. A signature cropped close to the ink usually fits without looking any different.",
      "A face photo is harder. In our tests a 200 × 230 px photo stayed clean under 10 KB, but an 800 × 1000 px portrait couldn't reach it without losing pixels. Crop close to the face first.",
    ],
  },
  "15kb": {
    heading: "Getting a photo under 15 KB",
    paragraphs: [
      "A small form photo of about 200 × 230 px fits in 15 KB with room to spare. A passport-size photo of 413 × 531 px starts to lose detail in hair and patterned clothes.",
      "If the result looks soft, the pixels are the problem, not the KB. Reduce the width and height first, then compress.",
    ],
  },
  "20kb": {
    heading: "20 KB for signatures and ID photos",
    paragraphs: [
      "20 KB is a common cap for signatures and small ID photos. Some forms also set a minimum, such as 10 to 20 KB, so a file that's too small can be rejected as well.",
      "A 200 × 230 px photo reached our highest quality setting under 20 KB. At 413 × 531 px the same photos were usable but some were softer.",
    ],
  },
  "30kb": {
    heading: "What fits in 30 KB",
    paragraphs: [
      "30 KB is enough for a clean passport-size photo. In our tests every 413 × 531 px photo fit and looked clean. Entrance-exam forms also often list it as the top limit for a scanned signature.",
      "Photos straight from a phone are far bigger than that. Crop to head and shoulders before compressing, so the kilobytes go to the face and not the background.",
    ],
  },
  "40kb": {
    heading: "40 KB without a blurry face",
    paragraphs: [
      "40 KB gives a passport-size photo plenty of room: our 413 × 531 px tests stayed at quality 82 or higher. Our RRB NTPC preset asks for a signature between 30 and 40 KB, which is a narrow window to hit by hand.",
      "For a range like that, use the form preset and not a plain target. It aims for the range, not just the top limit.",
    ],
  },
  "50kb": {
    heading: "50 KB, a common exam photo limit",
    paragraphs: [
      "Bank exam photos are often listed as 20 to 50 KB. At the 200 × 230 px those forms use, our test photos were at the highest quality setting well before the limit.",
      "If your file comes out below the minimum, the form may reject it as too small. The preset pages below aim for the whole range.",
    ],
  },
  "100kb": {
    heading: "100 KB for documents and portraits",
    paragraphs: [
      "100 KB is where larger portraits begin to work. In our tests 800 × 1000 px photos fit at quality 71 or higher, so they looked clean on screen.",
      "It also suits scanned pages and handwritten declarations. Crop away the desk around the paper and keep the scan evenly lit, because shadows and texture cost more kilobytes than words.",
    ],
  },
  "150kb": {
    heading: "150 KB with almost nothing lost",
    paragraphs: [
      "At 150 KB an 800 × 1000 px photo is close to its original. Three of our four test photos kept the highest quality setting, and the fourth only dropped to 87.",
      "It's a good target when a site rejects large phone photos without stating a limit, or when a page of images should load quickly.",
    ],
  },
  "200kb": {
    heading: "200 KB for photos and scans",
    paragraphs: [
      "Several application forms list 200 KB as the top limit for a photo. An 800 × 1000 px photo fits at our highest quality setting, so you rarely need to shrink it.",
      "A certificate or marksheet photographed on a phone is different. It holds several megapixels, so straighten and crop it before compressing to keep small text readable.",
    ],
  },
  "300kb": {
    heading: "300 KB for certificates and web images",
    paragraphs: [
      "300 KB leaves room for detail. It suits scanned certificates with small text, product photos and blog images that should still look sharp on a large screen.",
      "All of our 800 × 1000 px test photos came in under 300 KB at the highest quality setting, so this limit mainly affects photos taken at full camera resolution.",
    ],
  },
  "500kb": {
    heading: "500 KB for full-page scans",
    paragraphs: [
      "A 500 KB limit is usually about documents: a full-page scan, a resume saved as an image or a large photo of a certificate. Ordinary portraits are often under it already.",
      "If your file is a PNG scan of a photo or a page, allowing JPG often saves far more than lowering quality. Switch it on under the target size.",
    ],
  },
  "1mb": {
    heading: "When 1 MB is the limit",
    paragraphs: [
      "Phone cameras save photos of several megabytes, so a 1 MB cap is often the first limit people hit on job portals, support tickets and email forms. Getting there rarely needs a visible change.",
      "Pexlora keeps the full width and height while it can, and only scales the photo down if lowering quality isn't enough.",
    ],
  },
  "2mb": {
    heading: "Getting phone photos under 2 MB",
    paragraphs: [
      "2 MB is a typical limit on forums, marketplaces and portals that accept full-size photos. A recent phone photo is often just over it.",
      "At this size compression is hard to notice. You keep the original pixels in most cases, and the hidden metadata is removed as well.",
    ],
  },
};

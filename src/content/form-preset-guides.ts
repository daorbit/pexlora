import type { GuideContent } from "@/content/seo-pages/types";

const form93Instructions = {
  label: "UTIITSL Form 93 instructions (PDF)",
  href: "https://www.pan.utiitsl.com/downloadFile?FileName=Form%2093%20Instructions.pdf",
};

export const formPresetGuides: Record<string, GuideContent> = {
  "pan-card-photo": {
    eyebrow: "PAN photo",
    title: "PAN card photo size, explained",
    blocks: [
      {
        heading: "Protean (NSDL) and UTIITSL differ",
        paragraphs: [
          "PAN applications go through two portals. This page is set to 197 × 276 px, which is 2.5 × 3.5 cm at 200 DPI, the size usually listed for Protean (formerly NSDL).",
          "UTIITSL is usually listed as a square photo of 213 × 213 px. If you're applying there, type those numbers into the width and height boxes above. Guides disagree on the KB limits, so go by what your upload screen says.",
        ],
      },
      {
        heading: "Applying on paper",
        paragraphs: [
          "UTIITSL's instructions for Form 93 ask for two recent colour photographs with a white background, 4.5 × 3.5 cm each. They should not be stapled or clipped to the form, and the photo on the card will only be as clear as the one you attach.",
          "That is larger than the online photo. To print copies, use the Passport Photo Maker and a light, plain background.",
        ],
      },
      {
        heading: "If the photo is rejected",
        paragraphs: [
          "Check three things: the shape (portrait or square), the KB limit and the format. The portal reads the file, so a photo that looks fine can still fail on one of them.",
          "The crop keeps the middle of the picture. Start from a photo with your face centred and some space above your head, so nothing important is cut off.",
        ],
      },
      {
        heading: "Keep the rest of the file private",
        paragraphs: [
          "A photo taken on a phone can carry the place and time it was taken. The resized JPG is made in your browser without EXIF or GPS data, so the form gets the picture and nothing else.",
        ],
      },
    ],
    sources: [form93Instructions],
  },
  "pan-card-signature": {
    eyebrow: "PAN signature",
    title: "PAN card signature size, explained",
    blocks: [
      {
        heading: "What 354 × 157 px means",
        paragraphs: [
          "It's 4.5 × 2 cm at 200 DPI, the signature box usually listed for Protean (formerly NSDL). The long, narrow shape matters: a signature photographed on a full page needs to be cropped close first.",
          "Listed limits for the file range from 10 KB to 50 KB depending on the guide. This page aims for under 20 KB. If your upload screen says less, lower the maximum above.",
        ],
      },
      {
        heading: "Take a clean picture of it",
        paragraphs: [
          "Sign with a dark pen on plain white paper, then photograph it from directly above in even light. Lines from ruled paper and shadows make the file bigger and the signature harder to read.",
          "Crop to the signature before adding it here. The tool keeps the middle of the picture, so leave a little space on all sides.",
        ],
      },
    ],
  },
  "passport-size-photo": {
    eyebrow: "Passport size",
    title: "35 × 45 mm in pixels and on paper",
    blocks: [
      {
        heading: "Why 413 × 531 px",
        paragraphs: [
          "35 × 45 mm at 300 DPI works out to 413 × 531 px, which is sharp enough to print. For a form that only shows the photo on screen, the same picture at a lower resolution looks fine and takes fewer kilobytes.",
        ],
      },
      {
        heading: "Printing or uploading",
        paragraphs: [
          "Use this page when a form wants a file. If you need prints, the Passport Photo Maker puts several copies on a 4 × 6 inch or A4 sheet with cut lines.",
          "Countries and offices set their own rules for the background and head size, so check the one you're applying to.",
        ],
      },
    ],
  },
};

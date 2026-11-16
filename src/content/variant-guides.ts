import type { CompressTarget } from "@/config/compress-targets";
import type { Conversion } from "@/config/conversions";
import { MAX_FILES_PER_BATCH } from "@/config/limits";
import { sizeLimit } from "@/content/seo-pages/shared";
import type { SeoFaq, ToolStep } from "@/content/seo-pages/types";

const keepsTransparency = (format: Conversion["to"]) => format !== "jpeg";

function transparencyFaq({ from, to, toLabel }: Conversion): SeoFaq {
  return {
    question: `Does ${from} to ${toLabel} keep transparency?`,
    answer: keepsTransparency(to)
      ? `Yes. ${toLabel} supports transparency, so transparent areas in your ${from} stay transparent.`
      : `No. ${toLabel} has no transparency, so transparent areas become white. Pick PNG or WebP if you need to keep them.`,
  };
}

function qualityFaq({ from, to, toLabel }: Conversion): SeoFaq {
  return {
    question: `Will converting ${from} to ${toLabel} lose quality?`,
    answer:
      to === "png"
        ? `PNG is lossless, so nothing more is lost in the conversion. It can't restore detail that ${from} compression already removed, and the file is usually larger.`
        : `${toLabel} is saved at the highest quality setting, so the difference is hard to see. Run the result through the Image Compressor if you need a smaller file.`,
  };
}

export function conversionSteps({ from, toLabel }: Conversion): ToolStep[] {
  return [
    { title: `Add ${from} images`, body: `Drop up to ${MAX_FILES_PER_BATCH} ${from} files, each up to ${sizeLimit("image")}.` },
    { title: `Convert to ${toLabel}`, body: `Press Convert. Each image is saved as ${toLabel} with its metadata removed.` },
    { title: "Download", body: "Compare before and after, then download one by one or as a zip." },
  ];
}

export function conversionFaqs(conversion: Conversion): SeoFaq[] {
  const { from, toLabel, fromExtension } = conversion;
  return [
    qualityFaq(conversion),
    transparencyFaq(conversion),
    ...(fromExtension === "gif"
      ? [{ question: "What happens to animated GIFs?", answer: `Only the first frame is converted, so the ${toLabel} is a still image.` }]
      : []),
    {
      question: `Is metadata kept when converting ${from} to ${toLabel}?`,
      answer: "No. EXIF, GPS, XMP, IPTC and C2PA data are left out, and the rotation is applied to the pixels first.",
    },
    {
      question: "Are my images uploaded?",
      answer:
        "Yes. Images are sent over HTTPS to our server, converted in memory and returned to you. Pexlora doesn't save them.",
    },
  ];
}

export function compressTargetSteps({ label }: CompressTarget): ToolStep[] {
  return [
    { title: "Add your images", body: `Drop up to ${MAX_FILES_PER_BATCH} JPG, PNG, WebP or AVIF images.` },
    { title: `Keep the ${label} target`, body: "The target is already set. Change it if your form asks for a different size." },
    { title: "Download", body: `Each image is checked against ${label}, then you can download one by one or as a zip.` },
  ];
}

export function compressTargetFaqs({ label }: CompressTarget): SeoFaq[] {
  return [
    {
      question: `How does Pexlora get an image under ${label}?`,
      answer: `It lowers the quality step by step until the file fits under ${label}. If quality alone isn't enough, it scales the image down as well.`,
    },
    {
      question: `What if my image can't reach ${label}?`,
      answer: "You get the smallest version Pexlora could make, with a note that the target wasn't met. Resizing the image first usually helps.",
    },
    {
      question: "Does the format change?",
      answer: "No. JPG, PNG, WebP and AVIF keep their format. A PNG becomes a JPG only if you allow it, which helps a lot with photos.",
    },
    {
      question: "Is metadata removed?",
      answer: "Yes. The compressed copy has no EXIF, GPS, XMP, IPTC or C2PA data, which also saves a few kilobytes.",
    },
  ];
}

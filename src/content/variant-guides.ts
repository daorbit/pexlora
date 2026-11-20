import type { CompressTarget } from "@/config/compress-targets";
import type { Conversion } from "@/config/conversions";
import type { FormPreset } from "@/config/form-presets";
import type { ImagePdfVariant } from "@/config/image-pdf-variants";
import { formPresetCopy } from "@/content/tool-pages";
import { hindiCompressTargetFaq, hinglishCompressTargetFaq, hinglishFormPresetFaq } from "@/content/hinglish-faqs";
import { MAX_FILES_PER_BATCH } from "@/config/limits";
import { serverImageLimit } from "@/content/seo-pages/shared";
import type { SeoFaq, ToolStep } from "@/content/seo-pages/types";

export const conversionGuides = ["remove-exif-data", "remove-gps-from-photo", "remove-c2pa-content-credentials", "ai-metadata-checker"];

export const compressTargetGuides = ["remove-exif-data", "remove-gps-from-photo", "ai-image-cleaner", "exif-viewer"];

export const formPresetGuides = ["remove-exif-data", "remove-location-from-iphone-photos", "remove-gps-from-photo", "photo-location-finder"];

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
    { title: `Add ${from} images`, body: `Drop up to ${MAX_FILES_PER_BATCH} ${from} files, each up to ${serverImageLimit}.` },
    { title: `Convert to ${toLabel}`, body: `Press Convert. Each image is saved as ${toLabel} with its metadata removed.` },
    { title: "Download", body: "Download one by one or as a zip." },
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
    { title: "Add your images", body: `Drop up to ${MAX_FILES_PER_BATCH} JPG, PNG, WebP, HEIC or AVIF images.` },
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
      answer:
        "No. JPG, PNG, WebP and AVIF keep their format, and iPhone HEIC photos come out as JPG. A PNG becomes a JPG only if you allow it, which helps a lot with photos.",
    },
    {
      question: "Is metadata removed?",
      answer: "Yes. The compressed copy has no EXIF, GPS, XMP, IPTC or C2PA data, which also saves a few kilobytes.",
    },
    {
      question: `How do I convert a photo to ${label} on my phone?`,
      answer: `Open this page in Chrome or Safari, tap the upload area and pick the photo from your gallery. The target is already ${label}, so tap Compress Images, then Download (Save to Photos on iPhone). JPG, PNG, WebP and HEIC photos are compressed on your phone and never uploaded.`,
    },
    hinglishCompressTargetFaq(label),
    hindiCompressTargetFaq(label),
  ];
}

export function formPresetSteps(preset: FormPreset): ToolStep[] {
  const noun = formPresetCopy.noun(preset);
  return [
    { title: `Add your ${noun}`, body: `Pick a clear ${noun} from your phone or computer. HEIC photos from iPhones work too.` },
    { title: "Check the size", body: `It's set to ${formPresetCopy.specs(preset)}. Change any number if your notice says something different.` },
    { title: "Download the JPG", body: "Tap Resize for Form, then save the file and upload it to the form." },
  ];
}

export function formPresetFaqs(preset: FormPreset): SeoFaq[] {
  const noun = formPresetCopy.noun(preset);
  return [
    {
      question: `What size does ${preset.exam} ask for?`,
      answer: `This page uses ${formPresetCopy.specs(preset)}, the size most notices list. Rules can change between years, so compare it with the official notice and edit the numbers if needed.`,
    },
    {
      question: `Will my ${noun} be cropped?`,
      answer: preset.width && preset.height
        ? "Yes, if its shape is different. The middle of the picture is kept, so keep your face or signature centred."
        : "No. The shape stays the same; only the file size is changed.",
    },
    {
      question: "What if the file is still too big or too small?",
      answer: "Quality is adjusted step by step to land inside the KB range. If a target can't be reached, you'll see a note, and a clearer or larger source picture usually fixes it.",
    },
    hinglishFormPresetFaq(preset.name, formPresetCopy.specs(preset)),
    {
      question: `Is my ${noun} uploaded?`,
      answer: "No. Resizing happens in your browser, so the file stays on your device. The JPG also has no EXIF or GPS data.",
    },
  ];
}

export const imagePdfGuides = ["remove-exif-data", "remove-gps-from-photo", "remove-pdf-metadata", "remove-location-from-iphone-photos"];

export function imagePdfSteps({ from }: ImagePdfVariant): ToolStep[] {
  return [
    { title: `Add ${from} images`, body: `Drop up to ${MAX_FILES_PER_BATCH} ${from} files. JPG, PNG, WebP and HEIC can be mixed.` },
    { title: "Set the order", body: "Use the arrows to move images up or down. Each image gets its own page." },
    { title: "Create the PDF", body: "Save one PDF with every image fitted and centred on an A4 page." },
  ];
}

export function imagePdfFaqs({ from }: ImagePdfVariant): SeoFaq[] {
  return [
    {
      question: `Can I combine several ${from} images into one PDF?`,
      answer: `Yes. Add as many as ${MAX_FILES_PER_BATCH} images, put them in order, and they're saved as one PDF with one image per page.`,
    },
    {
      question: "What page size is used?",
      answer: "A4. Portrait images get portrait pages and landscape images get landscape pages, with a small margin.",
    },
    {
      question: "Is my location included in the PDF?",
      answer: "No. Only the pixels are placed on the page, so EXIF and GPS data from your photos aren't in the PDF.",
    },
    {
      question: `Are my ${from} images uploaded?`,
      answer: "No. The PDF is built in your browser, so your images stay on your device.",
    },
  ];
}

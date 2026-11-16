import { AI_NAME } from "@/config/brand";
import {
  AI_DAILY_LIMITS,
  COMPRESS_TARGET_KB_RANGE,
  DAILY_LIMITS,
  MAX_FILES_PER_BATCH,
  MAX_METADATA_TEXT_LENGTH,
  MAX_RESIZE_DIMENSION,
  RESIZE_PERCENT_RANGE,
} from "@/config/limits";
import type { WorkspaceToolSlug } from "@/config/tools";
import { COMPRESSION_QUALITY } from "@/lib/image/options";
import { extensions, faqs, howToSteps, imageQualityAnswer, sizeLimit } from "@/content/seo-pages/shared";
import type { SeoFaq, ToolStep } from "@/content/seo-pages/types";

export type ToolGuide = {
  intro: { heading: string; paragraphs: string[] };
  steps: ToolStep[];
  faqs: SeoFaq[];
  relatedGuides?: string[];
};

const imageFormats = extensions(["image"], false);
const allImageFormats = extensions(["image"]);

const imageUpload: SeoFaq = {
  question: "Are my images uploaded?",
  answer:
    "Yes. Images are sent over HTTPS to our server, processed in memory and returned to you. Pexlora doesn't save them, and our code doesn't write them to disk or to a database.",
};

const animatedGif: SeoFaq = {
  question: "Do animated GIFs keep their animation?",
  answer: "No. Only the first frame of an animated GIF is used, so the result is a still image.",
};

const dailyLimit: SeoFaq = {
  question: "Is there a limit?",
  answer: `Images can be up to ${sizeLimit("image")} each, and you can add ${MAX_FILES_PER_BATCH} at a time. You can process ${DAILY_LIMITS.anonymous} files a day without an account, or ${DAILY_LIMITS.user} with a free account.`,
};

const aiLimit: SeoFaq = {
  question: `Is ${AI_NAME} free?`,
  answer: `Yes. ${AI_NAME} handles ${AI_DAILY_LIMITS.anonymous} requests a day without an account, or ${AI_DAILY_LIMITS.user} with a free account.`,
};

export const toolGuides: Record<WorkspaceToolSlug, ToolGuide> = {
  "remove-metadata": {
    intro: {
      heading: "Remove hidden metadata before you share a file",
      paragraphs: [
        "Photos, documents and recordings carry more than you see: GPS coordinates, camera serial numbers, author and company names, editing software, and AI tags such as C2PA Content Credentials or generation prompts. Pexlora reads every field first, shows you what it found, then gives you a copy without it.",
        `It works with photos (${allImageFormats}), PDFs, Word, Excel and PowerPoint files, audio and video. JPG, PNG, WebP and HEIC photos, documents, audio and video are cleaned in your browser and never uploaded. AVIF, TIFF and GIF images are cleaned on our server in memory and not saved.`,
        "For JPG, PNG, WebP and HEIC the metadata is cut out of the file without re-encoding, so the picture stays identical. Photos keep only their rotation flag and colour profile, so they don't turn sideways or shift colour.",
      ],
    },
    steps: howToSteps["remove-metadata"],
    faqs: [
      {
        question: "What exactly is removed?",
        answer:
          "EXIF (camera, lens, serial numbers, dates, software), GPS location, XMP and IPTC fields, PNG text chunks, C2PA Content Credentials and AI generator tags. In documents, the author, last editor, company and other properties go too. The embedded colour profile of an image is kept, because it only describes colours.",
      },
      { question: "Will removing metadata lower the quality?", answer: imageQualityAnswer },
      faqs.watermarks,
      faqs.verify,
      faqs.mixedPrivacy,
      dailyLimit,
    ],
    relatedGuides: ["ai-image-cleaner", "remove-gps-from-photo", "remove-pdf-metadata", "remove-video-metadata"],
  },
  "view-metadata": {
    intro: {
      heading: "See what a file reveals about you",
      paragraphs: [
        "Drop a photo, PDF, Office document, song or video to read the metadata inside it. Fields are grouped by where they are stored, such as EXIF, XMP, IPTC, GPS, C2PA and the colour profile. AI-related fields are marked in orange and listed first.",
        `If the file has GPS coordinates, the location is shown with an optional map link that only opens when you click it. ${AI_NAME} can explain the tags in plain words if you ask it to.`,
        "Viewing is free and doesn't count toward your daily limit. When you're done, send the file to Remove Metadata to strip what you found.",
      ],
    },
    steps: howToSteps["view-metadata"],
    faqs: [
      faqs.inspectFree,
      {
        question: "Which files can I check?",
        answer: `Photos (${allImageFormats}), PDFs, Word, Excel and PowerPoint files, audio and video.`,
      },
      {
        question: "Why does my photo show no GPS location?",
        answer:
          "Location may have been off when the photo was taken, or an app or social network removed it when the file was saved or uploaded. Screenshots don't contain location.",
      },
      {
        question: `What does ${AI_NAME} do with my metadata?`,
        answer: `When you press Explain with ${AI_NAME}, the list of tags found in the file is sent to Cloudflare Workers AI to write a plain-language summary. The file itself isn't sent.`,
      },
      faqs.mixedPrivacy,
    ],
    relatedGuides: ["exif-viewer", "ai-metadata-checker", "photo-location-finder", "remove-exif-data"],
  },
  "edit-metadata": {
    intro: {
      heading: "Add your name and copyright to a photo",
      paragraphs: [
        `Set the author, copyright notice, description and keywords on ${imageFormats} images. Pexlora writes them as standard EXIF and XMP fields that photo apps, stock sites and search engines can read.`,
        "All other metadata is removed at the same time, including GPS location, camera details and AI tags, so the file only carries what you entered.",
        `Not sure what to write? ${AI_NAME} can look at the image and suggest a description and keywords.`,
      ],
    },
    steps: [
      { title: "Drop your images", body: `Add up to ${MAX_FILES_PER_BATCH} images. The current metadata is shown for each one.` },
      { title: "Fill in the fields", body: `Author, copyright, description and keywords, up to ${MAX_METADATA_TEXT_LENGTH} characters each.` },
      { title: "Save and download", body: "Every image gets the same fields, and the rest of its metadata is cleared." },
    ],
    faqs: [
      {
        question: "Which fields are written?",
        answer:
          "Author goes into EXIF Artist and XMP creator, copyright into EXIF Copyright and XMP rights, description into EXIF ImageDescription and XMP description, and keywords into XMP subject.",
      },
      {
        question: "What happens to the existing metadata?",
        answer: "It's removed, including GPS location, camera details and AI tags. The saved image carries only the fields you filled in.",
      },
      {
        question: "Does saving change the picture?",
        answer:
          "Not for JPG, PNG and WebP: the new fields are added without re-encoding, so the pixels stay identical. Photos saved with a rotation flag, and AVIF, TIFF and GIF files, are re-encoded at high quality, and TIFF and GIF come back as PNG.",
      },
      imageUpload,
      dailyLimit,
    ],
    relatedGuides: ["exif-viewer", "remove-exif-data", "remove-gps-from-photo", "ai-image-cleaner"],
  },
  "compress-image": {
    intro: {
      heading: "Make images smaller without changing their format",
      paragraphs: [
        `Pick Light, Balanced or Strong compression, or set an exact target size between ${COMPRESS_TARGET_KB_RANGE.min} KB and ${COMPRESS_TARGET_KB_RANGE.max / 1024} MB for forms and upload limits. JPG, PNG, WebP and AVIF images keep their format.`,
        "PNG images are reduced to an optimised colour palette, which saves the most space on screenshots and graphics. All metadata is removed from the compressed copy.",
      ],
    },
    steps: [
      { title: "Drop your images", body: `Add up to ${MAX_FILES_PER_BATCH} images at once.` },
      { title: "Choose how much", body: "Pick a compression level, or switch to Target Size and enter the size you need." },
      { title: "Compare and download", body: "Check the before and after with the slider, then download one by one or as a zip." },
    ],
    faqs: [
      {
        question: "What do the compression levels mean?",
        answer: `Light keeps quality ${COMPRESSION_QUALITY.light}, Balanced ${COMPRESSION_QUALITY.balanced} and Strong ${COMPRESSION_QUALITY.strong} on a 100-point scale. Lower numbers give smaller files.`,
      },
      {
        question: "How does Target Size work?",
        answer:
          "Pexlora lowers the quality step by step until the image fits. If quality alone isn't enough, it also scales the image down. If the target still can't be reached, you get the smallest version and a note.",
      },
      {
        question: "Can a PNG become a JPG?",
        answer: "Only in Target Size mode, and only if you allow it. JPG is usually much smaller for photos, but it drops transparency.",
      },
      animatedGif,
      imageUpload,
      dailyLimit,
    ],
  },
  "resize-image": {
    intro: {
      heading: "Change image dimensions in seconds",
      paragraphs: [
        `Scale images by percentage, from ${RESIZE_PERCENT_RANGE.min}% to ${RESIZE_PERCENT_RANGE.max}%, or set an exact width and height in pixels, up to ${MAX_RESIZE_DIMENSION} px per side. Keep the aspect ratio to avoid stretching, or turn it off to fill exact dimensions.`,
        "Images keep their format, and metadata is removed from the resized copy. To make the file smaller as well, run it through the Image Compressor afterwards.",
      ],
    },
    steps: [
      { title: "Drop your images", body: `Add up to ${MAX_FILES_PER_BATCH} images at once.` },
      { title: "Set the size", body: "Choose a percentage, or type a width, a height or both." },
      { title: "Download", body: "Each result shows its new dimensions. Download one by one or as a zip." },
    ],
    faqs: [
      {
        question: "Does resizing keep the aspect ratio?",
        answer:
          "Yes, by default. With dimensions, the image fits inside the width and height you enter. Turn off Keep Aspect Ratio to stretch it to the exact size.",
      },
      {
        question: "Can I make an image bigger?",
        answer: `Yes, up to ${RESIZE_PERCENT_RANGE.max}% or ${MAX_RESIZE_DIMENSION} px per side. Enlarging can't add detail, so big upscales look soft.`,
      },
      animatedGif,
      imageUpload,
      dailyLimit,
    ],
  },
  "convert-format": {
    intro: {
      heading: "Convert images between JPG, PNG, WebP and AVIF",
      paragraphs: [
        `Turn ${imageFormats} images into JPG, PNG, WebP or AVIF. Images are converted at the highest quality setting, so use the Image Compressor afterwards if you need a smaller file.`,
        "Every converted file is written without EXIF, XMP, IPTC or C2PA data, and the rotation is applied to the pixels so nothing ends up sideways.",
      ],
    },
    steps: [
      { title: "Drop your images", body: `Add up to ${MAX_FILES_PER_BATCH} images at once.` },
      { title: "Pick a format", body: "Choose JPG, PNG, WebP or AVIF." },
      { title: "Download", body: "Compare before and after, then download one by one or as a zip." },
    ],
    faqs: [
      {
        question: "Which format should I choose?",
        answer:
          "WebP is a good default for websites. AVIF usually gives the smallest photos. PNG is lossless and keeps transparency. JPG works everywhere.",
      },
      {
        question: "What happens to transparent backgrounds?",
        answer: "PNG, WebP and AVIF keep transparency. JPG doesn't support it, so transparent areas become white.",
      },
      animatedGif,
      imageUpload,
      dailyLimit,
    ],
  },
  "image-alt-text": {
    intro: {
      heading: "Write alt text and file names for your images",
      paragraphs: [
        `${AI_NAME} looks at each image and writes alt text for screen readers, a short description, search keywords and a descriptive file name. Copy what you need, or download the images renamed.`,
        `A smaller preview of each image (up to 768 px) is sent to Cloudflare Workers AI to generate the text. Always read the result before you publish it, because ${AI_NAME} can misread details.`,
      ],
    },
    steps: [
      { title: "Drop your images", body: `Add up to ${MAX_FILES_PER_BATCH} images at once.` },
      { title: "Generate", body: `${AI_NAME} describes each image and suggests keywords and a file name.` },
      { title: "Copy or download", body: "Copy the alt text, or download the images with their new names." },
    ],
    faqs: [
      {
        question: "What makes good alt text?",
        answer:
          "Short and specific: what the image shows and why it matters on the page, usually under 125 characters. Skip phrases like “image of”.",
      },
      {
        question: "Where is my image sent?",
        answer: `A resized preview goes to Cloudflare Workers AI, which runs ${AI_NAME}. Pexlora doesn't keep the image or the generated text on its servers.`,
      },
      {
        question: "Will it name the people in my photos?",
        answer: `It shouldn't. ${AI_NAME} is instructed to describe people without guessing who they are.`,
      },
      aiLimit,
    ],
  },
};

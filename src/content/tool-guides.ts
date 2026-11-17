import { AI_NAME } from "@/config/brand";
import {
  AI_DAILY_LIMITS,
  COMPRESS_TARGET_KB_RANGE,
  DAILY_LIMITS,
  MAX_FILES_PER_BATCH,
  MAX_METADATA_TEXT_LENGTH,
  MAX_RESIZE_DIMENSION,
  PDF_PAGE_LIMIT,
  PDF_RENDER_MAX_SIDE,
  RESIZE_PERCENT_RANGE,
} from "@/config/limits";
import type { WorkspaceToolSlug } from "@/config/tools";
import { COMPRESSION_QUALITY } from "@/lib/image/options";
import { extensions, faqs, howToSteps, imageQualityAnswer, serverImageLimit, sizeLimit } from "@/content/seo-pages/shared";
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

const dailyCounts = `You can process ${DAILY_LIMITS.anonymous} files a day without an account, or ${DAILY_LIMITS.user} with a free account.`;

const dailyLimit: SeoFaq = {
  question: "Is there a limit?",
  answer: `JPG, PNG, WebP and HEIC images can be up to ${sizeLimit("image")} each (AVIF, TIFF and GIF up to ${serverImageLimit}), and you can add ${MAX_FILES_PER_BATCH} at a time. ${dailyCounts}`,
};

const serverDailyLimit: SeoFaq = {
  question: "Is there a limit?",
  answer: `Images can be up to ${serverImageLimit} each, and you can add ${MAX_FILES_PER_BATCH} at a time. ${dailyCounts}`,
};

const mostlyInBrowser: SeoFaq = {
  question: "Are my images uploaded?",
  answer:
    "JPG, PNG, WebP and HEIC images are processed in your browser, so they stay on your device. AVIF, TIFF and GIF are sent over HTTPS to our server, processed in memory and returned to you. Pexlora doesn't save them.",
};

const inBrowser: SeoFaq = {
  question: "Are my files uploaded?",
  answer:
    "No. This tool runs entirely in your browser, so the files stay on your device. Pexlora only counts how many files you process each day.",
};

const pdfLimit: SeoFaq = {
  question: "Is there a limit?",
  answer: `PDFs can be up to ${sizeLimit("pdf")} and ${PDF_PAGE_LIMIT} pages each, and you can add ${MAX_FILES_PER_BATCH} files at a time. You can process ${DAILY_LIMITS.anonymous} files a day without an account, or ${DAILY_LIMITS.user} with a free account.`,
};

const passwordPdf: SeoFaq = {
  question: "Can I use a password-protected PDF?",
  answer: "Not yet. Remove the password in your PDF reader first, then add the file again.",
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
      serverDailyLimit,
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
      mostlyInBrowser,
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
      mostlyInBrowser,
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
      serverDailyLimit,
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
  "heic-to-jpg": {
    intro: {
      heading: "Convert iPhone HEIC photos to JPG",
      paragraphs: [
        "iPhones save photos as HEIC, which many websites, Windows apps and older Android phones can't open. Pexlora turns them into JPG, which opens everywhere, or PNG if you want a lossless copy.",
        "The conversion happens in your browser, so your photos aren't uploaded. The new files contain only the picture: the EXIF data, GPS location and camera details from the original are not copied over.",
      ],
    },
    steps: [
      { title: "Add your HEIC photos", body: `Pick up to ${MAX_FILES_PER_BATCH} photos, or drop them on the page.` },
      { title: "Choose JPG or PNG", body: "JPG is smaller and works everywhere. PNG keeps every pixel." },
      { title: "Save the photos", body: "Conversion starts right away. Save each photo, or all of them at once." },
    ],
    faqs: [
      {
        question: "Why can't I open HEIC files?",
        answer:
          "HEIC is Apple's photo format. It saves space, but Windows, many websites and some Android phones don't support it without extra software. Converting to JPG fixes that.",
      },
      {
        question: "Will the photo lose quality?",
        answer:
          "JPG is saved at high quality, so the difference is very hard to see. Choose PNG if you need a copy with no compression at all.",
      },
      {
        question: "Is my location removed?",
        answer: "Yes. Only the picture is converted, so the GPS position, date and camera details are not in the new file.",
      },
      inBrowser,
      dailyLimit,
    ],
  },
  "form-photo": {
    intro: {
      heading: "Resize a photo or signature for any online form",
      paragraphs: [
        "Exam, bank and government forms reject photos that are a few pixels or kilobytes off. Type in the width, height and KB range from the notice, or pick a ready-made preset for IBPS, SSC, UPSC, NEET, PAN or a passport photo, and get a JPG that fits.",
        "The photo is centre-cropped to the exact shape and saved at the highest quality that stays inside the KB range. It all happens in your browser, so your photo isn't uploaded, and the JPG carries no EXIF or GPS data.",
      ],
    },
    steps: [
      { title: "Add your photo or signature", body: `Pick up to ${MAX_FILES_PER_BATCH} images. JPG, PNG, WebP and iPhone HEIC photos work.` },
      { title: "Enter the size", body: "Copy the pixels and the smallest and largest KB from your form, or open a preset below." },
      { title: "Download the JPG", body: "Each file is resized and compressed to fit, ready to upload." },
    ],
    faqs: [
      {
        question: "Where do I find the right size?",
        answer: "In the form's official notice or on the upload page itself. Our presets use the sizes most notices list, but always check the latest notice.",
      },
      {
        question: "Why is my photo cropped?",
        answer: "When both width and height are set, the photo is fitted to that exact shape and the edges are trimmed. Leave one of them empty to keep the original shape.",
      },
      inBrowser,
      dailyLimit,
    ],
  },
  "merge-pdf": {
    intro: {
      heading: "Merge PDF files into one document",
      paragraphs: [
        "Combine contracts, scans or reports into a single PDF. Add the files, set the order with the arrows and merge them in one step.",
        "Merging runs in your browser, so the documents never leave your device. The merged file starts fresh: titles, authors and other document information from the originals are not carried over.",
      ],
    },
    steps: [
      { title: "Add your PDFs", body: `Choose up to ${MAX_FILES_PER_BATCH} PDF files.` },
      { title: "Set the order", body: "Use the arrows on each file to move it up or down." },
      { title: "Merge and save", body: "Get one PDF with every page in the order you chose." },
    ],
    faqs: [
      {
        question: "Can I change the page order?",
        answer: "Yes, file by file. Move each PDF up or down before merging; the pages inside each file keep their order.",
      },
      inBrowser,
      passwordPdf,
      pdfLimit,
    ],
    relatedGuides: ["remove-pdf-metadata"],
  },
  "split-pdf": {
    intro: {
      heading: "Split a PDF into separate pages",
      paragraphs: [
        "Need one page from a long document, or every page as its own file? Pexlora splits a PDF into single-page PDFs and gives you all of them in one ZIP.",
        "Splitting runs in your browser, so your document isn't uploaded. Each new file contains only its page, without the original's author or title information.",
      ],
    },
    steps: [
      { title: "Add a PDF", body: "Choose the PDF you want to split." },
      { title: "Wait a moment", body: "Every page is saved as its own PDF right away." },
      { title: "Download the ZIP", body: "Unzip it to get one file per page." },
    ],
    faqs: [
      {
        question: "Can I split several PDFs at once?",
        answer: `Yes. Add up to ${MAX_FILES_PER_BATCH} files and each one becomes its own ZIP of pages.`,
      },
      inBrowser,
      passwordPdf,
      pdfLimit,
    ],
    relatedGuides: ["remove-pdf-metadata"],
  },
  "rotate-pdf": {
    intro: {
      heading: "Rotate PDF pages and save the result",
      paragraphs: [
        "Scans and phone photos often end up sideways or upside down. Turn every page by 90 or 180 degrees and save a PDF that opens the right way everywhere.",
        "Rotation runs in your browser and doesn't re-compress text or images. The saved copy also has its document metadata removed, so the author and editing software aren't shared.",
      ],
    },
    steps: [
      { title: "Add your PDFs", body: `Choose up to ${MAX_FILES_PER_BATCH} PDF files.` },
      { title: "Pick the angle", body: "90° right, 180° or 90° left." },
      { title: "Rotate and save", body: "Every page turns, and you can save the new PDF." },
    ],
    faqs: [
      {
        question: "Does rotating change the quality?",
        answer: "No. Only the page orientation changes; the text and images inside stay exactly as they were.",
      },
      inBrowser,
      passwordPdf,
      pdfLimit,
    ],
    relatedGuides: ["remove-pdf-metadata"],
  },
  "jpg-to-pdf": {
    intro: {
      heading: "Turn images into a single PDF",
      paragraphs: [
        "Put receipts, scans or photos into one PDF that's easy to email or upload. Each image gets its own A4 page, fitted and centred, in the order you choose.",
        `JPG, PNG, WebP and HEIC images up to ${sizeLimit("image")} each work. The PDF is built in your browser, and photo metadata such as GPS location isn't copied into it.`,
      ],
    },
    steps: [
      { title: "Add your images", body: `Choose up to ${MAX_FILES_PER_BATCH} images.` },
      { title: "Set the order", body: "Use the arrows to move images up or down." },
      { title: "Create the PDF", body: "Save one PDF with an image on each page." },
    ],
    faqs: [
      {
        question: "What page size is used?",
        answer: "A4. Portrait images get portrait pages and landscape images get landscape pages, with a small margin.",
      },
      {
        question: "Is my location included in the PDF?",
        answer: "No. Only the pixels are placed on the page, so EXIF and GPS data from your photos aren't in the PDF.",
      },
      inBrowser,
      dailyLimit,
    ],
  },
  "pdf-to-jpg": {
    intro: {
      heading: "Save PDF pages as JPG images",
      paragraphs: [
        "Turn each page of a PDF into a JPG you can post, send in a chat or drop into a presentation. Pages are rendered sharply, and several pages come together in one ZIP.",
        "Rendering happens in your browser with the same engine Firefox uses to show PDFs, so your document isn't uploaded.",
      ],
    },
    steps: [
      { title: "Add a PDF", body: `Choose up to ${MAX_FILES_PER_BATCH} PDF files.` },
      { title: "Wait a moment", body: "Every page is rendered to a JPG right away." },
      { title: "Download the images", body: "One page gives a JPG; more pages come as a ZIP." },
    ],
    faqs: [
      {
        question: "What resolution are the images?",
        answer: `Pages are rendered at twice their normal size, up to ${PDF_RENDER_MAX_SIDE} pixels on the longest side, which is sharp enough for screens and most printing.`,
      },
      inBrowser,
      passwordPdf,
      pdfLimit,
    ],
    relatedGuides: ["remove-pdf-metadata"],
  },
};

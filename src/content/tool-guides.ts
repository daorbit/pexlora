import { AI_NAME } from "@/config/brand";
import {
  AI_DAILY_LIMITS,
  COMPRESS_TARGET_KB_RANGE,
  DAILY_LIMITS,
  MAX_FILES_PER_BATCH,
  MAX_METADATA_TEXT_LENGTH,
  MAX_RESIZE_DIMENSION,
  PDF_PAGE_LIMIT,
  PDF_IMAGE_DPI,
  PDF_PRINT_MAX_SIDE,
  PDF_RENDER_MAX_SIDE,
  RESIZE_PERCENT_RANGE,
  SHEET_CELL_LIMIT,
} from "@/config/limits";
import type { WorkspaceToolSlug } from "@/config/tools";
import { COMPRESSION_QUALITY } from "@/lib/image/options";
import { extensions, faqs, howToSteps, imageQualityAnswer, serverImageLimit, sizeLimit } from "@/content/seo-pages/shared";
import type { SeoFaq, ToolStep } from "@/content/seo-pages/types";
import { hinglishFaqs } from "@/content/hinglish-faqs";

export type ToolGuide = {
  intro: { heading: string; paragraphs: string[] };
  steps: ToolStep[];
  faqs: SeoFaq[];
  relatedGuides: string[];
};

const pdfGuides = ["remove-pdf-metadata", "remove-office-metadata", "remove-exif-data", "ai-metadata-checker"];

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

const scannedPdf: SeoFaq = {
  question: "Does it work on scanned PDFs?",
  answer:
    "No. A scanned page is a picture of text, so there's no text in the file to read yet. It works on PDFs made from Word, Excel, websites, banking apps and other software, where you can select the text.",
};

const officeLimit: SeoFaq = {
  question: "Is there a limit?",
  answer: `Excel and Word files can be up to ${sizeLimit("office")}, CSV, XLS and ODS files up to ${sizeLimit("sheet")}, and spreadsheets up to ${SHEET_CELL_LIMIT.toLocaleString("en-US")} cells, with ${MAX_FILES_PER_BATCH} files at a time. ${dailyCounts}`,
};

const pdfFonts: SeoFaq = {
  question: "Which languages show up in the PDF?",
  answer:
    "English and other Latin-script languages, Greek and Cyrillic are drawn as real, selectable text. The rupee sign is written as Rs. Hindi and other Indian scripts aren't drawn yet and show as question marks.",
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
      hinglishFaqs.removeLocation,
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
        "Drop a photo, PDF, Office document, song or video to read the metadata inside it. Fields are grouped by where they are stored, such as EXIF, XMP, IPTC, GPS, C2PA and the colour profile. AI-related fields are marked in orange and listed first. Search any field, show only AI or personal tags, and export the full report as JSON.",
        `For Content Credentials (C2PA), the viewer shows the tool that made the file, its source type and the recorded edits. If the file has GPS coordinates, they're shown in decimal and degrees, with a copy button and a map link that only opens when you click it. ${AI_NAME} can explain the tags in plain words if you ask it to.`,
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
      hinglishFaqs.compress,
      animatedGif,
      mostlyInBrowser,
      dailyLimit,
    ],
    relatedGuides: ["remove-exif-data", "remove-gps-from-photo", "ai-image-cleaner", "exif-viewer"],
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
    relatedGuides: ["remove-exif-data", "remove-location-from-iphone-photos", "ai-image-cleaner", "photo-location-finder"],
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
    relatedGuides: ["remove-exif-data", "remove-c2pa-content-credentials", "remove-stable-diffusion-metadata", "ai-metadata-checker"],
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
    relatedGuides: ["ai-metadata-checker", "remove-ai-info-label-instagram", "remove-microsoft-designer-metadata", "remove-grok-image-metadata"],
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
    relatedGuides: ["remove-location-from-iphone-photos", "remove-gps-from-photo", "photo-location-finder", "remove-exif-data"],
  },
  "svg-to-image": {
    intro: {
      heading: "Convert SVG to PNG, JPG or WebP",
      paragraphs: [
        "SVG is great for logos and icons on the web, but many apps, social networks and document editors only accept regular images. Pexlora draws your SVG at the size you pick and saves it as a sharp PNG, JPG or WebP.",
        "Because SVG is a vector format, a larger size gives a sharper image instead of a blurry one. Pick 2x or 4x for retina screens, or an exact size like 1024 px for app icons and slides. Everything runs in your browser, so your files aren't uploaded.",
      ],
    },
    steps: [
      { title: "Add your SVG files", body: `Drop up to ${MAX_FILES_PER_BATCH} SVG files, each up to ${sizeLimit("vector")}.` },
      { title: "Pick format and size", body: "PNG and WebP keep transparency. JPG gets a white background." },
      { title: "Save the images", body: "Conversion starts right away. Save each image, or all of them as a zip." },
    ],
    faqs: [
      {
        question: "Will the PNG be sharp?",
        answer:
          "Yes. The SVG is drawn directly at the size you choose, so edges stay crisp. Pick 2x, 4x or a larger pixel size if the image looks small.",
      },
      {
        question: "Is the background transparent?",
        answer: "PNG and WebP keep transparent areas. JPG has no transparency, so the background becomes white.",
      },
      {
        question: "Why does my SVG look different?",
        answer:
          "Web fonts and images linked from other websites aren't loaded, for your safety, so text may fall back to a font on your device. Convert text to outlines in your design app before exporting the SVG.",
      },
      {
        question: "Is the SVG's metadata copied?",
        answer: "No. Only the drawing is converted, so author, editor and description data in the SVG is not in the new image.",
      },
      inBrowser,
      {
        question: "Is there a limit?",
        answer: `SVG files can be up to ${sizeLimit("vector")} each, and you can add ${MAX_FILES_PER_BATCH} at a time. ${dailyCounts}`,
      },
    ],
    relatedGuides: ["remove-exif-data", "remove-pdf-metadata", "remove-office-metadata", "ai-metadata-checker"],
  },
  "image-to-svg": {
    intro: {
      heading: "Convert PNG and JPG to SVG vectors",
      paragraphs: [
        "Pexlora traces the shapes in your image and rebuilds them as real SVG paths, so the result scales to any size and can be edited in Figma, Illustrator or Inkscape. It's not a photo wrapped inside an SVG file.",
        "Tracing works best on logos, icons, signatures, stamps and flat illustrations with clear edges and few colors. Photos turn into thousands of small shapes and a very large file. The tracing runs in your browser, so your images aren't uploaded.",
      ],
    },
    steps: [
      { title: "Add your images", body: `Drop up to ${MAX_FILES_PER_BATCH} PNG, JPG or WebP images.` },
      { title: "Pick detail and colors", body: "Simple with 2 to 8 colors suits logos. Detailed with 16 or 32 colors suits illustrations." },
      { title: "Convert and save", body: "Press Convert to SVG, compare the result, then save each SVG or all of them as a zip." },
    ],
    faqs: [
      {
        question: "Is this a real vector SVG?",
        answer:
          "Yes. Every shape is traced into vector paths. Some converters only put the original image inside an SVG file, which doesn't scale or edit like a vector. Pexlora doesn't do that.",
      },
      {
        question: "What images work best?",
        answer:
          "Logos, icons, signatures, stamps, line art and flat illustrations with solid colors. For a black and white signature or stamp, choose 2 colors.",
      },
      {
        question: "Can I convert a photo to SVG?",
        answer:
          "You can, but the result is made of thousands of shapes and looks like a painting. Photos are better kept as JPG or WebP.",
      },
      {
        question: "Is metadata removed?",
        answer: "Yes. The SVG contains only the traced shapes. No EXIF, GPS or software tags are written into it.",
      },
      inBrowser,
      dailyLimit,
    ],
    relatedGuides: ["remove-exif-data", "remove-office-metadata", "remove-pdf-metadata", "ai-image-cleaner"],
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
      hinglishFaqs.formPhoto,
      inBrowser,
      dailyLimit,
    ],
    relatedGuides: ["remove-exif-data", "remove-gps-from-photo", "remove-location-from-iphone-photos", "exif-viewer"],
  },
  "crop-image": {
    intro: {
      heading: "Crop images to the exact shape you need",
      paragraphs: [
        "Profile pictures want a square, feed posts look best at 4:5, stories and Reels need 9:16 and video thumbnails 16:9. Pick the shape, choose whether to keep the top, the centre or the bottom of the picture, and crop a whole batch in one go.",
        "Cropping runs in your browser, so your photos aren't uploaded. JPG stays JPG, PNG stays PNG and WebP stays WebP, iPhone HEIC photos come out as JPG, and EXIF and GPS data are left out of the cropped copy.",
      ],
    },
    steps: [
      { title: "Add your images", body: `Pick up to ${MAX_FILES_PER_BATCH} JPG, PNG, WebP or HEIC images.` },
      { title: "Choose the shape", body: "Pick an aspect ratio and which part of the picture to keep. The preview shows the crop." },
      { title: "Crop and save", body: "Every image is cropped the same way and ready to download." },
    ],
    faqs: [
      {
        question: "Can I crop to a custom size in pixels?",
        answer: "This tool crops to a shape. To get an exact pixel size afterwards, send the cropped images to the Image Resizer.",
      },
      {
        question: "Does cropping lower the quality?",
        answer: "No pixels are scaled, only trimmed. PNG is saved losslessly and JPG and WebP at a high quality setting.",
      },
      inBrowser,
      dailyLimit,
    ],
    relatedGuides: ["remove-exif-data", "remove-gps-from-photo", "remove-ai-info-label-instagram", "photo-location-finder"],
  },
  "change-dpi": {
    intro: {
      heading: "Change the DPI of a photo without changing the photo",
      paragraphs: [
        "Online forms, print shops and some offices ask for images at 200 or 300 DPI. DPI (dots per inch) is a number stored inside the file that tells printers how big to print it. Your phone usually saves 72 or 96, even when the photo has plenty of pixels.",
        "This tool rewrites only that number. The pixels aren't touched, so JPG and PNG images keep their exact quality and file size stays almost the same. WebP and HEIC can't store a DPI value, so they're saved as JPG. Everything runs in your browser, and EXIF and GPS data are left out of the new copy.",
      ],
    },
    steps: [
      { title: "Add your images", body: `Pick up to ${MAX_FILES_PER_BATCH} JPG, PNG, WebP or HEIC images.` },
      { title: "Pick the DPI", body: "Choose 300, 200 or another preset, or type any value." },
      { title: "Save", body: "Every image gets the new DPI and is ready to download or upload." },
    ],
    faqs: [
      {
        question: "Does changing DPI make my image sharper?",
        answer:
          "No. DPI only changes how large the image prints. Sharpness depends on the pixel size. A 600 × 800 pixel photo at 300 DPI prints at 2 × 2.67 inches; at 72 DPI the same pixels print much larger.",
      },
      {
        question: "Will the file size change?",
        answer: "Barely. JPG and PNG images keep every pixel, so the size changes only by the few bytes of metadata removed or added.",
      },
      {
        question: "How do I check the DPI after saving?",
        answer:
          "On Windows, right-click the file, choose Properties and open Details. On a Mac, open it in Preview and choose Tools, then Show Inspector. Both read the new DPI.",
      },
      {
        question: "The form also asks for a pixel size or KB limit. What should I use?",
        answer: "Use the Photo & Signature Resizer for the pixel size and KB range first, then set the DPI here.",
      },
      inBrowser,
      dailyLimit,
    ],
    relatedGuides: ["remove-exif-data", "remove-gps-from-photo", "exif-viewer", "remove-location-from-iphone-photos"],
  },
  "rotate-image": {
    intro: {
      heading: "Turn sideways photos the right way up",
      paragraphs: [
        "A photo that looks fine on your phone can show up sideways once it's uploaded to a form or opened on a computer. Phones often save the picture as it came off the sensor and only add a note saying which way is up, and many websites ignore that note.",
        "This tool turns the actual pixels by 90°, 180° or 270° and can mirror them horizontally or vertically, so the image is upright everywhere. It runs in your browser, keeps JPG, PNG and WebP in their format, saves iPhone HEIC photos as JPG, and leaves EXIF and GPS data out of the new copy.",
      ],
    },
    steps: [
      { title: "Add your images", body: `Pick up to ${MAX_FILES_PER_BATCH} JPG, PNG, WebP or HEIC images.` },
      { title: "Pick the turn", body: "Choose the rotation, a flip, or both. The preview shows the result." },
      { title: "Save", body: "Every image is turned the same way and ready to download." },
    ],
    faqs: [
      {
        question: "Why does my photo look upright on my phone but sideways online?",
        answer:
          "Your phone stored a rotation note (EXIF orientation) instead of turning the pixels. Sites that ignore the note show the raw picture. Rotating here turns the pixels, so the image looks the same everywhere.",
      },
      {
        question: "Does rotating lower the quality?",
        answer: "PNG is saved losslessly. JPG and WebP are saved again at a high quality setting, so the difference isn't visible.",
      },
      {
        question: "How do I un-mirror a selfie?",
        answer: "Choose None for rotation and Horizontal for flip. Front cameras often save a mirrored picture.",
      },
      inBrowser,
      dailyLimit,
    ],
    relatedGuides: ["remove-exif-data", "remove-location-from-iphone-photos", "remove-gps-from-photo", "exif-viewer"],
  },
  "shape-image": {
    intro: {
      heading: "Round corners or cut your image into a shape",
      paragraphs: [
        "Round the corners of a screenshot or product photo, or crop a picture into a circle for a profile photo, a heart for a card, a star, a hexagon or an arch. The outside of the shape can be transparent, so the image sits cleanly on any background, or white for sites that don't accept transparency.",
        "Rounded keeps the whole image. The other shapes use the centre square, so put your subject in the middle first with Crop Image if needed. Everything runs in your browser, and EXIF and GPS data are left out of the result.",
      ],
    },
    steps: [
      { title: "Add your images", body: `Pick up to ${MAX_FILES_PER_BATCH} JPG, PNG, WebP or HEIC images.` },
      { title: "Pick a shape", body: "Choose the shape and background. The preview shows the first image." },
      { title: "Save", body: "Transparent shapes are saved as PNG, white backgrounds as JPG." },
    ],
    faqs: [
      {
        question: "How do I make a round profile picture?",
        answer: "Pick Circle and Transparent. You get a PNG with the corners cut away, ready to upload or place on a slide.",
      },
      {
        question: "Why is my image white around the shape?",
        answer: "You picked the White background, which saves a JPG. Choose Transparent for a PNG with see-through corners.",
      },
      {
        question: "Can I choose which part of the image is used?",
        answer: "Shapes use the centre. To keep another part, crop the image to a square with Crop Image first, then shape it here.",
      },
      inBrowser,
      dailyLimit,
    ],
    relatedGuides: ["remove-exif-data", "remove-gps-from-photo", "remove-ai-info-label-instagram", "exif-viewer"],
  },
  "image-palette": {
    intro: {
      heading: "Find the colours in any image",
      paragraphs: [
        "Drop a photo, logo, screenshot or design and get its main colours as hex codes, from the most used to the least. Tap a colour to copy it, or copy them all at once for your CSS, slides or brand guide.",
        "Make Palette saves a card with the image and every hex code, handy for sharing a mood board or a brand's colours. Colours are read in your browser, so your images aren't uploaded.",
      ],
    },
    steps: [
      { title: "Add an image", body: "Drop a JPG, PNG, WebP or HEIC image. The palette of the first image appears right away." },
      { title: "Pick how many colours", body: "Choose 5 for the main colours, 8 for a balanced set or 12 for detail." },
      { title: "Copy or save", body: "Tap a swatch to copy its hex code, or save a palette card for each image." },
    ],
    faqs: [
      {
        question: "How are the colours picked?",
        answer:
          "The image is scaled down and its pixels are grouped into the number of colours you choose (median cut). Each colour is the average of its group, sorted by how much of the image it covers.",
      },
      {
        question: "Why doesn't a small detail show up?",
        answer: "Colours that cover only a tiny part of the image are merged with nearby ones. Choose 12 colours to see more of them.",
      },
      inBrowser,
      dailyLimit,
    ],
    relatedGuides: ["exif-viewer", "remove-exif-data", "remove-gps-from-photo", "remove-ai-info-label-instagram"],
  },
  "passport-photo": {
    intro: {
      heading: "Print passport photos at home or at a photo shop",
      paragraphs: [
        "Turn one photo into a full sheet of passport photos. Pick 35 × 45 mm for Indian, UK and most European passports and visas, 2 × 2 inches for US passports and OCI, or stamp size for forms, then print the sheet on 4 × 6 inch photo paper or A4.",
        "The photo is centre-cropped to the passport shape and repeated as many times as fit, with light grey lines to cut along. The sheet is built in your browser at 300 DPI, so your photo isn't uploaded.",
      ],
    },
    steps: [
      { title: "Add your photo", body: "Use a front-facing photo on a plain, light background. JPG, PNG, WebP and HEIC work." },
      { title: "Pick size and sheet", body: "Choose the photo size, the paper and how many copies you want." },
      { title: "Print at actual size", body: "Save the JPG or PDF and print it at 100%, not fit to page, then cut along the lines." },
    ],
    faqs: [
      {
        question: "How many photos fit on a 4 × 6 inch print?",
        answer: "Eight 35 × 45 mm photos, two 2 × 2 inch photos, or twenty stamp-size photos. An A4 sheet holds thirty-two 35 × 45 mm photos.",
      },
      {
        question: "Will my photo be accepted?",
        answer:
          "That depends on the photo itself: lighting, background, expression and head size. This tool gets the size and print layout right; check your passport office's rules before you print.",
      },
      {
        question: "JPG or PDF?",
        answer: "Photo shops usually want a JPG. The PDF has the exact paper size built in, so it prints at the right size from a home printer.",
      },
      hinglishFaqs.passport,
      inBrowser,
      dailyLimit,
    ],
    relatedGuides: ["remove-exif-data", "remove-location-from-iphone-photos", "remove-gps-from-photo", "exif-viewer"],
  },
  "organize-pdf": {
    intro: {
      heading: "Delete, reorder and extract PDF pages",
      paragraphs: [
        "Drop a blank page, move an appendix to the end or pull a few pages out of a long document. Every page is shown as a thumbnail: remove pages with one tap, move them with the arrows, or type ranges like 1-3, 7, 10-12.",
        "Everything happens in your browser, so the document never leaves your device. Pages are copied exactly as they are, without re-compressing text or images, and the new PDF doesn't carry the original's author or title information.",
      ],
    },
    steps: [
      { title: "Add a PDF", body: "Choose the PDF you want to organize. Page thumbnails appear on the right." },
      { title: "Remove and reorder", body: "Tap the cross to remove a page and the arrows to move it, or type the page order." },
      { title: "Save the PDF", body: "Get a new PDF with only the pages you kept, in your order." },
    ],
    faqs: [
      {
        question: "How do I extract pages from a PDF?",
        answer: "Type the pages you want, like 2-4, 9, in the page order box. Only those pages are saved, in that order.",
      },
      {
        question: "Can I reverse the page order?",
        answer: "Yes. Tap Reverse, or type a backwards range like 12-1.",
      },
      inBrowser,
      passwordPdf,
      pdfLimit,
    ],
    relatedGuides: pdfGuides,
  },
  "pdf-page-numbers": {
    intro: {
      heading: "Add page numbers to a PDF",
      paragraphs: [
        "Number the pages of a report, thesis or scanned document in seconds. Put the numbers at the top or bottom, left, centre or right, and choose between 1, Page 1, Page 1 of 9 or 1 / 9.",
        "Numbers are added in your browser, so the PDF isn't uploaded. Sideways pages get upright numbers, nothing else on the page is re-compressed, and the saved copy has its document metadata removed.",
      ],
    },
    steps: [
      { title: "Add your PDFs", body: `Choose up to ${MAX_FILES_PER_BATCH} PDF files.` },
      { title: "Pick position and format", body: "Choose where the number goes and how it reads. Skip the cover if you need to." },
      { title: "Save the PDF", body: "Every page gets its number and the new PDF is ready to download." },
    ],
    faqs: [
      {
        question: "Can I leave the first page without a number?",
        answer: "Yes. Tick Skip the first page and the cover stays clean. The other pages keep their real page numbers, so the second page shows 2.",
      },
      {
        question: "Does it work with landscape or rotated pages?",
        answer: "Yes. Numbers are placed on the page as you see it, so they're upright on landscape and rotated pages too.",
      },
      inBrowser,
      passwordPdf,
      pdfLimit,
    ],
    relatedGuides: pdfGuides,
  },
  "pdf-watermark": {
    intro: {
      heading: "Add a text watermark to a PDF",
      paragraphs: [
        "Mark a document as CONFIDENTIAL, DRAFT or a copy for one person before you send it. Type your text, pick a diagonal, straight or tiled layout and choose how strong it looks.",
        "The watermark is added in your browser, so the PDF isn't uploaded. Text and images underneath stay sharp, and the saved copy has its document metadata removed.",
      ],
    },
    steps: [
      { title: "Add your PDFs", body: `Choose up to ${MAX_FILES_PER_BATCH} PDF files.` },
      { title: "Type the watermark", body: "Enter the text and pick the layout and strength." },
      { title: "Save the PDF", body: "The watermark goes on every page and the new PDF is ready to download." },
    ],
    faqs: [
      {
        question: "Can the watermark be removed?",
        answer:
          "A text watermark makes copying and forwarding obvious, but someone with a PDF editor can remove it. Tiled watermarks are the hardest to crop out of screenshots.",
      },
      {
        question: "Can I write the watermark in Hindi or another script?",
        answer: "Not yet. Watermarks use English letters, numbers and common symbols for now.",
      },
      inBrowser,
      passwordPdf,
      pdfLimit,
    ],
    relatedGuides: pdfGuides,
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
    relatedGuides: pdfGuides,
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
    relatedGuides: pdfGuides,
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
    relatedGuides: pdfGuides,
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
      hinglishFaqs.imageToPdf,
      inBrowser,
      dailyLimit,
    ],
    relatedGuides: pdfGuides,
  },
  "pdf-to-jpg": {
    intro: {
      heading: "Save PDF pages as JPG images",
      paragraphs: [
        "Turn the pages of a PDF into JPG or PNG images you can post, send in a chat or drop into a presentation. Tap the pages you need or type a range, pick Screen or Print sharpness, and several pages come together in one ZIP.",
        "Rendering happens in your browser with the same engine Firefox uses to show PDFs, so your document isn't uploaded.",
      ],
    },
    steps: [
      { title: "Add a PDF", body: `Choose up to ${MAX_FILES_PER_BATCH} PDF files.` },
      { title: "Pick pages and sharpness", body: "Tap pages or type a range like 1-3, 7. Screen is 150 DPI, Print is 300 DPI." },
      { title: "Convert and download", body: "One page gives a single image; more pages come as a ZIP." },
    ],
    faqs: [
      {
        question: "What resolution are the images?",
        answer: `Screen renders at ${PDF_IMAGE_DPI.screen} DPI (up to ${PDF_RENDER_MAX_SIDE} pixels on the longest side), Print at ${PDF_IMAGE_DPI.print} DPI (up to ${PDF_PRINT_MAX_SIDE} pixels), which covers A4 and Letter pages at full print sharpness.`,
      },
      inBrowser,
      passwordPdf,
      pdfLimit,
    ],
    relatedGuides: pdfGuides,
  },
  "excel-to-pdf": {
    intro: {
      heading: "Turn spreadsheets into a printable PDF",
      paragraphs: [
        "Send a price list, timetable, marksheet or report as a PDF that looks the same on every phone and prints cleanly. Each visible sheet becomes a table with gridlines and a bold header row, numbers aligned to the right, on A4 or Letter pages.",
        "XLSX, XLS, ODS and CSV files work. Wide sheets switch to landscape and shrink to fit; very wide ones continue on extra pages instead of becoming unreadable. Values are printed the way Excel shows them, including dates and currency formats. Charts, pictures and cell colours aren't carried over.",
      ],
    },
    steps: [
      { title: "Add a spreadsheet", body: `Choose up to ${MAX_FILES_PER_BATCH} XLSX, XLS, ODS or CSV files.` },
      { title: "Pick the page", body: "A4 or Letter, and Auto, Portrait or Landscape." },
      { title: "Convert and download", body: "Get one PDF per spreadsheet, every sheet inside." },
    ],
    faqs: [
      {
        question: "Are hidden sheets included?",
        answer: "No. Only visible sheets are converted, in the order they appear in the workbook. Empty sheets are skipped.",
      },
      {
        question: "Will my formulas show?",
        answer: "The PDF shows each formula's last saved result, the same value you see in the cell, not the formula itself.",
      },
      pdfFonts,
      inBrowser,
      officeLimit,
    ],
    relatedGuides: pdfGuides,
  },
  "pdf-to-excel": {
    intro: {
      heading: "Get PDF tables into Excel",
      paragraphs: [
        "Bank statements, invoices, price lists and reports often arrive as PDFs. This tool reads where each piece of text sits on the page, rebuilds the columns, and saves an Excel sheet you can sort, filter and total. Amounts like 1,25,000.50 become real numbers, while account numbers and IDs with leading zeros stay as text.",
        "Put every page in one sheet or give each page its own. The PDF is read in your browser, so statements and invoices never leave your device.",
      ],
    },
    steps: [
      { title: "Add a PDF", body: `Choose up to ${MAX_FILES_PER_BATCH} PDF files.` },
      { title: "Choose the sheets", body: "One sheet for all pages, or one sheet per page." },
      { title: "Convert and download", body: "Open the XLSX in Excel, Google Sheets or Numbers." },
    ],
    faqs: [
      {
        question: "How accurate are the columns?",
        answer:
          "Tables with clear columns, like statements and invoices, usually come out right. Text that spans several columns, wrapped cells and merged headers can land in the wrong column, so check the sheet before you rely on it.",
      },
      scannedPdf,
      passwordPdf,
      inBrowser,
      pdfLimit,
    ],
    relatedGuides: pdfGuides,
  },
  "word-to-pdf": {
    intro: {
      heading: "Save Word documents as PDF",
      paragraphs: [
        "Turn a resume, letter, assignment or form into a PDF that opens the same everywhere. Headings, bold and italic text, bulleted and numbered lists, tables and pictures are kept, and links are marked.",
        "The DOCX is read and the PDF is built in your browser, so your document isn't uploaded. Because Word isn't doing the layout, exact fonts, columns, headers, footers and page breaks can differ from the original.",
      ],
    },
    steps: [
      { title: "Add a Word file", body: `Choose up to ${MAX_FILES_PER_BATCH} DOCX files.` },
      { title: "Pick the page size", body: "A4 for India and Europe, Letter for the US." },
      { title: "Convert and download", body: "Get one PDF per document." },
    ],
    faqs: [
      {
        question: "Can I convert old .doc files?",
        answer: "Not yet. Open the file in Word or Google Docs, save it as .docx, then add it here.",
      },
      {
        question: "Will it look exactly like Word?",
        answer:
          "The content and structure are kept, but the layout is rebuilt with one standard font, so line breaks and page breaks may fall in different places. Text boxes, headers, footers and footnotes aren't included.",
      },
      pdfFonts,
      inBrowser,
      officeLimit,
    ],
    relatedGuides: pdfGuides,
  },
  "pdf-to-word": {
    intro: {
      heading: "Turn a PDF into an editable Word file",
      paragraphs: [
        "Need to change a PDF you only have as a file? This tool pulls the text out page by page, joins broken lines back into paragraphs, turns large text into Word headings and saves a DOCX you can edit in Word, Google Docs or LibreOffice.",
        "You get the words, not a copy of the design: images, colours and the exact layout aren't recreated. The PDF is read in your browser and never uploaded.",
      ],
    },
    steps: [
      { title: "Add a PDF", body: `Choose up to ${MAX_FILES_PER_BATCH} PDF files.` },
      { title: "Wait a moment", body: "Conversion starts as soon as the file is added." },
      { title: "Download the DOCX", body: "Each PDF page starts on a new Word page." },
    ],
    faqs: [
      {
        question: "Are images and tables kept?",
        answer:
          "Images aren't copied. Table text is kept, with tabs between the columns. For tables you want to calculate with, PDF to Excel gives better results.",
      },
      scannedPdf,
      passwordPdf,
      inBrowser,
      pdfLimit,
    ],
    relatedGuides: pdfGuides,
  },
  "pdf-to-text": {
    intro: {
      heading: "Copy all the text out of a PDF",
      paragraphs: [
        "Get the words from a PDF as a plain TXT file you can paste into an email, a form, a notes app or an AI chat. Lines are kept in reading order, paragraphs are separated, and pages are split by blank lines.",
        "It works in any language the PDF contains as text, because a TXT file has no fonts to worry about. Everything happens in your browser.",
      ],
    },
    steps: [
      { title: "Add a PDF", body: `Choose up to ${MAX_FILES_PER_BATCH} PDF files.` },
      { title: "Wait a moment", body: "Text extraction starts as soon as the file is added." },
      { title: "Download the TXT", body: "Open it in any text editor or check it with View." },
    ],
    faqs: [
      {
        question: "What encoding is the file?",
        answer: "UTF-8, which opens correctly in Notepad, TextEdit, VS Code and every modern app, including Hindi and other scripts.",
      },
      scannedPdf,
      passwordPdf,
      inBrowser,
      pdfLimit,
    ],
    relatedGuides: pdfGuides,
  },
  "csv-to-excel": {
    intro: {
      heading: "Open CSV files in Excel without the mess",
      paragraphs: [
        "Double-clicking a CSV often breaks it: Hindi text turns into symbols, phone numbers lose their leading zero, and 16-digit IDs become 1.23E+15. This converter saves a proper XLSX workbook instead, with numbers as numbers and IDs, PIN codes and phone numbers kept exactly as written.",
        "Commas, semicolons, tabs and pipes are detected automatically, quoted fields with commas or line breaks stay in one cell, and UTF-8 and older Windows encodings are both read. Nothing is uploaded.",
      ],
    },
    steps: [
      { title: "Add a CSV", body: `Choose up to ${MAX_FILES_PER_BATCH} CSV files.` },
      { title: "Wait a moment", body: "Conversion starts as soon as the file is added." },
      { title: "Download the XLSX", body: "Open it in Excel, Google Sheets or Numbers." },
    ],
    faqs: [
      {
        question: "Which values become numbers?",
        answer:
          "Plain numbers like 1250, 1,250.75 or 1,25,000 become numbers you can add up. Values with a leading zero, whole numbers over 11 digits (like Aadhaar or account numbers), currency signs or units stay as text, so nothing gets rounded or shown as 1.23E+11.",
      },
      {
        question: "Are dates converted?",
        answer: "Dates are kept as text exactly as written, so 03/04/2026 never silently swaps day and month. You can format them as dates in Excel afterwards.",
      },
      inBrowser,
      officeLimit,
    ],
    relatedGuides: pdfGuides,
  },
  "excel-to-csv": {
    intro: {
      heading: "Save Excel sheets as CSV",
      paragraphs: [
        "Many banks, payroll portals, marketplaces and databases only accept CSV uploads. This tool saves every visible sheet of an XLSX, XLS or ODS workbook as its own CSV, with values written the way Excel shows them.",
        "Files are UTF-8 with a byte order mark, so Excel, Google Sheets and import tools read Hindi and other scripts correctly. Several sheets come back together in one ZIP. Everything runs in your browser.",
      ],
    },
    steps: [
      { title: "Add a workbook", body: `Choose up to ${MAX_FILES_PER_BATCH} XLSX, XLS or ODS files.` },
      { title: "Wait a moment", body: "Conversion starts as soon as the file is added." },
      { title: "Download the CSV", body: "One sheet gives one CSV; more sheets come as a ZIP." },
    ],
    faqs: [
      {
        question: "Which separator is used?",
        answer: "A comma, with values that contain commas, quotes or line breaks wrapped in quotes, the standard format every importer understands.",
      },
      {
        question: "Are formulas kept?",
        answer: "CSV can't store formulas, so each cell's last saved result is written instead.",
      },
      inBrowser,
      officeLimit,
    ],
    relatedGuides: pdfGuides,
  },
};

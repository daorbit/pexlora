import { BadgeCheck, Bot, Images, Palette } from "lucide-react";
import { AiTagIcon } from "@/components/icons/AiTagIcon";
import { extensions, faqs, removedList } from "@/content/seo-pages/shared";
import type { SeoPage } from "@/content/seo-pages/types";

export const aiPages: SeoPage[] = [
  {
    slug: "ai-image-cleaner",
    category: "ai",
    tool: "remove-metadata",
    kinds: ["image"],
    icon: AiTagIcon,
    name: "AI Image Cleaner",
    title: "AI Image Cleaner: Remove AI Metadata from Images Free Online",
    headline: "AI image cleaner, free and private.",
    description:
      "Clean AI-generated images in one click. Remove C2PA credentials, generator tags, prompts and EXIF from Midjourney, ChatGPT, Gemini, Firefly and Stable Diffusion images.",
    keywords: [
      "ai cleaner",
      "image ai cleaner",
      "ai image cleaner",
      "ai photo cleaner",
      "ai metadata cleaner",
      "clean ai image",
      "ai metadata remover",
      "remove ai metadata from image",
      "remove ai tag from image",
      "remove ai info from photo",
    ],
    intro: {
      heading: "What an AI image cleaner removes",
      paragraphs: [
        "Most AI image tools write hidden data into the files they export. Midjourney and Firefly add XMP fields such as CreatorTool and DigitalSourceType. OpenAI, Adobe, Google and Microsoft attach a signed C2PA Content Credentials manifest. Stable Diffusion interfaces like Automatic1111 and ComfyUI save the full prompt, seed, sampler and workflow inside PNG text chunks.",
        "Pexlora reads all of it first and flags AI-related fields in orange. It then writes a fresh copy of the image without any metadata. Orientation is applied to the pixels, so nothing ends up sideways, and the clean copy is checked again before you download it.",
        "This is a metadata cleaner. It doesn't change pixels, so it can't remove visible watermarks or invisible ones like Google SynthID, and it isn't designed to fool AI detectors.",
      ],
    },
    list: removedList([
      "C2PA Content Credentials manifests",
      "XMP CreatorTool, Credit and DigitalSourceType",
      "IPTC fields that describe AI generation",
      "Stable Diffusion prompts, seeds and ComfyUI workflows",
      "EXIF Software and Artist tags",
      "GPS location and camera details",
    ]),
    faqs: [
      {
        question: "What is an AI image cleaner?",
        answer:
          "A tool that removes the hidden metadata AI generators write into images, such as C2PA credentials, generator names and prompts. The picture itself stays the same.",
      },
      {
        question: "Which AI tools does it work with?",
        answer:
          "Any tool that writes standard metadata: Midjourney, ChatGPT and DALL·E, Gemini and Imagen, Adobe Firefly, Microsoft Designer, Leonardo, Ideogram, Flux, Stable Diffusion, ComfyUI and more.",
      },
      faqs.watermarks,
      faqs.free,
    ],
    related: [
      "remove-midjourney-metadata",
      "remove-chatgpt-image-metadata",
      "remove-stable-diffusion-metadata",
      "remove-c2pa-content-credentials",
      "ai-metadata-checker",
    ],
  },
  {
    slug: "remove-midjourney-metadata",
    category: "ai",
    tool: "remove-metadata",
    kinds: ["image"],
    icon: Palette,
    name: "Midjourney Metadata Remover",
    title: "Remove Midjourney Metadata from Images Free",
    headline: "Remove Midjourney metadata.",
    description:
      "Strip the prompt, user name, job ID, CreatorTool and DigitalSourceType tags from Midjourney images before you post, print or sell them.",
    keywords: [
      "remove midjourney metadata",
      "midjourney metadata remover",
      "midjourney image metadata",
      "midjourney exif",
      "remove prompt from midjourney image",
      "midjourney ai tag remover",
    ],
    intro: {
      heading: "What Midjourney saves in your images",
      paragraphs: [
        "Images downloaded from Midjourney can carry XMP and PNG text fields that name the tool and describe how the image was made. Depending on the version and format, that includes your prompt in a Description field, your Midjourney user name as the Author, a job ID and the IPTC DigitalSourceType value trainedAlgorithmicMedia.",
        "Drop a Midjourney PNG, JPG or WebP below to see exactly what's inside. The cleaner removes every field and gives you a clean copy at the same size and resolution.",
      ],
    },
    list: removedList([
      "Prompt text in the Description field",
      "Your Midjourney user name in Author",
      "Job ID and image GUID",
      "IPTC DigitalSourceType: trainedAlgorithmicMedia",
      "XMP CreatorTool and EXIF Software",
    ]),
    faqs: [
      {
        question: "Does Midjourney add metadata to images?",
        answer:
          "Yes. Downloads can include your prompt, user name, job ID and an IPTC field that marks the image as AI-generated. Drop a file above to see what yours contains.",
      },
      {
        question: "Will removing it lower the quality?",
        answer: "No. The image keeps its dimensions and is re-encoded at high quality. PNGs stay lossless.",
      },
      faqs.batch,
      faqs.imagePrivacy,
    ],
    related: ["ai-image-cleaner", "remove-chatgpt-image-metadata", "remove-stable-diffusion-metadata", "ai-metadata-checker"],
  },
  {
    slug: "remove-chatgpt-image-metadata",
    category: "ai",
    tool: "remove-metadata",
    kinds: ["image"],
    icon: Bot,
    name: "ChatGPT Image Metadata Remover",
    title: "Remove ChatGPT & DALL·E Image Metadata (C2PA) Free",
    headline: "Remove ChatGPT image metadata.",
    description:
      "Images from ChatGPT, DALL·E and the OpenAI API include C2PA Content Credentials. Remove them, along with any other metadata, in one click.",
    keywords: [
      "remove chatgpt image metadata",
      "chatgpt image metadata",
      "dall-e metadata remover",
      "remove c2pa from chatgpt image",
      "openai image metadata",
      "gpt image metadata remover",
    ],
    intro: {
      heading: "How OpenAI marks generated images",
      paragraphs: [
        "OpenAI adds C2PA Content Credentials to images created with ChatGPT, DALL·E 3 and its image API. The manifest is a signed record stating that the image was generated by OpenAI, and apps that support Content Credentials can read it.",
        "Pexlora detects the manifest, shows it in the report and writes a clean copy without it. Fields added later by editing apps, such as EXIF or XMP, are removed as well.",
      ],
    },
    list: removedList([
      "C2PA manifest naming OpenAI as the generator",
      "JUMBF boxes that store the manifest",
      "IPTC digital source type",
      "XMP and EXIF added by editing apps",
    ]),
    faqs: [
      {
        question: "Does ChatGPT add metadata to images?",
        answer: "Yes. OpenAI attaches C2PA Content Credentials to generated images. Drop a file above to check yours.",
      },
      {
        question: "Is the C2PA manifest removed completely?",
        answer:
          "Yes. The image is written again without it and then re-checked. The result shows Clean when nothing is left.",
      },
      faqs.watermarks,
      faqs.imagePrivacy,
    ],
    related: ["ai-image-cleaner", "remove-c2pa-content-credentials", "remove-gemini-image-metadata", "ai-metadata-checker"],
  },
  {
    slug: "remove-gemini-image-metadata",
    category: "ai",
    tool: "remove-metadata",
    kinds: ["image"],
    icon: Images,
    name: "Gemini Image Metadata Remover",
    title: "Remove Gemini & Google Imagen Image Metadata Free",
    headline: "Remove Gemini image metadata.",
    description:
      "Clear the IPTC and C2PA metadata Google adds to images from Gemini, Imagen and AI editing tools in Google Photos.",
    keywords: [
      "remove gemini image metadata",
      "gemini ai image metadata",
      "google imagen metadata",
      "remove ai metadata google photos",
      "magic editor metadata remover",
    ],
    intro: {
      heading: "Two ways Google labels AI images",
      paragraphs: [
        "Google marks AI images in two layers. The first is metadata: the IPTC DigitalSourceType field and, on some products, C2PA Content Credentials. The second is SynthID, an invisible watermark mixed into the pixels.",
        "Pexlora removes the metadata layer and shows you exactly what was there. SynthID stays in the image because it isn't metadata, and we don't claim otherwise.",
      ],
    },
    list: removedList([
      "IPTC DigitalSourceType and AI credit fields",
      "C2PA Content Credentials",
      "XMP edit history",
      "EXIF device details and GPS from edited photos",
    ]),
    faqs: [
      faqs.watermarks,
      {
        question: "Does Google Photos add AI metadata to edited photos?",
        answer:
          "Photos edited with AI tools such as Magic Editor can be tagged in their metadata. Drop the photo above to see what it carries.",
      },
      faqs.imagePrivacy,
    ],
    related: ["ai-image-cleaner", "remove-chatgpt-image-metadata", "remove-c2pa-content-credentials", "remove-gps-from-photo"],
  },
  {
    slug: "remove-stable-diffusion-metadata",
    category: "ai",
    tool: "remove-metadata",
    kinds: ["image"],
    icon: AiTagIcon,
    name: "Stable Diffusion Metadata Remover",
    title: "Remove Stable Diffusion & ComfyUI Prompt Metadata from PNG",
    headline: "Remove Stable Diffusion prompts from PNG.",
    description:
      "Automatic1111, Forge, ComfyUI and InvokeAI save your full prompt, seed and workflow inside every PNG. Strip it before you share.",
    keywords: [
      "remove stable diffusion metadata",
      "remove prompt from png",
      "remove comfyui workflow from image",
      "automatic1111 metadata remover",
      "png parameters remover",
      "remove png text chunks",
    ],
    intro: {
      heading: "Your prompt travels with the PNG",
      paragraphs: [
        "Stable Diffusion interfaces write generation data into PNG text chunks. Automatic1111 and Forge store a parameters chunk with your positive and negative prompt, steps, sampler, CFG scale, seed and model hash. ComfyUI saves the entire node graph as workflow and prompt JSON, which anyone can drag back into ComfyUI to rebuild your setup.",
        "The cleaner removes every text chunk and all other metadata, so the PNG keeps only its pixels.",
      ],
    },
    list: removedList([
      "parameters chunk with prompts and settings",
      "Negative prompt, seed, sampler and CFG scale",
      "Model and VAE hashes",
      "ComfyUI workflow and prompt JSON",
      "InvokeAI and NovelAI generation data",
    ]),
    faqs: [
      {
        question: "Can someone see my prompt from a Stable Diffusion image?",
        answer:
          "Yes, if the PNG still has its text chunks. Tools like PNG Info read them instantly. Drop your image above to check.",
      },
      {
        question: "Does cleaning keep transparency?",
        answer: "Yes. PNGs stay lossless PNGs with the same alpha channel.",
      },
      faqs.batch,
    ],
    related: ["ai-image-cleaner", "remove-midjourney-metadata", "ai-metadata-checker", "exif-viewer"],
  },
  {
    slug: "remove-c2pa-content-credentials",
    category: "ai",
    tool: "remove-metadata",
    kinds: ["image", "pdf", "video"],
    icon: BadgeCheck,
    name: "C2PA Remover",
    title: "C2PA Remover: Remove Content Credentials from Images, PDF & Video",
    headline: "Remove C2PA Content Credentials.",
    description:
      "Strip C2PA manifests from images, PDFs and videos made with OpenAI, Adobe, Google, Microsoft and other tools that sign their output.",
    keywords: [
      "c2pa remover",
      "remove c2pa",
      "remove content credentials",
      "c2pa metadata remover",
      "content credentials remover",
      "remove c2pa from video",
    ],
    intro: {
      heading: "Where C2PA hides inside a file",
      paragraphs: [
        "C2PA, from the Coalition for Content Provenance and Authenticity, defines Content Credentials: a signed manifest stored inside the file. In JPEG it lives in APP11 JUMBF segments, in PNG in a caBX chunk, in MP4 and MOV in a uuid box, and in PDF as an associated file.",
        "Pexlora finds the manifest in each of these places and removes it. In videos the box is blanked out in place, so the streams are never re-encoded and quality stays exactly the same.",
      ],
    },
    list: removedList([
      "JUMBF manifest stores in JPEG",
      "caBX chunks in PNG",
      "C2PA uuid boxes in MP4 and MOV",
      "C2PA associated files in PDF",
      "Ingredients, actions and signatures inside the manifest",
    ]),
    faqs: [
      {
        question: "What is C2PA?",
        answer:
          "An open standard for recording where content came from. Tools sign a manifest describing how a file was created and edited, then embed it in the file.",
      },
      {
        question: "How do I know the manifest is gone?",
        answer: "Every file is inspected again after cleaning. Clean means no C2PA data or other tags were found.",
      },
      {
        question: "Which formats are supported?",
        answer: `Images (${extensions(["image"])}), PDF, and video (${extensions(["video"])}).`,
      },
    ],
    related: ["remove-chatgpt-image-metadata", "ai-metadata-checker", "remove-video-metadata", "remove-pdf-metadata"],
  },
];

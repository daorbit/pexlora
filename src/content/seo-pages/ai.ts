import { BadgeCheck, Bot, Brush, Images, LayoutTemplate, Palette, Tags } from "lucide-react";
import { AiTagIcon } from "@/components/icons/AiTagIcon";
import { extensions, faqs, imageQualityAnswer, removedList } from "@/content/seo-pages/shared";
import type { SeoPage } from "@/content/seo-pages/types";

export const aiPages: SeoPage[] = [
  {
    slug: "ai-image-cleaner",
    category: "ai",
    tool: "remove-metadata",
    kinds: ["image"],
    icon: AiTagIcon,
    name: "AI Image Cleaner",
    title: "AI Image Cleaner: Remove AI Metadata from Images",
    headline: "Clean AI metadata from images.",
    description:
      "Remove C2PA credentials, generator tags, prompts and EXIF from Midjourney, ChatGPT, Gemini, Firefly and Stable Diffusion images in one click.",
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
    related: ["remove-midjourney-metadata", "remove-stable-diffusion-metadata", "remove-grok-image-metadata"],
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
        answer: imageQualityAnswer,
      },
      faqs.batch,
      faqs.imagePrivacy,
    ],
    related: ["ai-image-cleaner", "remove-stable-diffusion-metadata", "remove-chatgpt-image-metadata"],
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
    related: ["ai-image-cleaner", "remove-gemini-image-metadata", "remove-grok-image-metadata"],
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
    related: ["remove-chatgpt-image-metadata", "remove-grok-image-metadata", "remove-c2pa-content-credentials"],
  },
  {
    slug: "remove-stable-diffusion-metadata",
    category: "ai",
    tool: "remove-metadata",
    kinds: ["image"],
    icon: AiTagIcon,
    name: "Stable Diffusion Metadata Remover",
    title: "Remove Stable Diffusion & ComfyUI Prompts from PNG",
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
    related: ["remove-midjourney-metadata", "ai-image-cleaner", "ai-metadata-checker"],
  },
  {
    slug: "remove-c2pa-content-credentials",
    category: "ai",
    tool: "remove-metadata",
    kinds: ["image", "pdf", "video"],
    icon: BadgeCheck,
    name: "C2PA Remover",
    title: "C2PA Remover: Remove Content Credentials Online",
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
    related: ["remove-adobe-firefly-metadata", "remove-microsoft-designer-metadata", "remove-ai-info-label-instagram"],
  },
  {
    slug: "remove-adobe-firefly-metadata",
    category: "ai",
    tool: "remove-metadata",
    kinds: ["image"],
    icon: Brush,
    name: "Adobe Firefly Metadata Remover",
    title: "Remove Adobe Firefly & Generative Fill Metadata Free",
    headline: "Remove Adobe Firefly metadata.",
    description:
      "Strip the Content Credentials and XMP AI tags that Adobe Firefly and Photoshop Generative Fill add to images, before you post or send them.",
    keywords: [
      "remove adobe firefly metadata",
      "firefly metadata remover",
      "remove content credentials photoshop",
      "generative fill made with ai",
      "remove ai metadata photoshop",
      "adobe firefly c2pa",
      "remove firefly content credentials",
    ],
    intro: {
      heading: "What Adobe writes into Firefly images",
      paragraphs: [
        "Adobe attaches Content Credentials, a signed C2PA manifest, to images made with Firefly and to Photoshop files edited with Generative Fill or Generative Expand. The manifest names the app and lists the AI actions used, and XMP fields such as DigitalSourceType mark the file as AI-generated or AI-edited.",
        "That is why a real photo touched up with Generative Fill can show up as AI on social platforms. Drop the file below to see exactly what Adobe recorded, then download a clean copy with none of it.",
        "If Content Credentials were also published to Adobe's cloud, that online copy isn't affected by cleaning the file.",
      ],
    },
    list: removedList([
      "C2PA Content Credentials manifest",
      "Generative Fill and Expand action records",
      "XMP CreatorTool naming Firefly or Photoshop",
      "IPTC DigitalSourceType values for AI content",
      "Editing history and document IDs",
    ]),
    faqs: [
      {
        question: "Why does my Photoshop edit show as made with AI?",
        answer:
          "Generative Fill and Generative Expand add Content Credentials that say AI was used. Platforms that read C2PA show an AI label from that data, even for small edits.",
      },
      {
        question: "Does Firefly add metadata to every image?",
        answer:
          "Adobe adds Content Credentials to Firefly output and to Generative Fill edits. Drop a file above to see what yours contains.",
      },
      faqs.watermarks,
    ],
    related: ["remove-c2pa-content-credentials", "remove-ai-info-label-instagram", "remove-microsoft-designer-metadata"],
  },
  {
    slug: "remove-grok-image-metadata",
    category: "ai",
    tool: "remove-metadata",
    kinds: ["image"],
    icon: Bot,
    name: "Grok Image Metadata Remover",
    title: "Remove Grok AI Image Metadata Free",
    headline: "Remove Grok image metadata.",
    description:
      "Check images made with Grok for EXIF and XMP fields that name the generator, then download a clean copy without them.",
    keywords: [
      "remove grok image metadata",
      "grok metadata remover",
      "grok ai image exif",
      "xai aurora image metadata",
      "remove ai tag grok image",
    ],
    intro: {
      heading: "What Grok images can carry",
      paragraphs: [
        "Images generated with Grok can include EXIF or XMP fields that identify the generator, along with creation dates and software names. What's written can change between versions, so the only reliable way to know is to look at the file.",
        "Drop a Grok image below. The report shows every field it finds, AI-related ones in orange, and the cleaned copy keeps the picture but none of the metadata.",
      ],
    },
    list: removedList([
      "EXIF and XMP fields naming the generator",
      "Software and creator tool tags",
      "Creation and modification dates",
      "IPTC fields describing AI generation",
      "Any C2PA manifest, if present",
    ]),
    faqs: [
      {
        question: "Does Grok add metadata to images?",
        answer: "Grok images can carry generator fields in EXIF or XMP. Drop a file above to see exactly what yours contains.",
      },
      faqs.watermarks,
    ],
    related: ["ai-image-cleaner", "remove-chatgpt-image-metadata", "remove-gemini-image-metadata"],
  },
  {
    slug: "remove-microsoft-designer-metadata",
    category: "ai",
    tool: "remove-metadata",
    kinds: ["image"],
    icon: LayoutTemplate,
    name: "Microsoft Designer & Copilot Metadata Remover",
    title: "Remove Copilot, Designer & Bing Image Creator Metadata",
    headline: "Remove Microsoft AI image metadata.",
    description:
      "Strip the Content Credentials that Microsoft Copilot, Designer and Bing Image Creator attach to generated images.",
    keywords: [
      "remove copilot image metadata",
      "microsoft designer metadata remover",
      "bing image creator metadata",
      "remove content credentials bing",
      "copilot image c2pa",
    ],
    intro: {
      heading: "Microsoft signs its AI images",
      paragraphs: [
        "Microsoft adds Content Credentials, a signed C2PA manifest, to images created with Bing Image Creator, Microsoft Designer and Copilot. The manifest records that the image was generated with AI and which service made it.",
        "Drop an image below to see the manifest and any other tags, then download a clean copy at the same size and resolution.",
      ],
    },
    list: removedList([
      "C2PA Content Credentials manifest",
      "Generator and service names",
      "AI generation actions and signatures",
      "XMP and IPTC fields describing AI content",
      "Creation dates and software tags",
    ]),
    faqs: [
      {
        question: "Do Copilot and Designer images have Content Credentials?",
        answer:
          "Microsoft attaches Content Credentials to images from Bing Image Creator, Designer and Copilot. Drop a file above to see the manifest.",
      },
      faqs.watermarks,
    ],
    related: ["remove-c2pa-content-credentials", "remove-adobe-firefly-metadata", "remove-chatgpt-image-metadata"],
  },
  {
    slug: "remove-ai-info-label-instagram",
    category: "ai",
    tool: "remove-metadata",
    kinds: ["image", "video"],
    icon: Tags,
    name: "Instagram AI Info Label Guide",
    title: "Instagram “AI Info” Label: Why It Appears & the Fix",
    headline: "Why Instagram says “AI info”.",
    description:
      "See which hidden fields make Instagram, Facebook and Threads add an AI info label, and remove them from photos that were only edited.",
    keywords: [
      "remove ai info instagram",
      "instagram made with ai label",
      "remove made with ai label",
      "instagram ai info remove",
      "facebook ai info label",
      "why does instagram say ai info",
      "remove ai label from photo",
    ],
    intro: {
      heading: "What triggers the label",
      paragraphs: [
        "Meta reads industry metadata standards such as C2PA Content Credentials and the IPTC DigitalSourceType field when you upload. If a file says AI was used, Instagram, Facebook and Threads add an AI info label. That includes real photos where a single object was removed with Photoshop Generative Fill.",
        "Drop your photo or video below to see whether it carries those fields. If the file was only edited, you can remove the metadata and upload the clean copy. Meta may also use other signals, so cleaning a file doesn't guarantee the label won't appear.",
        "If a post really is AI-generated, label it. Meta asks people to disclose photorealistic AI content, and hiding it can break platform rules.",
      ],
    },
    list: removedList([
      "C2PA Content Credentials that say AI was used",
      "IPTC DigitalSourceType: trainedAlgorithmicMedia",
      "XMP CreatorTool naming an AI app",
      "Generative Fill and Expand records",
      "Software tags from AI editors",
    ]),
    faqs: [
      {
        question: "Why is my real photo labelled AI info?",
        answer:
          "Usually because an editing tool wrote AI metadata into the file, for example Photoshop Generative Fill. Instagram reads that data on upload and adds the label.",
      },
      {
        question: "Will removing metadata remove the label?",
        answer:
          "It removes the signals stored in the file. Meta may use other signals, and cleaning doesn't change posts that are already published, so clean the file before uploading.",
      },
      {
        question: "Should I hide that a post is AI-generated?",
        answer:
          "No. If the content is AI-generated, use Instagram's AI label. Cleaning is for photos that were only edited and are labelled wrongly.",
      },
    ],
    related: ["remove-adobe-firefly-metadata", "remove-c2pa-content-credentials", "ai-metadata-checker"],
  },
];

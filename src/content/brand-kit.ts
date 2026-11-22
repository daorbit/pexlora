import { AI_NAME, brandAssets, brandColors } from "@/config/brand";
import { company } from "@/config/company";
import { siteConfig } from "@/config/site";

const { name } = siteConfig;

export type BrandAsset = { id: string; label: string; note: string; src: string; fileName: string; surface: "light" | "dark" };

export type BrandColor = { id: string; name: string; hex: string; usage: string };

export const brandKitCopy = {
  metaTitle: `${name} Brand Kit: Logo and Colours`,
  description: `Download the ${name} logo and app icons, and get the brand colours, fonts and naming rules for articles, reviews and partner pages.`,
  eyebrow: "Brand kit",
  title: `The ${name}`,
  highlight: "brand kit.",
  lead: `Logos, colours and naming rules for writing about ${name}. Use them as they are, and ask us if you need something that isn't here.`,
  logosTitle: "Logos and icons",
  download: "Download",
  downloadLabel: (label: string) => `Download ${label}`,
  colorsTitle: "Colours",
  copyHex: "Copy",
  typeTitle: "Type",
  type: [
    { label: "Text and headlines", value: "SF Pro on Apple devices, Inter everywhere else", mono: false },
    { label: "Data and file details", value: "Geist Mono", mono: true },
  ],
  doTitle: "Do",
  dos: [
    `Write the name as "${name}", with a capital P only.`,
    `Call our AI "${AI_NAME}".`,
    "Keep space around the mark at least half its width.",
    "Use the dark icon on dark backgrounds and the light icon on light ones.",
  ],
  dontTitle: "Don't",
  donts: [
    `Write "PexLora", "PEXLORA" or "${name} AI".`,
    "Recolour, stretch, rotate or add effects to the mark.",
    "Put the mark on neon lime, where it disappears.",
    `Suggest that ${name} endorses your product without asking us.`,
  ],
  contactTitle: "Press and partnerships",
  contactBody: `Writing about ${name} or need a different format? Email us and a person will reply.`,
  contactEmail: company.email,
};

export const brandAssetsList: BrandAsset[] = [
  { id: "mark", label: "Logo mark", note: "Transparent PNG", src: brandAssets.mark, fileName: "pexlora-mark.png", surface: "light" },
  { id: "icon-light", label: "App icon, light", note: "512 × 512 PNG", src: brandAssets.iconLight, fileName: "pexlora-icon-light.png", surface: "light" },
  { id: "icon-dark", label: "App icon, dark", note: "512 × 512 PNG", src: brandAssets.iconDark, fileName: "pexlora-icon-dark.png", surface: "dark" },
  { id: "orbit-light", label: `${AI_NAME} mascot`, note: "For light backgrounds", src: brandAssets.orbitLight, fileName: "orbit-ai-light.webp", surface: "light" },
  { id: "orbit-dark", label: `${AI_NAME} mascot, dark`, note: "For dark backgrounds", src: brandAssets.orbitDark, fileName: "orbit-ai-dark.webp", surface: "dark" },
];

export const brandColorList: BrandColor[] = [
  { id: "lime", name: "Neon lime", hex: brandColors.lime, usage: "Buttons, highlights and badges. A fill, never text on light backgrounds." },
  { id: "ink", name: "Ink", hex: brandColors.ink, usage: "Text and dark buttons." },
  { id: "pearl", name: "Pearl", hex: brandColors.pearl, usage: "Page background." },
  { id: "white", name: "White", hex: brandColors.white, usage: "Cards and panels." },
  { id: "night", name: "Night", hex: brandColors.night, usage: "Dark mode background." },
  { id: "moss", name: "Moss", hex: brandColors.moss, usage: "Readable green text on light backgrounds." },
];

import { AI_NAME } from "@/config/brand";
import { routes, siteConfig } from "@/config/site";

export type ChangeType = "new" | "improved" | "fixed";

export type Change = { type: ChangeType; text: string; href?: string };

export type ChangelogEntry = { date: string; title: string; changes: Change[] };

export const changelogCopy = {
  metaTitle: `What's New in ${siteConfig.name}`,
  description: `Every new tool, improvement and fix in ${siteConfig.name}, newest first, with links to try each one for images, PDFs and documents.`,
  eyebrow: "Changelog",
  title: "What's new in",
  highlight: `${siteConfig.name}.`,
  lead: "New tools, improvements and fixes, newest first. We ship small updates most days.",
  types: { new: "New", improved: "Improved", fixed: "Fixed" } satisfies Record<ChangeType, string>,
  open: "Open",
  badge: "New",
  badgeLabel: "See what's new",
};

export const changelog: ChangelogEntry[] = [
  {
    date: "2026-11-26",
    title: "All reviews in one place",
    changes: [
      { type: "new", text: "A reviews page with every comment people chose to share and the average rating.", href: routes.reviews },
    ],
  },
  {
    date: "2026-11-24",
    title: "Unzip has its own page",
    changes: [
      { type: "new", text: "Unzip Files: search the files inside a ZIP and preview them before you save.", href: routes.unzipFiles },
      { type: "improved", text: "Every tool, converter and guide has a new icon that shows what it does." },
      { type: "new", text: "Rate any tool after you use it, with an optional comment." },
      { type: "improved", text: "ZIP Files now uses the full-width workspace, with the same steps as the other tools.", href: routes.zipFiles },
    ],
  },
  {
    date: "2026-11-23",
    title: "Better size guides",
    changes: [
      { type: "new", text: "Tested results on compress-to-size pages, showing how photos look at each KB limit.", href: `${routes.compressTo}/30kb` },
      { type: "new", text: "A size table on every form preset, and a longer guide for PAN photos.", href: `${routes.formPhoto}/pan-card-photo` },
      { type: "improved", text: "The Instagram AI info guide now covers posts, Reels and Stories.", href: "/remove-ai-info-label-instagram" },
    ],
  },
  {
    date: "2026-11-22",
    title: "Clearer sign-in and better link previews",
    changes: [
      { type: "new", text: "A page that shows where every tool processes your files.", href: routes.fileHandling },
      { type: "new", text: "Links to a tool page now show that tool's own preview image when shared." },
      { type: "new", text: "A brand kit with logo downloads and colours.", href: routes.brand },
      { type: "improved", text: "Sign in and Create Account are one screen each, with Google at the top.", href: routes.signIn },
      { type: "improved", text: "Smaller, easier-to-read headlines on the homepage and tool pages." },
    ],
  },
  {
    date: "2026-11-20",
    title: "About page and new exam presets",
    changes: [
      { type: "new", text: `An About page explaining who builds ${siteConfig.name} and how it is funded.`, href: routes.about },
      { type: "new", text: "Photo and signature presets for JEE, CUET and SBI forms.", href: routes.formPhoto },
      { type: "improved", text: "Answers in Hindi and Hinglish on the photo tools." },
    ],
  },
  {
    date: "2026-11-19",
    title: "Google Drive, Dropbox and links",
    changes: [
      { type: "new", text: "Add files from Google Drive and save results back to Drive." },
      { type: "new", text: "Add files from Dropbox or from a link." },
      { type: "improved", text: "Every tool now shows three clear steps: add files, choose settings, save." },
      { type: "fixed", text: "Long text in the sign-out confirmation no longer overflows on small phones." },
    ],
  },
  {
    date: "2026-11-18",
    title: "AI writing tools and everyday utilities",
    changes: [
      { type: "improved", text: "The AI Text Detector now marks the sentences that read as AI.", href: routes.aiDetector },
      { type: "new", text: `The AI Humanizer is back, with a live human score from ${AI_NAME}.`, href: routes.humanizer },
      { type: "new", text: "Change DPI for print without touching the pixels.", href: routes.changeDpi },
      { type: "new", text: "Link Cleaner, Remove Personal Info from text, and ZIP files.", href: routes.linkCleaner },
      { type: "new", text: "Word, Excel and CSV converters with tables and formatting.", href: routes.wordToPdf },
      { type: "new", text: "The blog, with guides on metadata and privacy.", href: routes.blog },
      { type: "improved", text: "A redesigned image converter and PDF tools." },
    ],
  },
  {
    date: "2026-11-17",
    title: "PDF tools, HEIC and SVG",
    changes: [
      { type: "new", text: "Merge, split, rotate and convert PDFs in your browser.", href: routes.mergePdf },
      { type: "new", text: "HEIC to JPG for iPhone photos.", href: routes.heicToJpg },
      { type: "new", text: "SVG to PNG, and PNG to SVG tracing for logos and icons.", href: routes.svgToImage },
      { type: "new", text: "Crop images to square, 4:5, 9:16 and more.", href: routes.cropImage },
      { type: "new", text: "Photo and signature resizer for exam and job forms.", href: routes.formPhoto },
      { type: "improved", text: "Preview every result, including PDFs and ZIPs, before you save it." },
    ],
  },
  {
    date: "2026-11-16",
    title: `${siteConfig.name} launches`,
    changes: [
      { type: "new", text: "Remove metadata, view metadata and edit EXIF in one place.", href: routes.removeMetadata },
      { type: "new", text: "Compress, resize and convert images, including compress to an exact size.", href: routes.compress },
      { type: "new", text: "Pro passes: a one-time payment for higher limits, no subscription.", href: routes.pricing },
    ],
  },
];

export const latestChangelogDate = changelog[0].date;

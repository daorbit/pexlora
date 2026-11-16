import { compressTargetPath, compressTargets } from "@/config/compress-targets";
import { conversionPath, popularConversions } from "@/config/conversions";
import { toolPageCopy } from "@/content/tool-pages";
import { routes } from "@/config/site";
import { textTools } from "@/config/text-tools";
import { workspaceTools } from "@/config/tools";
import { seoPagePath, seoPagesIn, type SeoPage } from "@/content/seo-pages";

const pageLinks = (pages: SeoPage[]) => pages.map((page) => ({ label: page.name, href: seoPagePath(page) }));

export const footerCopy = {
  title: "Your files. Your privacy.",
  description: "Remove hidden metadata, then compress, resize and convert your images. Nothing is ever stored.",
  legal: "We remove metadata only, not pixel watermarks.",
};

export const footerColumns = [
  {
    title: "Tools",
    links: [...workspaceTools, ...textTools].map((tool) => ({ label: tool.name, href: tool.href })),
  },
  {
    title: "Convert images",
    links: popularConversions.map((conversion) => ({ label: conversion.name, href: conversionPath(conversion.slug) })),
  },
  {
    title: "Compress to size",
    links: compressTargets.map((target) => ({
      label: toolPageCopy.compressTargetName(target.label),
      href: compressTargetPath(target.slug),
    })),
  },
  { title: "AI cleaners", links: pageLinks(seoPagesIn("ai")) },
  {
    title: "Privacy and file types",
    links: pageLinks([...seoPagesIn("viewers"), ...seoPagesIn("privacy"), ...seoPagesIn("formats")]),
  },
  {
    title: "Product",
    links: [
      { label: "All tools", href: "/#all-tools" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Privacy", href: "/#privacy" },
      { label: "What is metadata?", href: "/#learn" },
      { label: "FAQ", href: routes.faq },
      { label: "Contact", href: routes.contact },
      { label: "Dashboard", href: routes.dashboard },
    ],
  },
];

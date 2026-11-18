import { company } from "@/config/company";
import { compressTargetPath, featuredCompressTargets } from "@/config/compress-targets";
import { legalDocuments } from "@/content/legal";
import { conversionPath, popularConversions } from "@/config/conversions";
import { toolPageCopy } from "@/content/tool-pages";
import { routes } from "@/config/site";
import { compressTargetHubKey, hubItemsIn, type HubCategory } from "@/config/tool-hub";
import { seoPagePath, seoPagesIn, type SeoPage } from "@/content/seo-pages";

const pageLinks = (pages: SeoPage[]) => pages.map((page) => ({ label: page.name, href: seoPagePath(page) }));

const footerToolGroups: { title: string; category: HubCategory }[] = [
  { title: "Metadata tools", category: "metadata" },
  { title: "Image tools", category: "image" },
  { title: "PDF tools", category: "pdf" },
  { title: "AI tools", category: "ai" },
];

export const footerCopy = {
  title: "Your files. Your privacy.",
  description: "Remove hidden metadata, then compress, resize and convert your images. We don't keep your files.",
  legal: "We remove metadata only, not pixel watermarks.",
  productOf: `A product of ${company.legalName}`,
  darkMode: "Dark mode",
};

export const footerLegalLinks = legalDocuments.map((doc) => ({ label: doc.title, href: doc.path }));

export const footerColumns = [
  ...footerToolGroups.map(({ title, category }) => ({
    title,
    links: hubItemsIn(category)
      .filter((item) => item.key !== compressTargetHubKey)
      .map((item) => ({ label: item.name, href: item.href })),
  })),
  {
    title: "Convert images",
    links: popularConversions.map((conversion) => ({ label: conversion.name, href: conversionPath(conversion.slug) })),
  },
  {
    title: "Compress to size",
    links: featuredCompressTargets.map((target) => ({
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
      { label: "How we handle files", href: "/#privacy" },
      { label: "What is metadata?", href: "/#learn" },
      { label: "Pricing", href: routes.pricing },
      { label: "Blog", href: routes.blog },
      { label: "FAQ", href: routes.faq },
      { label: "Contact", href: routes.contact },
    ],
  },
];

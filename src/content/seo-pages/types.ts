import type { FileKind } from "@/config/file-formats";
import type { IconComponent } from "@/components/icons/types";

export type SeoCategory = "ai" | "privacy" | "formats" | "viewers";

export type SeoFaq = { question: string; answer: string };

export type ToolStep = { title: string; body: string };

export type GuideBlock = { heading: string; paragraphs: string[] };

export type GuideContent = {
  eyebrow: string;
  title: string;
  blocks: GuideBlock[];
  sources?: { label: string; href: string }[];
};

export type SeoPage = {
  slug: string;
  category: SeoCategory;
  tool: "remove-metadata" | "view-metadata";
  kinds: FileKind[];
  icon: IconComponent;
  name: string;
  title: string;
  headline: string;
  description: string;
  keywords: string[];
  intro: GuideBlock;
  guide?: GuideContent;
  list: { eyebrow: string; title: string; items: string[] };
  faqs: SeoFaq[];
  related: string[];
};

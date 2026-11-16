import type { FileKind } from "@/config/file-formats";
import type { IconComponent } from "@/components/icons/types";

export type SeoCategory = "ai" | "privacy" | "formats" | "viewers";

export type SeoFaq = { question: string; answer: string };

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
  intro: { heading: string; paragraphs: string[] };
  list: { eyebrow: string; title: string; items: string[] };
  faqs: SeoFaq[];
  related: string[];
};

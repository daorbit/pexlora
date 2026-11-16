import { AI_NAME } from "@/config/brand";
import { routes } from "@/config/site";
import { AiDetectorIcon } from "@/components/icons/AiDetectorIcon";
import type { IconComponent } from "@/components/icons/types";

export type TextToolSlug = "ai-text-detector";

export type TextTool = {
  slug: TextToolSlug;
  href: string;
  dashboardHref: string;
  name: string;
  shortName: string;
  headline: string;
  description: string;
  icon: IconComponent;
};

export const textTools: TextTool[] = [
  {
    slug: "ai-text-detector",
    href: routes.aiDetector,
    dashboardHref: routes.dashboardAiDetector,
    icon: AiDetectorIcon,
    name: "AI Text Detector",
    shortName: "AI Detector",
    headline: "Check if text was written by AI.",
    description:
      `Paste any text and ${AI_NAME} gives an AI likelihood score, the phrases that sound machine-written and the writing signals behind the estimate.`,
  },
];

export const textToolIconSrc = (slug: TextToolSlug) => `/icons/tools/${slug}.svg`;

export const textHandoffKey = (slug: TextToolSlug) => `text:${slug}`;

export function getTextTool(slug: TextToolSlug) {
  return textTools.find((tool) => tool.slug === slug)!;
}

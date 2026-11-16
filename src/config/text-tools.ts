import { AI_NAME } from "@/config/brand";
import { routes } from "@/config/site";
import { AiDetectorIcon } from "@/components/icons/AiDetectorIcon";
import { HumanizerIcon } from "@/components/icons/HumanizerIcon";
import type { IconComponent } from "@/components/icons/types";

export type TextToolSlug = "ai-text-detector" | "ai-humanizer";

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
  {
    slug: "ai-humanizer",
    href: routes.humanizer,
    dashboardHref: routes.dashboardHumanizer,
    icon: HumanizerIcon,
    name: "AI Humanizer",
    shortName: "Humanize Text",
    headline: "Make AI text sound natural and human.",
    description:
      `${AI_NAME} rewrites stiff, AI-sounding text into clear, natural writing in your chosen tone. Facts, names and meaning stay the same.`,
  },
];

export const textToolIconSrc = (slug: TextToolSlug) => `/icons/tools/${slug}.svg`;

export const textHandoffKey = (slug: TextToolSlug) => `text:${slug}`;

export function getTextTool(slug: TextToolSlug) {
  return textTools.find((tool) => tool.slug === slug)!;
}

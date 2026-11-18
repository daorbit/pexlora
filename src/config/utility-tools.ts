import { FileArchive, Link2Off, ShieldCheck, type LucideIcon } from "lucide-react";
import { routes } from "@/config/site";

export type UtilityToolSlug = "link-cleaner" | "remove-personal-info" | "zip-files";

export type UtilityTool = {
  slug: UtilityToolSlug;
  href: string;
  dashboardHref: string;
  name: string;
  shortName: string;
  headline: string;
  description: string;
  icon: LucideIcon;
};

export const utilityTools: UtilityTool[] = [
  {
    slug: "link-cleaner",
    href: routes.linkCleaner,
    dashboardHref: routes.dashboardLinkCleaner,
    icon: Link2Off,
    name: "Link Cleaner",
    shortName: "Link Cleaner",
    headline: "Remove tracking from links before you share them.",
    description:
      "Paste links or a whole message and strip utm tags, fbclid, gclid, YouTube and Spotify share codes and Amazon referral tags, and unwrap Google and Facebook redirects. Runs in your browser.",
  },
  {
    slug: "remove-personal-info",
    href: routes.removePersonalInfo,
    dashboardHref: routes.dashboardRemovePersonalInfo,
    icon: ShieldCheck,
    name: "Remove Personal Info from Text",
    shortName: "Hide Personal Info",
    headline: "Hide emails, phone numbers and IDs in text before you share it.",
    description:
      "Mask emails, phone numbers, card numbers, Aadhaar, PAN, UPI IDs and IP addresses in chats, logs or documents before you paste them anywhere. Runs in your browser, nothing is uploaded.",
  },
  {
    slug: "zip-files",
    href: routes.zipFiles,
    dashboardHref: routes.dashboardZipFiles,
    icon: FileArchive,
    name: "ZIP & Unzip Files",
    shortName: "ZIP Files",
    headline: "Make a ZIP or open one, right in your browser.",
    description:
      "Put any files into one ZIP, or open a ZIP and save the files inside, without installing anything. Everything stays on your device.",
  },
];

export const utilityToolIconSrc = (slug: UtilityToolSlug) => `/icons/tools/${slug}.svg`;

export function getUtilityTool(slug: UtilityToolSlug) {
  return utilityTools.find((tool) => tool.slug === slug)!;
}

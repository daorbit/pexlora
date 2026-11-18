import { UtilityToolPage } from "@/components/utility/UtilityToolPage";
import { utilityToolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = utilityToolMetadata("link-cleaner");

export default function LinkCleanerPage() {
  return <UtilityToolPage slug="link-cleaner" />;
}

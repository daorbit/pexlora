import type { Metadata } from "next";
import { getUtilityTool } from "@/config/utility-tools";
import { UtilityWorkspace } from "@/components/utility/UtilityWorkspace";

export const metadata: Metadata = { title: getUtilityTool("link-cleaner").name };

export default function LinkCleanerDashboardPage() {
  return <UtilityWorkspace slug="link-cleaner" />;
}

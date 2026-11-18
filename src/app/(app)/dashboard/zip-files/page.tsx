import type { Metadata } from "next";
import { getUtilityTool } from "@/config/utility-tools";
import { UtilityWorkspace } from "@/components/utility/UtilityWorkspace";

export const metadata: Metadata = { title: getUtilityTool("zip-files").name };

export default function ZipFilesDashboardPage() {
  return <UtilityWorkspace slug="zip-files" />;
}

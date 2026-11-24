import type { Metadata } from "next";
import { getUtilityTool } from "@/config/utility-tools";
import { UtilityWorkspace } from "@/components/utility/UtilityWorkspace";

export const metadata: Metadata = { title: getUtilityTool("unzip-files").name };

export default function UnzipFilesDashboardPage() {
  return <UtilityWorkspace slug="unzip-files" />;
}

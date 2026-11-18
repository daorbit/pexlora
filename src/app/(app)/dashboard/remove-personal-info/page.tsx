import type { Metadata } from "next";
import { getUtilityTool } from "@/config/utility-tools";
import { UtilityWorkspace } from "@/components/utility/UtilityWorkspace";

export const metadata: Metadata = { title: getUtilityTool("remove-personal-info").name };

export default function RemovePersonalInfoDashboardPage() {
  return <UtilityWorkspace slug="remove-personal-info" />;
}

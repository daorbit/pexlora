import type { Metadata } from "next";
import { getWorkspaceTool } from "@/config/tools";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: getWorkspaceTool("passport-photo").name };

export default function PassportPhotoDashboardPage() {
  return <ToolModule slug="passport-photo" />;
}

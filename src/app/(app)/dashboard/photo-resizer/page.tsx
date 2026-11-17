import type { Metadata } from "next";
import { getWorkspaceTool } from "@/config/tools";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: getWorkspaceTool("form-photo").name };

export default function FormPhotoDashboardPage() {
  return <ToolModule slug="form-photo" />;
}

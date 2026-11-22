import type { Metadata } from "next";
import { getWorkspaceTool } from "@/config/tools";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: getWorkspaceTool("sign-pdf").name };

export default function SignPdfDashboardPage() {
  return <ToolModule slug="sign-pdf" />;
}

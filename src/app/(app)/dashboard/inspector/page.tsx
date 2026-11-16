import type { Metadata } from "next";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: "Inspector" };

export default function InspectorPage() {
  return <ToolModule slug="view-metadata" />;
}

import type { Metadata } from "next";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: "Cleaner" };

export default function CleanerPage() {
  return <ToolModule slug="remove-metadata" />;
}

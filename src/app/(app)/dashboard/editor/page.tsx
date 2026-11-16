import type { Metadata } from "next";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: "Editor" };

export default function EditorPage() {
  return <ToolModule slug="edit-metadata" />;
}

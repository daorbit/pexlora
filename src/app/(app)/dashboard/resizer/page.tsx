import type { Metadata } from "next";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: "Resizer" };

export default function ResizerPage() {
  return <ToolModule slug="resize-image" />;
}

import type { Metadata } from "next";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: "Compressor" };

export default function CompressorPage() {
  return <ToolModule slug="compress-image" />;
}

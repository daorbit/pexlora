import type { Metadata } from "next";
import { ToolModule } from "@/components/dashboard/ToolModule";

export const metadata: Metadata = { title: "Converter" };

export default function ConverterPage() {
  return <ToolModule slug="convert-format" />;
}

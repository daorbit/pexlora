import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formPresets, getFormPreset } from "@/config/form-presets";
import { formPresetMetadata } from "@/lib/seo/tool-metadata";
import { FormPresetPage } from "@/components/tools/FormPresetPage";

type FormPresetRouteProps = { params: Promise<{ preset: string }> };

export const instant = false;

export function generateStaticParams() {
  return formPresets.map((preset) => ({ preset: preset.slug }));
}

export async function generateMetadata({ params }: FormPresetRouteProps): Promise<Metadata> {
  const preset = getFormPreset((await params).preset);
  return preset ? formPresetMetadata(preset) : {};
}

export default async function FormPresetRoute({ params }: FormPresetRouteProps) {
  const preset = getFormPreset((await params).preset);
  if (!preset) notFound();
  return <FormPresetPage preset={preset} />;
}

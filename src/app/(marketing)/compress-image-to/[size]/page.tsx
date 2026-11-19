import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compressTargets, getCompressTarget } from "@/config/compress-targets";
import { compressTargetMetadata } from "@/lib/seo/tool-metadata";
import { CompressTargetPage } from "@/components/tools/CompressTargetPage";

type CompressTargetRouteProps = { params: Promise<{ size: string }> };

export const instant = false;

export function generateStaticParams() {
  return compressTargets.map((target) => ({ size: target.slug }));
}

export async function generateMetadata({ params }: CompressTargetRouteProps): Promise<Metadata> {
  const target = getCompressTarget((await params).size);
  return target ? compressTargetMetadata(target) : {};
}

export default async function CompressTargetRoute({ params }: CompressTargetRouteProps) {
  const target = getCompressTarget((await params).size);
  if (!target) notFound();
  return <CompressTargetPage target={target} />;
}

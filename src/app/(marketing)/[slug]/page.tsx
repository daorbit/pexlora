import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSeoPage, seoPages } from "@/content/seo-pages";
import { seoPageMetadata } from "@/lib/seo/tool-metadata";
import { SeoToolPage } from "@/components/tools/SeoToolPage";

type SeoRouteProps = { params: Promise<{ slug: string }> };

export const instant = false;

export function generateStaticParams() {
  return seoPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: SeoRouteProps): Promise<Metadata> {
  const page = getSeoPage((await params).slug);
  return page ? seoPageMetadata(page) : {};
}

export default async function SeoRoute({ params }: SeoRouteProps) {
  const page = getSeoPage((await params).slug);
  if (!page) notFound();
  return <SeoToolPage page={page} />;
}

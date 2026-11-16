import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getSeoPage, seoPages } from "@/content/seo-pages";
import { seoPageMetadata } from "@/lib/seo/tool-metadata";
import { PageIntroSkeleton } from "@/components/tools/PageIntroSkeleton";
import { SeoToolPage } from "@/components/tools/SeoToolPage";

type SeoRouteProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return seoPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: SeoRouteProps): Promise<Metadata> {
  const page = getSeoPage((await params).slug);
  return page ? seoPageMetadata(page) : {};
}

async function SeoContent({ params }: SeoRouteProps) {
  const page = getSeoPage((await params).slug);
  if (!page) notFound();
  return <SeoToolPage page={page} />;
}

export default function SeoRoute({ params }: SeoRouteProps) {
  return (
    <Suspense fallback={<PageIntroSkeleton />}>
      <SeoContent params={params} />
    </Suspense>
  );
}

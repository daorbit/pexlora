import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { compressTargets, getCompressTarget } from "@/config/compress-targets";
import { compressTargetMetadata } from "@/lib/seo/tool-metadata";
import { CompressTargetPage } from "@/components/tools/CompressTargetPage";
import { PageIntroSkeleton } from "@/components/tools/PageIntroSkeleton";

type CompressTargetRouteProps = { params: Promise<{ size: string }> };

export function generateStaticParams() {
  return compressTargets.map((target) => ({ size: target.slug }));
}

export async function generateMetadata({ params }: CompressTargetRouteProps): Promise<Metadata> {
  const target = getCompressTarget((await params).size);
  return target ? compressTargetMetadata(target) : {};
}

async function CompressTargetContent({ params }: CompressTargetRouteProps) {
  const target = getCompressTarget((await params).size);
  if (!target) notFound();
  return <CompressTargetPage target={target} />;
}

export default function CompressTargetRoute({ params }: CompressTargetRouteProps) {
  return (
    <Suspense fallback={<PageIntroSkeleton />}>
      <CompressTargetContent params={params} />
    </Suspense>
  );
}

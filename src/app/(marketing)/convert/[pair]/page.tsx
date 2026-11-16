import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { conversions, getConversion } from "@/config/conversions";
import { conversionMetadata } from "@/lib/seo/tool-metadata";
import { ConversionPage } from "@/components/tools/ConversionPage";
import { PageIntroSkeleton } from "@/components/tools/PageIntroSkeleton";

type ConversionRouteProps = { params: Promise<{ pair: string }> };

export function generateStaticParams() {
  return conversions.map((conversion) => ({ pair: conversion.slug }));
}

export async function generateMetadata({ params }: ConversionRouteProps): Promise<Metadata> {
  const conversion = getConversion((await params).pair);
  return conversion ? conversionMetadata(conversion) : {};
}

async function ConversionContent({ params }: ConversionRouteProps) {
  const conversion = getConversion((await params).pair);
  if (!conversion) notFound();
  return <ConversionPage conversion={conversion} />;
}

export default function ConversionRoute({ params }: ConversionRouteProps) {
  return (
    <Suspense fallback={<PageIntroSkeleton />}>
      <ConversionContent params={params} />
    </Suspense>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { conversions, getConversion } from "@/config/conversions";
import { conversionMetadata } from "@/lib/seo/tool-metadata";
import { ConversionPage } from "@/components/tools/ConversionPage";

type ConversionRouteProps = { params: Promise<{ pair: string }> };

export const instant = false;

export function generateStaticParams() {
  return conversions.map((conversion) => ({ pair: conversion.slug }));
}

export async function generateMetadata({ params }: ConversionRouteProps): Promise<Metadata> {
  const conversion = getConversion((await params).pair);
  return conversion ? conversionMetadata(conversion) : {};
}

export default async function ConversionRoute({ params }: ConversionRouteProps) {
  const conversion = getConversion((await params).pair);
  if (!conversion) notFound();
  return <ConversionPage conversion={conversion} />;
}

import type { Metadata } from "next";
import { routes } from "@/config/site";
import { brandKitCopy } from "@/content/brand-kit";
import { pageMetadata } from "@/lib/seo/page-metadata";
import { BrandKitPage } from "@/components/brand/BrandKitPage";

export const metadata: Metadata = pageMetadata(brandKitCopy.metaTitle, brandKitCopy.description, routes.brand);

export default function Brand() {
  return <BrandKitPage />;
}

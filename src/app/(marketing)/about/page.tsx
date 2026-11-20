import type { Metadata } from "next";
import { routes } from "@/config/site";
import { aboutCopy } from "@/content/about";
import { pageMetadata } from "@/lib/seo/page-metadata";
import { aboutStructuredData } from "@/lib/seo/structured-data";
import { AboutPage } from "@/components/about/AboutPage";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = pageMetadata(aboutCopy.metaTitle, aboutCopy.description, routes.about);

export default function About() {
  return (
    <>
      <JsonLd data={aboutStructuredData(aboutCopy.description)} />
      <AboutPage />
    </>
  );
}

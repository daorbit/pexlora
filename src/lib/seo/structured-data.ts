import "server-only";
import { brandAssets } from "@/config/brand";
import { seo } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { faqs } from "@/content/landing";
import { seoPagePath, type SeoPage } from "@/content/seo-pages";
import { env } from "@/lib/env";

type Faq = { question: string; answer: string };

const freeOffer = { "@type": "Offer", price: "0", priceCurrency: "USD" };

function organizationId() {
  return `${env.appUrl}/#organization`;
}

function faqPage(items: Faq[], id: string) {
  return {
    "@type": "FAQPage",
    "@id": id,
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function seoPageStructuredData(page: SeoPage) {
  const url = `${env.appUrl}${seoPagePath(page)}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${url}#app`,
        name: page.name,
        url,
        description: page.description,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires a modern web browser",
        featureList: page.list.items,
        keywords: page.keywords.join(", "),
        offers: freeOffer,
        publisher: { "@id": organizationId() },
      },
      faqPage(page.faqs, `${url}#faq`),
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: siteConfig.name, item: env.appUrl },
          { "@type": "ListItem", position: 2, name: page.name, item: url },
        ],
      },
    ],
  };
}

export function homeStructuredData() {
  const url = env.appUrl;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId(),
        name: siteConfig.name,
        url,
        logo: `${url}${brandAssets.iconLight}`,
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        name: siteConfig.name,
        url,
        publisher: { "@id": organizationId() },
      },
      {
        "@type": "WebApplication",
        "@id": `${url}/#app`,
        name: siteConfig.name,
        url,
        description: seo.description,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires a modern web browser",
        offers: freeOffer,
        publisher: { "@id": organizationId() },
      },
      faqPage(faqs, `${url}/#faq`),
    ],
  };
}

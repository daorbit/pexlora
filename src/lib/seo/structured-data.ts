import "server-only";
import { brandAssets } from "@/config/brand";
import { seo } from "@/config/seo";
import { PLAN_IDS, PLANS } from "@/config/plans";
import { routes, siteConfig } from "@/config/site";
import { faqs } from "@/content/landing";
import { planCopy, pricingCopy } from "@/content/pricing";
import { env } from "@/lib/env";

type Faq = { question: string; answer: string };

type ToolSchemaInput = {
  name: string;
  path: string;
  description: string;
  faqs: Faq[];
  features?: string[];
  category?: "UtilitiesApplication" | "MultimediaApplication";
};

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

export function toolStructuredData({
  name,
  path,
  description,
  faqs: items,
  features,
  category = "UtilitiesApplication",
}: ToolSchemaInput) {
  const url = `${env.appUrl}${path}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${url}#app`,
        name,
        url,
        description,
        applicationCategory: category,
        operatingSystem: "Any",
        browserRequirements: "Requires a modern web browser",
        ...(features?.length ? { featureList: features } : {}),
        offers: freeOffer,
        publisher: { "@id": organizationId() },
      },
      ...(items.length ? [faqPage(items, `${url}#faq`)] : []),
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

export function pricingStructuredData() {
  const url = `${env.appUrl}${routes.pricing}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${url}#product`,
        name: `${siteConfig.name} Pro`,
        description: pricingCopy.description,
        brand: { "@id": organizationId() },
        offers: PLAN_IDS.map((id) => ({
          "@type": "Offer",
          name: planCopy[id].name,
          price: (PLANS[id].amountPaise / 100).toFixed(2),
          priceCurrency: PLANS[id].currency,
          availability: "https://schema.org/InStock",
          url,
        })),
      },
      faqPage(pricingCopy.faqs, `${url}#faq`),
    ],
  };
}

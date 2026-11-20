import "server-only";
import { blogPostPath } from "@/config/blog";
import { company } from "@/config/company";
import { brandAssets } from "@/config/brand";
import { PLAN_IDS, PLANS } from "@/config/plans";
import { routes, siteConfig } from "@/config/site";
import { workspaceTools } from "@/config/tools";
import { factsCopy } from "@/content/facts";
import { faqs } from "@/content/landing";
import { planCopy, pricingCopy } from "@/content/pricing";
import { env } from "@/lib/env";
import type { PostMeta } from "@/lib/blog/types";

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
  const homeUrl = `${url}/`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId(),
        name: siteConfig.name,
        alternateName: siteConfig.alternateNames,
        url: homeUrl,
        logo: {
          "@type": "ImageObject",
          url: `${url}${brandAssets.iconLight}`,
          width: 512,
          height: 512,
        },
        parentOrganization: {
          "@type": "Organization",
          name: company.legalName,
          sameAs: [company.linkedin, company.instagram],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        name: siteConfig.name,
        alternateName: siteConfig.alternateNames,
        url: homeUrl,
        inLanguage: "en",
        publisher: { "@id": organizationId() },
      },
      {
        "@type": "WebApplication",
        "@id": `${url}/#app`,
        name: siteConfig.name,
        url,
        description: factsCopy.summary,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires a modern web browser",
        isAccessibleForFree: true,
        featureList: workspaceTools.map((tool) => tool.name),
        offers: freeOffer,
        publisher: { "@id": organizationId() },
      },
      faqPage(faqs, `${url}/#faq`),
    ],
  };
}

function blogPosting(post: PostMeta) {
  const url = `${env.appUrl}${blogPostPath(post.slug)}`;
  return {
    "@type": "BlogPosting",
    "@id": `${url}#post`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated,
    url,
    mainEntityOfPage: url,
    ...(post.cover.url ? { image: post.cover.url } : {}),
    author: { "@type": "Person", name: post.author.name },
    publisher: { "@id": organizationId() },
    keywords: post.tags.join(", "),
    inLanguage: "en",
  };
}

export function blogStructuredData(posts: PostMeta[]) {
  const url = `${env.appUrl}${routes.blog}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${url}#blog`,
        name: `${siteConfig.name} Blog`,
        url,
        publisher: { "@id": organizationId() },
        inLanguage: "en",
        blogPost: posts.map(blogPosting),
      },
    ],
  };
}

export function blogPostStructuredData(post: PostMeta) {
  return { "@context": "https://schema.org", "@graph": [blogPosting(post)] };
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

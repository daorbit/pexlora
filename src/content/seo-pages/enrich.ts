import { faqs, supportedFormatsFaq, trustLine } from "@/content/seo-pages/shared";
import type { SeoFaq, SeoPage } from "@/content/seo-pages/types";

const MAX_FAQS = 8;

type CommonFaq = { faq: SeoFaq; covered: RegExp };

function privacyFaq(page: SeoPage): SeoFaq {
  const hasImages = page.kinds.includes("image");
  const onlyImages = page.kinds.every((kind) => kind === "image");
  if (onlyImages) return faqs.imagePrivacy;
  return hasImages ? faqs.mixedPrivacy : faqs.onDevice;
}

function qualityFaq(page: SeoPage): SeoFaq {
  return page.kinds.includes("image") ? faqs.imageQuality : faqs.inPlaceQuality;
}

function commonFaqs(page: SeoPage): CommonFaq[] {
  const shared: CommonFaq[] = [
    { faq: supportedFormatsFaq(page.kinds), covered: /which (files|formats)/i },
    { faq: privacyFaq(page), covered: /(uploaded|stored)/i },
  ];

  if (page.tool === "view-metadata") {
    return [...shared, { faq: faqs.inspectFree, covered: /daily limit/i }, { faq: faqs.free, covered: /free/i }];
  }

  return [
    { faq: faqs.verify, covered: /(know|check).*(gone|removed|worked)/i },
    { faq: qualityFaq(page), covered: /quality/i },
    ...shared,
    { faq: faqs.free, covered: /free/i },
    { faq: faqs.desktopAlternative, covered: /without a website|exiftool/i },
  ];
}

export function enrichSeoPage(page: SeoPage): SeoPage {
  const extra = commonFaqs(page)
    .filter(({ covered }) => !page.faqs.some((existing) => covered.test(existing.question)))
    .map(({ faq }) => faq);

  const description = /no sign-up/i.test(page.description)
    ? page.description
    : `${page.description} ${trustLine(page.kinds)}`;

  return { ...page, description, faqs: [...page.faqs, ...extra].slice(0, MAX_FAQS) };
}

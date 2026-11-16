import { routes, toolAnchor } from "@/config/site";
import { workspaceTools } from "@/config/tools";
import { seoPagePath, seoPagesIn, type SeoPage } from "@/content/seo-pages";

const pageLinks = (pages: SeoPage[]) => pages.map((page) => ({ label: page.name, href: seoPagePath(page) }));

export const footerCopy = {
  title: "Your files. Your privacy.",
  description: "Remove hidden metadata from photos, documents, audio and video before you share them. Nothing is ever stored.",
  legal: "We remove metadata only, not pixel watermarks.",
};

export const footerColumns = [
  {
    title: "Tools",
    links: [
      ...workspaceTools.map((tool) => ({ label: tool.name, href: toolAnchor(tool.slug) })),
      ...pageLinks(seoPagesIn("viewers")),
    ],
  },
  { title: "AI cleaners", links: pageLinks(seoPagesIn("ai")) },
  { title: "Privacy and file types", links: pageLinks([...seoPagesIn("privacy"), ...seoPagesIn("formats")]) },
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "Privacy", href: "/#privacy" },
      { label: "What is metadata?", href: "/#learn" },
      { label: "FAQ", href: routes.faq },
      { label: "Contact", href: routes.contact },
      { label: "Sign up", href: routes.signUp },
      { label: "Dashboard", href: routes.dashboard },
    ],
  },
];

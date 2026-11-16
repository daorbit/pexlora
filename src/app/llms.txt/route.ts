import { seo } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { workspaceTools } from "@/config/tools";
import { seoCategories, seoPagePath, seoPagesIn } from "@/content/seo-pages";
import { env } from "@/lib/env";

export function GET() {
  const base = env.appUrl;
  const sections = seoCategories.map((category) => {
    const links = seoPagesIn(category.id).map((page) => `- [${page.name}](${base}${seoPagePath(page)}): ${page.description}`);
    return `## ${category.title}\n\n${links.join("\n")}`;
  });
  const tools = workspaceTools.map((tool) => `- [${tool.name}](${base}${tool.href}): ${tool.description}`);

  const body = [
    `# ${siteConfig.name}`,
    `> ${seo.description}`,
    "We remove metadata only. Pexlora does not remove pixel watermarks such as SynthID and does not claim to beat AI detectors.",
    `## Tools\n\n${tools.join("\n")}`,
    ...sections,
  ].join("\n\n");

  return new Response(`${body}\n`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

import "server-only";
import { compressTargetPath, compressTargets } from "@/config/compress-targets";
import { conversionPath, conversions } from "@/config/conversions";
import { formPresetPath, formPresets } from "@/config/form-presets";
import { imagePdfPath, imagePdfVariants } from "@/config/image-pdf-variants";
import { seo } from "@/config/seo";
import { routes, siteConfig } from "@/config/site";
import { textTools } from "@/config/text-tools";
import { workspaceTools } from "@/config/tools";
import { utilityTools } from "@/config/utility-tools";
import { factsCopy } from "@/content/facts";
import { legalDocuments } from "@/content/legal";
import { llmsCopy } from "@/content/llms";
import { formPresetCopy, toolPageCopy } from "@/content/tool-pages";
import { seoCategories, seoPagePath, seoPagesIn } from "@/content/seo-pages";
import { env } from "@/lib/env";

type LlmsLink = { name: string; path: string; description?: string };

function linkLine({ name, path, description }: LlmsLink) {
  return `- [${name}](${env.appUrl}${path})${description ? `: ${description}` : ""}`;
}

function section(title: string, links: LlmsLink[]) {
  return `## ${title}\n\n${links.map(linkLine).join("\n")}`;
}

export function buildLlmsText() {
  const tools = [...workspaceTools, ...textTools, ...utilityTools].map((tool) => ({ name: tool.name, path: tool.href, description: tool.description }));

  const conversionLinks = [
    ...conversions.map((conversion) => ({
      name: conversion.name,
      path: conversionPath(conversion.slug),
      description: toolPageCopy.conversionDescription(conversion.from, conversion.toLabel),
    })),
    ...imagePdfVariants.map((variant) => ({
      name: toolPageCopy.imagePdfName(variant.from),
      path: imagePdfPath(variant.slug),
      description: toolPageCopy.imagePdfDescription(variant.from),
    })),
  ];

  const compressLinks = compressTargets.map((target) => ({
    name: toolPageCopy.compressTargetName(target.label),
    path: compressTargetPath(target.slug),
  }));

  const presetLinks = formPresets.map((preset) => ({
    name: formPresetCopy.title(preset),
    path: formPresetPath(preset.slug),
  }));

  const guideSections = seoCategories.map((category) =>
    section(
      `${llmsCopy.guides}: ${category.title}`,
      seoPagesIn(category.id).map((page) => ({ name: page.name, path: seoPagePath(page), description: page.description })),
    ),
  );

  const pages = [
    { name: llmsCopy.pricing, path: routes.pricing },
    { name: llmsCopy.blog, path: routes.blog },
    { name: llmsCopy.about, path: routes.about },
    { name: llmsCopy.contact, path: routes.contact },
    { name: llmsCopy.fileHandling, path: routes.fileHandling },
    { name: llmsCopy.changelog, path: routes.changelog },
    { name: llmsCopy.brand, path: routes.brand },
    ...legalDocuments.map((doc) => ({ name: doc.title, path: doc.path })),
  ];

  return [
    `# ${siteConfig.name}`,
    `> ${seo.description}`,
    factsCopy.summary,
    `## ${llmsCopy.factsTitle}\n\n${[...factsCopy.rows.map((row) => `${row.label}: ${row.value}`), ...llmsCopy.facts].map((fact) => `- ${fact}`).join("\n")}`,
    section(llmsCopy.tools, tools),
    section(llmsCopy.conversions, conversionLinks),
    section(llmsCopy.compressTargets, compressLinks),
    section(llmsCopy.formPresets, presetLinks),
    ...guideSections,
    section(llmsCopy.pages, pages),
  ].join("\n\n");
}

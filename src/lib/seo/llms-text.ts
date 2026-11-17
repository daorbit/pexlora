import "server-only";
import { compressTargetPath, compressTargets } from "@/config/compress-targets";
import { conversionPath, conversions } from "@/config/conversions";
import { formPresetPath, formPresets } from "@/config/form-presets";
import { seo } from "@/config/seo";
import { routes, siteConfig } from "@/config/site";
import { textTools } from "@/config/text-tools";
import { workspaceTools } from "@/config/tools";
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
  const tools = [...workspaceTools, ...textTools].map((tool) => ({ name: tool.name, path: tool.href, description: tool.description }));

  const conversionLinks = conversions.map((conversion) => ({
    name: conversion.name,
    path: conversionPath(conversion.slug),
    description: toolPageCopy.conversionDescription(conversion.from, conversion.toLabel),
  }));

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
    { name: llmsCopy.contact, path: routes.contact },
    ...legalDocuments.map((doc) => ({ name: doc.title, path: doc.path })),
  ];

  return [
    `# ${siteConfig.name}`,
    `> ${seo.description}`,
    `## ${llmsCopy.factsTitle}\n\n${llmsCopy.facts.map((fact) => `- ${fact}`).join("\n")}`,
    section(llmsCopy.tools, tools),
    section(llmsCopy.conversions, conversionLinks),
    section(llmsCopy.compressTargets, compressLinks),
    section(llmsCopy.formPresets, presetLinks),
    ...guideSections,
    section(llmsCopy.pages, pages),
  ].join("\n\n");
}

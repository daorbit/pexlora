import "server-only";
import { openImage } from "@/lib/image/open";
import { describeImage, generateJson } from "@/lib/ai/cloudflare";
import type { ImageInsights } from "@/lib/ai/types";

const VISION_PROMPT =
  "Describe this image for accessibility and search: the main subject, setting, colours, mood and any readable text. Use 3 or 4 plain sentences. Do not guess names of real people.";

const schema = {
  type: "object",
  properties: {
    altText: { type: "string" },
    description: { type: "string" },
    keywords: { type: "array", items: { type: "string" } },
    fileName: { type: "string" },
  },
  required: ["altText", "description", "keywords", "fileName"],
};

function toSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .split("-")
    .slice(0, 7)
    .join("-");
}

export async function imagePreview(buffer: Buffer) {
  const preview = await openImage(buffer, { animated: false })
    .rotate()
    .resize({ width: 768, height: 768, fit: "inside", withoutEnlargement: true })
    .flatten({ background: "#ffffff" })
    .jpeg({ quality: 80 })
    .toBuffer();
  return `data:image/jpeg;base64,${preview.toString("base64")}`;
}

export async function imageInsights(previewUrl: string): Promise<ImageInsights> {
  const description = await describeImage(previewUrl, VISION_PROMPT);

  const result = await generateJson<ImageInsights>(
    [
      {
        role: "system",
        content:
          "You write image metadata for accessibility and SEO. altText: under 125 characters, describes what is shown, no 'image of'. description: one or two natural sentences. keywords: 6 to 10 lowercase search keywords. fileName: 3 to 6 descriptive words in kebab-case without an extension.",
      },
      { role: "user", content: `Image description:\n${description}` },
    ],
    schema,
    400,
  );

  return {
    altText: String(result.altText ?? "").trim().slice(0, 160),
    description: String(result.description ?? description).trim(),
    keywords: (Array.isArray(result.keywords) ? result.keywords : [])
      .map((keyword) => String(keyword).trim().toLowerCase())
      .filter(Boolean)
      .slice(0, 10),
    fileName: toSlug(String(result.fileName ?? "")) || "image",
  };
}

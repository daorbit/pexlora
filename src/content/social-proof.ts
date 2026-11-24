import { AI_NAME } from "@/config/brand";
import { AI_DAILY_LIMITS, DAILY_LIMITS } from "@/config/limits";
import { PRO_FILES_PER_BATCH, PRO_LIMITS, REFUND_WINDOW_DAYS } from "@/config/plans";
import { conversions } from "@/config/conversions";
import { freeToolCount } from "@/config/tool-hub";
import { getWorkspaceTool, toolIconSrc, type WorkspaceToolSlug } from "@/config/tools";
import type { HandlingPath } from "@/content/file-handling";
import { formatCount } from "@/lib/utils/format-count";

const plural = (count: number, noun: string) => `${formatCount(count)} ${noun}${count === 1 ? "" : "s"}`;

export const proofCopy = {
  label: "Why Pexlora",
  rating: {
    count: (count: number) => plural(count, "rating"),
    summary: (average: number, count: number) => `Rated ${average} out of 5 from ${plural(count, "rating")}`,
  },
  filesLabel: "files processed",
  tools: { value: freeToolCount, label: "free tools" },
  device: { value: (count: number) => `${count} tools`, label: "never upload your files" },
};

export const toolProofCopy = {
  free: { value: "Free", label: "no sign-up" },
  ai: { value: `${AI_DAILY_LIMITS.anonymous} free`, label: "runs a day, no account" },
  paths: {
    device: { value: "Private", label: "runs on your device" },
    mixed: { value: "In your browser", label: "for common formats" },
    server: { value: "Not saved", label: "processed in memory" },
    ai: { value: AI_NAME, label: "results stay in your browser" },
  } satisfies Record<HandlingPath, { value: string; label: string }>,
};

export type UseCaseSceneId = "travel" | "form" | "viewer" | "merge" | "compress" | "altText";

export type UseCase = {
  id: string;
  scene?: UseCaseSceneId;
  iconSrc: string;
  title: string;
  body: string;
  badge?: string;
  href?: string;
  toolName?: string;
};

function forTool(slug: WorkspaceToolSlug, scene: UseCaseSceneId, title: string, body: string): UseCase {
  const tool = getWorkspaceTool(slug);
  return { id: slug, scene, iconSrc: toolIconSrc(slug), title, body, href: tool.href, toolName: tool.shortName };
}

export const useCasesCopy = {
  title: "Made for the files you",
  titleMarker: "share every day.",
  carouselLabel: "What people use Pexlora for",
  audienceLabel: "Made for",
  audience: ["Photographers", "Journalists", "Students", "Online sellers", "Designers", "Travellers"],
  reviewsTitle: "What people say",
  reviewsLabel: "Reviews from people who used Pexlora",
};

export const useCases: UseCase[] = [
  forTool("remove-metadata", "travel", "Posting a travel photo", "Phone photos can carry the exact place they were taken. Clean them before you share."),
  forTool("form-photo", "form", "Filling an exam form", "Set the exact pixels and KB range, then check it against the latest notice."),
  forTool("view-metadata", "viewer", "Checking a photo", "See the camera, date, location and AI tags saved inside a file before you publish it."),
  forTool("merge-pdf", "merge", "Sending one PDF", "Join invoices or scans into a single file, right in your browser."),
  forTool("compress-image", "compress", "Listing a product", "Make product photos smaller so your shop pages load faster."),
  forTool("image-alt-text", "altText", "Publishing a blog post", `Get alt text and a short description from ${AI_NAME}, then edit it in your own words.`),
];

export const useCaseScenes = {
  travel: { before: "Location found", after: "Location removed" },
  form: { from: "2.4 MB", to: "48 KB", target: "Target: under 50 KB" },
  viewer: [
    { label: "Camera", value: "Phone, 24 mm" },
    { label: "Date", value: "14 Mar, 09:41" },
    { label: "Location", value: "28.61, 77.20" },
  ],
  compress: { from: "3.8 MB", to: "420 KB" },
  altText: "Writing alt text",
};

export const statsCopy = {
  eyebrow: "Pexlora in numbers",
  liveBadge: "Live",
  liveLabel: "files processed today",
  ratingLabel: "average rating",
  conversions: { value: String(conversions.length), label: "image format conversions" },
  accountFiles: { value: String(DAILY_LIMITS.user), label: "files a day with a free account" },
  price: { value: "₹0", label: "to start, no card needed" },
};

export const pricingProof = {
  refund: { value: `${REFUND_WINDOW_DAYS}-day`, label: "refund" },
  tools: { value: freeToolCount, label: "tools on every plan" },
  title: "Who Pro is for",
  reviewsTitle: "What people say",
  carouselLabel: "Who Pro is for",
  useCases: [
    {
      id: "sellers",
      iconSrc: toolIconSrc("compress-image"),
      title: "Online sellers",
      body: "Clean, resize and compress a whole set of listing photos in one run.",
      badge: `${PRO_FILES_PER_BATCH} files per batch`,
    },
    {
      id: "photographers",
      iconSrc: toolIconSrc("remove-metadata"),
      title: "Photographers",
      body: "Remove location and camera details from a full shoot before you deliver it.",
      badge: `${formatCount(PRO_LIMITS.files)} files a day`,
    },
    {
      id: "writers",
      iconSrc: toolIconSrc("image-alt-text"),
      title: "Writers and bloggers",
      body: "Write alt text and descriptions for every image in a long post in one sitting.",
      badge: `${PRO_LIMITS.ai} ${AI_NAME} requests a day`,
    },
  ] satisfies UseCase[],
};

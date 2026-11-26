import { z } from "zod";
import { ADMIN_REVIEWS_PAGE_SIZE, MAX_RATING, REVIEW_TEXT_LIMITS } from "@/config/reviews";
import { workspaceTools, type WorkspaceToolSlug } from "@/config/tools";

const toolSlugs = workspaceTools.map((tool) => tool.slug) as [WorkspaceToolSlug, ...WorkspaceToolSlug[]];

const submissionKey = z.uuid();

export const ratingSchema = z.object({
  key: submissionKey,
  tool: z.enum(toolSlugs),
  rating: z.number().int().min(1).max(MAX_RATING),
});

export const reviewCommentSchema = z.object({
  key: submissionKey,
  comment: z.string().trim().min(1).max(REVIEW_TEXT_LIMITS.comment),
  name: z.string().trim().max(REVIEW_TEXT_LIMITS.name),
  consent: z.boolean(),
});

export const reviewIntentSchema = z.enum(["publish", "hide", "delete"]);

export const reviewIdsSchema = z.array(z.string().regex(/^[a-f0-9]{24}$/i)).min(1).max(ADMIN_REVIEWS_PAGE_SIZE);

export type RatingInput = z.infer<typeof ratingSchema>;
export type ReviewCommentInput = z.infer<typeof reviewCommentSchema>;
export type ReviewIntent = z.infer<typeof reviewIntentSchema>;

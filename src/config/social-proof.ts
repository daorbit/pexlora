import { toolIconSrc, type WorkspaceToolSlug } from "@/config/tools";

const proofTools: WorkspaceToolSlug[] = ["remove-metadata", "compress-image", "convert-format", "merge-pdf", "passport-photo"];

export const proofIcons = proofTools.map(toolIconSrc);

export const SOCIAL_PROOF_TAG = "social-proof";

export const LIVE_STATS_MIN_FILES = 50;

export const FILES_TOTAL_MIN = 1000;

export const RATINGS_MIN = 10;

export const REVIEWS_MIN = 3;

export const REVIEWS_SHOWN = 6;

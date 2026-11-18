import type { HumanLevel } from "@/lib/ai/human-score";

export const levelStyles: Record<HumanLevel, { stroke: string; text: string; badge: "success" | "neutral" | "warning" }> = {
  human: { stroke: "stroke-success", text: "text-success", badge: "success" },
  mostly: { stroke: "stroke-secondary", text: "text-secondary", badge: "neutral" },
  robotic: { stroke: "stroke-warning", text: "text-warning", badge: "warning" },
};

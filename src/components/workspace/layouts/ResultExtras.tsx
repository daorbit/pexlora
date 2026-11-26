"use client";

import dynamic from "next/dynamic";
import { housePromos, resultsPromoTools } from "@/config/house-promos";
import type { WorkspaceController } from "@/hooks/useWorkspaceController";
import { HousePromoCard } from "@/components/promo/HousePromoCard";
import { NextSteps } from "@/components/workspace/NextSteps";

const RatePrompt = dynamic(() => import("@/components/reviews/RatePrompt").then((module) => module.RatePrompt));

export function ResultExtras({ controller }: { controller: WorkspaceController }) {
  const { queue, results, tool } = controller;
  if (queue.isProcessing || !results.length) return null;

  return (
    <>
      <RatePrompt key={tool} tool={tool} />
      <NextSteps current={tool} results={results} />
      {resultsPromoTools.includes(tool) && <HousePromoCard promo={housePromos.results} placement="results" dismissible />}
    </>
  );
}

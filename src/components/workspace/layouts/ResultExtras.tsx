"use client";

import dynamic from "next/dynamic";
import { housePromos, resultsPromoTools } from "@/config/house-promos";
import type { WorkspaceController } from "@/hooks/useWorkspaceController";
import { HousePromoCard } from "@/components/promo/HousePromoCard";
import { NextSteps } from "@/components/workspace/NextSteps";

const RateTool = dynamic(() => import("@/components/reviews/RateTool").then((module) => module.RateTool));

export function ResultExtras({ controller }: { controller: WorkspaceController }) {
  const { queue, results, tool } = controller;
  if (queue.isProcessing || !results.length) return null;

  return (
    <>
      <div className="flex flex-col gap-3 sm:gap-4">
        <RateTool key={tool} tool={tool} />
        <NextSteps current={tool} results={results} />
      </div>
      {resultsPromoTools.includes(tool) && <HousePromoCard promo={housePromos.results} placement="results" dismissible />}
    </>
  );
}

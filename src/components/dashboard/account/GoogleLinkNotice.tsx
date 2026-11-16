"use client";

import { useSearchParams } from "next/navigation";
import { accountCopy, type GoogleLinkResult } from "@/content/account";
import { Alert } from "@/components/ui/Alert";

function isLinkResult(value: string | null): value is GoogleLinkResult {
  return value !== null && value in accountCopy.googleLink;
}

export function GoogleLinkNotice() {
  const result = useSearchParams().get("google");
  if (!isLinkResult(result)) return null;

  return <Alert tone={result === "linked" ? "success" : "danger"} message={accountCopy.googleLink[result]} />;
}

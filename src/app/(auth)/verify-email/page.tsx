import type { Metadata } from "next";
import { Suspense } from "react";
import { authCopy } from "@/content/auth";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { VerifyEmailCard } from "@/components/auth/VerifyEmailCard";

export const metadata: Metadata = { title: authCopy.verify.title };

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<SkeletonCard lines={4} className="w-full lg:max-w-110" />}>
      <VerifyEmailCard />
    </Suspense>
  );
}

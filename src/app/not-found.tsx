import type { Metadata } from "next";
import { Compass } from "lucide-react";
import { routes } from "@/config/site";
import { statusCopy } from "@/content/status";
import { ButtonLink } from "@/components/ui/Button";
import { PopularTools } from "@/components/feedback/PopularTools";
import { StatusScreen } from "@/components/feedback/StatusScreen";
import { MarketingFrame } from "@/components/layout/MarketingFrame";

export const metadata: Metadata = { title: statusCopy.notFound.title, robots: { index: false, follow: true } };

export default function NotFound() {
  const copy = statusCopy.notFound;

  return (
    <MarketingFrame oneTap={false}>
      <StatusScreen
        icon={Compass}
        eyebrow={copy.code}
        title={copy.title}
        body={copy.body}
        actions={
          <ButtonLink href={routes.home} variant="ink" size="lg" arrow>
            {copy.home}
          </ButtonLink>
        }
        footer={<PopularTools />}
      />
    </MarketingFrame>
  );
}

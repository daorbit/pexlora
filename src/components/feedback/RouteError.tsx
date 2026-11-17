"use client";

import { useEffect } from "react";
import { RotateCw, TriangleAlert } from "lucide-react";
import { statusCopy } from "@/content/status";
import { Button, ButtonLink } from "@/components/ui/Button";
import { StatusScreen } from "@/components/feedback/StatusScreen";

type RouteErrorProps = {
  error: unknown;
  retry: () => void;
  homeHref: string;
  homeLabel: string;
  className?: string;
};

function digestOf(error: unknown) {
  if (error instanceof Error && "digest" in error && typeof error.digest === "string") return error.digest;
  return null;
}

export function RouteError({ error, retry, homeHref, homeLabel, className }: RouteErrorProps) {
  const copy = statusCopy.error;
  const digest = digestOf(error);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusScreen
      icon={TriangleAlert}
      eyebrow={copy.code}
      title={copy.title}
      body={copy.body}
      className={className}
      actions={
        <>
          <Button variant="ink" size="lg" onClick={retry}>
            <RotateCw className="size-4" aria-hidden />
            {copy.retry}
          </Button>
          <ButtonLink href={homeHref} variant="secondary" size="lg">
            {homeLabel}
          </ButtonLink>
        </>
      }
      footer={digest && <p className="font-mono text-[11px] text-tertiary">{copy.reference(digest)}</p>}
    />
  );
}

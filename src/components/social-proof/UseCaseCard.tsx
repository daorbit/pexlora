import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { UseCase } from "@/content/social-proof";
import { Badge } from "@/components/ui/Badge";
import { UseCaseScene } from "@/components/landing/use-cases/UseCaseScene";
import { HubItemIcon } from "@/components/tools/HubItemIcon";
import { ProofCard } from "@/components/social-proof/ProofCard";

function CaseText({ useCase }: { useCase: UseCase }) {
  return (
    <span className="flex flex-1 flex-col gap-1.5">
      <h3 className="text-[17px] font-semibold tracking-[-0.02em] sm:text-[19px]">{useCase.title}</h3>
      <span className="text-[14px] leading-relaxed text-secondary">{useCase.body}</span>
    </span>
  );
}

export function UseCaseCard({ useCase, compact }: { useCase: UseCase; compact?: boolean }) {
  if (!useCase.href || !useCase.scene) {
    return (
      <ProofCard compact={compact}>
        <span className="flex items-center justify-between gap-3">
          <HubItemIcon src={useCase.iconSrc} size="md" />
          {useCase.badge && <Badge tone="accent">{useCase.badge}</Badge>}
        </span>
        <CaseText useCase={useCase} />
      </ProofCard>
    );
  }

  return (
    <Link
      href={useCase.href}
      className="group flex h-full flex-col gap-4 rounded-[22px] bg-surface p-3 text-left shadow-card transition-[translate,box-shadow] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:hover:-translate-y-1.5"
    >
      <UseCaseScene id={useCase.scene} />
      <span className="flex flex-1 flex-col gap-4 px-2 pb-2">
        <CaseText useCase={useCase} />
        <span className="flex items-center gap-2.5 text-sm font-semibold">
          <HubItemIcon src={useCase.iconSrc} size="xs" />
          {useCase.toolName}
          <ArrowRight className="ml-auto size-4.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </span>
      </span>
    </Link>
  );
}

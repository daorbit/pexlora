"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { UserRound } from "lucide-react";
import { AI_TEXT_LIMITS } from "@/config/limits";
import { textHandoffKey } from "@/config/text-tools";
import { textToolCopy } from "@/content/ai";
import { useAiAction } from "@/hooks/useAiAction";
import { useScrollToResult } from "@/hooks/useScrollToResult";
import { useTextToolSession } from "@/hooks/useTextToolSession";
import { countWords } from "@/lib/ai/text-stats";
import type { AiTextReport } from "@/lib/ai/types";
import { handOff } from "@/lib/utils/file-handoff";
import { detectAiText } from "@/services/ai-api";
import { Button } from "@/components/ui/Button";
import { UpsellAlert } from "@/components/ui/UpsellAlert";
import { DetectorResult } from "@/components/text-tools/DetectorResult";
import { OutputActions } from "@/components/text-tools/OutputActions";
import { OrbitWorkingState } from "@/components/text-tools/OrbitWorkingState";
import { PaneEmpty } from "@/components/text-tools/PaneEmpty";
import { RunBar } from "@/components/text-tools/RunBar";
import { TextInput } from "@/components/text-tools/TextInput";
import { TextPane } from "@/components/text-tools/TextPane";
import { WorkspaceFrame } from "@/components/workspace/WorkspaceFrame";

const HUMANIZE_FROM_SCORE = 35;

export function AiDetectorWorkspace({ peerHref }: { peerHref: string }) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [checkedText, setCheckedText] = useState("");
  const detector = useAiAction(detectAiText);
  const { reset, restore } = detector;
  const report = detector.data;
  const resultRef = useScrollToResult(report);

  const changeText = useCallback(
    (value: string) => {
      setText(value);
      reset();
    },
    [reset],
  );

  const snapshot = useMemo(() => ({ text, checkedText, report }), [text, checkedText, report]);
  const applySession = useCallback(
    (session: { text: string; checkedText?: string; report?: AiTextReport | null }) => {
      setText(session.text);
      setCheckedText(session.checkedText ?? "");
      if (session.report) restore({ ...session.report, quotaRemaining: null });
    },
    [restore],
  );
  useTextToolSession("ai-text-detector", snapshot, applySession);

  const words = countWords(text);
  const ready = words >= AI_TEXT_LIMITS.minWords;
  const run = () => {
    if (!ready || detector.pending) return;
    setCheckedText(text);
    detector.run(text);
  };

  const humanize = () => {
    handOff(textHandoffKey("ai-humanizer"), checkedText);
    router.push(peerHref);
  };

  return (
    <WorkspaceFrame>
      <div className="flex flex-col gap-3 p-1">
        <RunBar
          label={textToolCopy.detect}
          pendingLabel={textToolCopy.detecting}
          pending={detector.pending}
          words={words}
          onRun={run}
        />

        <UpsellAlert message={detector.error} upsell={detector.upsell} />

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <TextInput value={text} onChange={changeText} onSubmit={run} disabled={detector.pending} />

          <div ref={resultRef} className="scroll-mt-20">
            <TextPane
              title={textToolCopy.resultLabel}
              footer={
                report && (
                  <OutputActions text={textToolCopy.shareResult(report.score)} shareTitle={textToolCopy.scoreLabel}>
                    {report.score >= HUMANIZE_FROM_SCORE && (
                      <Button variant="ink" size="sm" onClick={humanize}>
                        <UserRound className="size-3.5" aria-hidden />
                        {textToolCopy.toHumanizer}
                      </Button>
                    )}
                  </OutputActions>
                )
              }
              className="h-full"
            >
              {detector.pending ? (
                <OrbitWorkingState steps={textToolCopy.detectorSteps} />
              ) : report ? (
                <DetectorResult report={report} text={checkedText} />
              ) : (
                <PaneEmpty message={textToolCopy.resultEmpty} />
              )}
            </TextPane>
          </div>
        </div>
      </div>
    </WorkspaceFrame>
  );
}

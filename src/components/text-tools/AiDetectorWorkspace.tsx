"use client";

import { useCallback, useMemo, useState } from "react";
import { AI_TEXT_LIMITS } from "@/config/limits";
import { textToolCopy } from "@/content/ai";
import { useAiAction } from "@/hooks/useAiAction";
import { useScrollToResult } from "@/hooks/useScrollToResult";
import { useTextToolSession } from "@/hooks/useTextToolSession";
import { countWords } from "@/lib/ai/text-stats";
import type { AiTextReport } from "@/lib/ai/types";
import { detectAiText } from "@/services/ai-api";
import { UpsellAlert } from "@/components/ui/UpsellAlert";
import { DetectorResult } from "@/components/text-tools/DetectorResult";
import { OutputActions } from "@/components/text-tools/OutputActions";
import { PaneEmpty, PaneSkeleton } from "@/components/text-tools/PaneSkeleton";
import { RunBar } from "@/components/text-tools/RunBar";
import { TextInput } from "@/components/text-tools/TextInput";
import { TextPane } from "@/components/text-tools/TextPane";
import { WorkspaceFrame } from "@/components/workspace/WorkspaceFrame";

export function AiDetectorWorkspace() {
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

  const ready = countWords(text) >= AI_TEXT_LIMITS.minWords;
  const run = () => {
    if (!ready || detector.pending) return;
    setCheckedText(text);
    detector.run(text);
  };

  return (
    <WorkspaceFrame>
      <div className="flex flex-col gap-3 p-1">
        <RunBar
          label={textToolCopy.detect}
          pendingLabel={textToolCopy.detecting}
          pending={detector.pending}
          ready={ready}
          onRun={run}
        />

        <UpsellAlert message={detector.error} upsell={detector.upsell} />

        <div className="grid gap-3 lg:grid-cols-2">
          <TextInput value={text} onChange={changeText} onSubmit={run} disabled={detector.pending} />

          <div ref={resultRef} className="scroll-mt-20">
            <TextPane
              title={textToolCopy.resultLabel}
              footer={
                report && (
                  <OutputActions text={textToolCopy.shareResult(report.score)} shareTitle={textToolCopy.scoreLabel} />
                )
              }
              className="h-full"
            >
              {detector.pending ? (
                <PaneSkeleton />
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

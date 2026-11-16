"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Wand } from "lucide-react";
import { AI_TEXT_LIMITS } from "@/config/limits";
import { textHandoffKey } from "@/config/text-tools";
import { textToolCopy } from "@/content/ai";
import { useAiAction } from "@/hooks/useAiAction";
import { useHandOff } from "@/hooks/useHandOff";
import { useScrollToResult } from "@/hooks/useScrollToResult";
import { countWords } from "@/lib/ai/text-stats";
import { handOff } from "@/lib/utils/file-handoff";
import { detectAiText } from "@/services/ai-api";
import { Button } from "@/components/ui/Button";
import { UpsellAlert } from "@/components/ui/UpsellAlert";
import { DetectorResult } from "@/components/text-tools/DetectorResult";
import { OutputActions } from "@/components/text-tools/OutputActions";
import { PaneEmpty, PaneSkeleton } from "@/components/text-tools/PaneSkeleton";
import { RunBar } from "@/components/text-tools/RunBar";
import { TextInput } from "@/components/text-tools/TextInput";
import { TextPane } from "@/components/text-tools/TextPane";
import { WorkspaceFrame } from "@/components/workspace/WorkspaceFrame";

export function AiDetectorWorkspace({ peerHref }: { peerHref: string }) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [checkedText, setCheckedText] = useState("");
  const detector = useAiAction(detectAiText);
  const { reset } = detector;
  const report = detector.data;
  const resultRef = useScrollToResult(report);

  const changeText = useCallback(
    (value: string) => {
      setText(value);
      reset();
    },
    [reset],
  );
  useHandOff<string>(textHandoffKey("ai-text-detector"), changeText);

  const ready = countWords(text) >= AI_TEXT_LIMITS.minWords;
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
                  <OutputActions text={textToolCopy.shareResult(report.score)} shareTitle={textToolCopy.scoreLabel}>
                    {report.verdict !== "likely-human" && (
                      <Button variant="ink" size="sm" onClick={humanize}>
                        <Wand className="size-3.5" aria-hidden />
                        {textToolCopy.toHumanizer}
                      </Button>
                    )}
                  </OutputActions>
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

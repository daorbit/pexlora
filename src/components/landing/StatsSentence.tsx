import type { StatPhrase } from "@/content/social-proof";
import { Highlight } from "@/components/ui/Highlight";

export function StatsSentence({ phrases }: { phrases: StatPhrase[] }) {
  return (
    <p className="text-[30px] leading-[1.18] font-bold tracking-[-0.04em] text-secondary sm:text-[44px] lg:text-[64px] lg:tracking-[-0.045em]">
      {phrases.map((phrase) => (
        <span key={`${phrase.lead ?? ""}${phrase.value}`} className={phrase.marker ? "text-foreground" : undefined}>
          {phrase.lead && `${phrase.lead} `}
          {phrase.marker ? <Highlight>{phrase.value}</Highlight> : <span className="text-foreground">{phrase.value}</span>}
          {phrase.rest && ` ${phrase.rest}`}{" "}
        </span>
      ))}
    </p>
  );
}

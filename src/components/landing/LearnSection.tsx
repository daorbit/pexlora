import { glossary } from "@/content/landing";
import { Section } from "@/components/ui/Section";

export function LearnSection() {
  return (
    <Section
      id="learn"
      tone="surface"
      align="left"
      eyebrow="Learn"
      title="What is file metadata?"
      description="Metadata is information stored inside a file, separate from what you see or hear. It's useful for organising, but it goes with the file wherever you share it."
    >
      <dl className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {glossary.map((entry) => (
          <div key={entry.term} className="flex flex-col gap-2 border-t border-separator pt-5">
            <dt className="font-display text-lg font-semibold">{entry.term}</dt>
            <dd className="text-[15px] leading-relaxed text-secondary">{entry.body}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

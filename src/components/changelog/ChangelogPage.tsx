import { changelog, changelogCopy } from "@/content/changelog";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ChangelogEntryCard } from "@/components/changelog/ChangelogEntryCard";
import { ChangelogSeenMarker } from "@/components/changelog/ChangelogSeenMarker";

export function ChangelogPage() {
  return (
    <section className="py-12 sm:py-16">
      <ChangelogSeenMarker />
      <Container className="flex max-w-5xl flex-col gap-10 sm:gap-14">
        <PageHeader
          eyebrow={changelogCopy.eyebrow}
          title={changelogCopy.title}
          highlight={changelogCopy.highlight}
          lead={changelogCopy.lead}
        />
        <div className="flex flex-col gap-8 sm:gap-10">
          {changelog.map((entry) => (
            <ChangelogEntryCard key={entry.date} entry={entry} />
          ))}
        </div>
      </Container>
    </section>
  );
}

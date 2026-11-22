import { routes } from "@/config/site";
import { fileHandlingCopy } from "@/content/file-handling";
import { pageUpdatedAt } from "@/lib/seo/page-updated";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { LegalContactCard } from "@/components/legal/LegalContactCard";
import { UpdatedDate } from "@/components/seo/UpdatedDate";
import { HandlingNotes } from "@/components/file-handling/HandlingNotes";
import { PathCards } from "@/components/file-handling/PathCards";
import { ToolPathGroups } from "@/components/file-handling/ToolPathGroups";

const links = [
  { label: fileHandlingCopy.links.security, href: routes.security },
  { label: fileHandlingCopy.links.privacy, href: routes.privacy },
];

export function FileHandlingPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container className="flex max-w-5xl flex-col gap-10 sm:gap-14">
        <PageHeader
          eyebrow={fileHandlingCopy.eyebrow}
          title={fileHandlingCopy.title}
          highlight={fileHandlingCopy.highlight}
          lead={fileHandlingCopy.lead}
        >
          <UpdatedDate date={pageUpdatedAt(routes.fileHandling)} />
        </PageHeader>
        <PathCards />
        <ToolPathGroups />
        <HandlingNotes />
        <RelatedLinks title={fileHandlingCopy.linksTitle} links={links} />
        <LegalContactCard />
      </Container>
    </section>
  );
}

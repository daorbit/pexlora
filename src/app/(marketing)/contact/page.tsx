import type { Metadata } from "next";
import { embeddedForms } from "@/config/forms";
import { routes } from "@/config/site";
import { contactPage } from "@/content/contact";
import { pageMetadata } from "@/lib/seo/page-metadata";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Highlight } from "@/components/ui/Highlight";
import { ContactDetails } from "@/components/forms/ContactDetails";
import { EmbeddedForm } from "@/components/forms/EmbeddedForm";

export const metadata: Metadata = pageMetadata(contactPage.metaTitle, contactPage.description, routes.contact);

export default function ContactPage() {
  return (
    <section className="py-14 sm:py-20">
      <Container size="narrow">
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <Eyebrow>{contactPage.eyebrow}</Eyebrow>
          <h1 className="text-[36px] font-bold leading-[1.1] tracking-[-0.035em] sm:text-[48px]">
            {contactPage.title} <Highlight>{contactPage.highlight}</Highlight>
          </h1>
          <p className="max-w-lg text-[17px] leading-relaxed text-secondary">{contactPage.description}</p>
        </div>
        <EmbeddedForm form={embeddedForms.contact} />
        <ContactDetails />
        </div>
      </Container>
    </section>
  );
}

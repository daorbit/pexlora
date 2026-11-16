import { company } from "@/config/company";
import { DAILY_LIMITS, MAX_FILES_PER_BATCH } from "@/config/limits";
import { routes, siteConfig } from "@/config/site";
import type { LegalDocument } from "@/content/legal/types";

const { name } = siteConfig;

export const termsOfService: LegalDocument = {
  slug: "terms",
  path: routes.terms,
  navLabel: "Terms",
  title: "Terms of Service",
  metaTitle: "Terms of Service",
  description: `The terms for using ${name}: free tools, fair daily limits, your files and what we do and don't promise.`,
  lead: `These Terms are the agreement between you and ${company.legalName} for using ${name}. Please read them; they are written to be clear rather than clever.`,
  highlights: [
    {
      title: "Free to use",
      body: `${DAILY_LIMITS.anonymous} files a day without an account, ${DAILY_LIMITS.user} with a free account. No card needed.`,
    },
    {
      title: "Your files stay yours",
      body: "We claim no rights over anything you upload. We only process it to give you the result.",
    },
    {
      title: "Metadata only",
      body: `${name} removes and edits metadata. It doesn't remove pixel watermarks or promise to beat AI detectors.`,
    },
    {
      title: "Use it fairly",
      body: "No illegal content, no abuse of the service and no using cleaned files to deceive people.",
    },
  ],
  sections: [
    {
      id: "agreement",
      heading: "The agreement",
      blocks: [
        {
          type: "p",
          text: `By using ${name} you agree to these Terms and to our Privacy Policy. If you use ${name} on behalf of an organisation, you confirm you can accept these Terms for it. If you don't agree, please don't use the service.`,
        },
      ],
    },
    {
      id: "service",
      heading: "The service",
      blocks: [
        {
          type: "p",
          text: `${name} offers free online tools to view, remove and edit file metadata, to compress, resize and convert images, and AI tools for alt text, AI text detection and rewriting. We may add, change or remove tools over time.`,
        },
      ],
    },
    {
      id: "accounts",
      heading: "Your account",
      blocks: [
        {
          type: "list",
          items: [
            "You must be at least 18, or have the consent of a parent or guardian.",
            "Give accurate details and keep your password safe. You are responsible for activity on your account.",
            "One account per person. Tell us straight away if you think your account has been misused.",
          ],
        },
      ],
    },
    {
      id: "limits",
      heading: "Free use and limits",
      blocks: [
        {
          type: "p",
          text: `${name} is free. You can process ${DAILY_LIMITS.anonymous} files a day without an account and ${DAILY_LIMITS.user} with a free account, up to ${MAX_FILES_PER_BATCH} at a time, within the file size limits shown on each tool. AI features have their own daily limit. We may change these limits to keep the service sustainable.`,
        },
        {
          type: "p",
          text: "We may introduce paid plans in future. Nothing will be charged without your explicit agreement, and the free tools described here won't silently become paid.",
        },
      ],
    },
    {
      id: "your-files",
      heading: "Your files and content",
      blocks: [
        {
          type: "p",
          text: "You keep all rights to the files and text you submit. You give us a limited permission to process them only to produce the result you asked for. You confirm that you have the right to process every file you submit.",
        },
      ],
    },
    {
      id: "acceptable-use",
      heading: "Acceptable use",
      blocks: [
        { type: "p", text: "You agree not to:" },
        {
          type: "list",
          items: [
            "upload anything illegal, including child sexual abuse material, or content that infringes someone else's rights;",
            "upload malware, or try to break, overload or probe the service;",
            "get around the daily limits, for example with automated scripts or many accounts;",
            "use cleaned or edited files to deceive people, commit fraud, or hide that an image was made with AI where the law or a platform's rules require it to be labelled; or",
            "use the AI tools to break the rules of a school, employer or publication you are subject to.",
          ],
        },
      ],
    },
    {
      id: "ai",
      heading: "AI features",
      blocks: [
        {
          type: "p",
          text: "AI output can be wrong. An AI detector score is an estimate, not proof, and should never be the only basis for a decision about a person. Review generated alt text and rewritten text before you use them. You are responsible for how you use AI output.",
        },
      ],
    },
    {
      id: "limitations",
      heading: "What the tools do and don't do",
      blocks: [
        {
          type: "callout",
          title: "Metadata, not pixels",
          text: `${name} removes and edits metadata stored alongside the content of a file. It does not remove invisible watermarks mixed into the pixels (such as SynthID) and does not promise that a file will pass any AI detector. Use the metadata viewer to check a result before you rely on it.`,
        },
      ],
    },
    {
      id: "ip",
      heading: "Intellectual property",
      blocks: [
        {
          type: "p",
          text: `The ${name} software, name, logo and website content belong to ${company.legalName}. These Terms don't give you any right to use our brand.`,
        },
      ],
    },
    {
      id: "third-parties",
      heading: "Third-party services",
      blocks: [
        {
          type: "p",
          text: "Some features rely on third parties, such as Google for sign-in and Cloudflare for AI. Your use of those services is also governed by their own terms.",
        },
      ],
    },
    {
      id: "availability",
      heading: "Availability and changes",
      blocks: [
        {
          type: "p",
          text: "We work to keep the service fast and available, but we don't guarantee it will always be uninterrupted or error-free. We may change or discontinue features, and will give reasonable notice of significant changes where we can.",
        },
      ],
    },
    {
      id: "termination",
      heading: "Suspension and termination",
      blocks: [
        {
          type: "p",
          text: `You can stop using ${name} at any time and ask us to delete your account. We may suspend or close access that breaks these Terms, creates a security or legal risk, or is used fraudulently. Where practical, we will tell you first.`,
        },
      ],
    },
    {
      id: "disclaimers",
      heading: "Disclaimers",
      blocks: [
        {
          type: "p",
          text: 'The service is provided "as is" and "as available", without warranties of any kind, express or implied, including fitness for a particular purpose. Keep your own copies of important files. Nothing in these Terms excludes rights you have under law that cannot be excluded.',
        },
      ],
    },
    {
      id: "liability",
      heading: "Limitation of liability",
      blocks: [
        {
          type: "p",
          text: "To the extent permitted by law, we are not liable for indirect, incidental, special or consequential losses, or for loss of profits, revenue or data. Our total liability arising out of or relating to the service is limited to the amount you paid us in the twelve months before the event giving rise to the claim.",
        },
      ],
    },
    {
      id: "indemnity",
      heading: "Indemnity",
      blocks: [
        {
          type: "p",
          text: "You agree to indemnify us against claims arising from the files and content you submit, or from your breach of these Terms or of the law.",
        },
      ],
    },
    {
      id: "law",
      heading: "Governing law",
      blocks: [
        {
          type: "p",
          text: "These Terms are governed by the laws of India. Any dispute will be subject to the exclusive jurisdiction of the courts of India, unless the law of your country gives you the right to bring a claim where you live.",
        },
      ],
    },
    {
      id: "changes",
      heading: "Changes to these Terms",
      blocks: [
        {
          type: "p",
          text: "We may update these Terms. The date at the top shows the latest version. We will email account holders before a material change takes effect. Continuing to use the service afterwards means you accept the updated Terms.",
        },
      ],
    },
    {
      id: "contact",
      heading: "Contact",
      blocks: [{ type: "p", text: `Questions about these Terms? Contact ${company.legalName} at ${company.email}.` }],
    },
  ],
};

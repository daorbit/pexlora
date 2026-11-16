import { company } from "@/config/company";
import { routes, siteConfig } from "@/config/site";
import type { LegalDocument } from "@/content/legal/types";

const { name } = siteConfig;

export const privacyPolicy: LegalDocument = {
  slug: "privacy",
  path: routes.privacy,
  navLabel: "Privacy",
  title: "Privacy Policy",
  metaTitle: "Privacy Policy",
  description: `How ${name} handles your files, your account and your data. Files are never stored, nothing is sold.`,
  lead: `${name} exists to protect your privacy, so this policy is short on surprises. It explains what we collect, why, how long we keep it and the choices you have.`,
  highlights: [
    {
      title: "Files are never stored",
      body: "Images are processed in memory and discarded the moment the result is sent back. Documents, audio and video never leave your device.",
    },
    {
      title: "No raw IP addresses",
      body: "Daily limits for signed-out visitors use a one-way hash of the IP address, deleted automatically after 48 hours.",
    },
    {
      title: "No ads, no selling",
      body: "We don't sell data, share it with advertisers or build profiles. There are no advertising cookies.",
    },
    {
      title: "Cookieless analytics",
      body: `Page views are counted with ${company.analyticsName}, which sets no cookies and stores no IP addresses.`,
    },
  ],
  sections: [
    {
      id: "who-we-are",
      heading: "Who we are",
      blocks: [
        {
          type: "p",
          text: `${name} is a product of ${company.legalName}, based in ${company.country} ("we", "us", "our"). We are responsible for the personal data described in this policy. You can reach us at ${company.email}.`,
        },
        {
          type: "p",
          text: `This policy covers the ${name} website, every tool on it and the signed-in dashboard.`,
        },
      ],
    },
    {
      id: "files",
      heading: "Files you process",
      blocks: [
        {
          type: "list",
          items: [
            "Images (JPG, PNG, WebP, AVIF, GIF, TIFF) are sent over an encrypted HTTPS connection to our servers to be cleaned, inspected, converted, compressed, resized or edited. They are processed in memory, never written to disk, never looked at by a person and discarded as soon as the result is returned.",
            "PDFs, Office documents, audio and video are read and cleaned inside your browser. They are never uploaded. Only a small request that counts towards your daily limit reaches our server.",
            "AI features (alt text, metadata explanations, the AI text detector, the humanizer and Fill with AI) send the image or text you submit to Cloudflare Workers AI to produce the result. We don't keep your input or the output on our servers.",
          ],
        },
        {
          type: "callout",
          title: "Your work stays on your device",
          text: "To let you pick up where you left off, queued files, results and AI outputs are saved in your browser's own storage (IndexedDB) for 24 hours. They never leave your device, and Clear All removes them straight away.",
        },
      ],
    },
    {
      id: "account",
      heading: "Your account",
      blocks: [
        {
          type: "p",
          text: "You can use every tool without an account. If you create one, we keep:",
        },
        {
          type: "list",
          items: [
            "your name and email address;",
            "a one-way (bcrypt) hash of your password, never the password itself;",
            "if you sign in with Google, your Google account ID and profile picture address; and",
            "when the account was created and last updated.",
          ],
        },
      ],
    },
    {
      id: "usage",
      heading: "Daily limits",
      blocks: [
        {
          type: "p",
          text: "To keep the service free and fair, we count how many files are processed each day (UTC). Signed-in use is counted against your account. Signed-out use is counted against a SHA-256 hash of your IP address combined with a secret key, so the raw IP address is never stored. These counters are deleted automatically after 48 hours.",
        },
      ],
    },
    {
      id: "analytics",
      heading: "Analytics",
      blocks: [
        {
          type: "p",
          text: `We use ${company.analyticsName}, ${company.legalName}'s own privacy-first analytics, to understand which pages are useful. It records the page address, the referring site, campaign parameters, device type and country. It sets no cookies, stores no IP addresses and doesn't follow you across websites.`,
        },
      ],
    },
    {
      id: "emails-forms",
      heading: "Emails and forms",
      blocks: [
        {
          type: "list",
          items: [
            "We send account emails, such as a welcome email, through Google's Gmail service. We don't send marketing emails without your consent.",
            `The contact and early-access forms are hosted by DA Orbit Forms (${company.formsHost}). We receive what you type into them and use it only to reply to you.`,
          ],
        },
      ],
    },
    {
      id: "use",
      heading: "How we use data",
      blocks: [
        {
          type: "list",
          items: [
            "to provide the tools and your account;",
            "to apply daily limits and prevent abuse;",
            "to keep the service secure and fix problems;",
            "to answer your messages; and",
            "to understand, in aggregate, which features are useful.",
          ],
        },
        {
          type: "p",
          text: "Where India's Digital Personal Data Protection Act, 2023 or laws such as the EU and UK GDPR apply, we rely on your consent, on providing the service you asked for, and on our legitimate interest in running a secure, free service.",
        },
      ],
    },
    {
      id: "sharing",
      heading: "Service providers",
      blocks: [
        {
          type: "p",
          text: "We never sell personal data. We share it only with providers that help us run the service, and only as much as each one needs:",
        },
        {
          type: "table",
          columns: ["Provider", "What it does", "Data involved"],
          rows: [
            ["Vercel", "Hosting, in the Mumbai region", "Requests and images while they are processed"],
            ["MongoDB Atlas", "Database", "Account details and daily counters"],
            ["Cloudflare Workers AI", "AI features", "Images and text you submit to AI tools"],
            ["Google", "Sign-in with Google and account emails", "Name, email, Google account ID"],
            [`${company.legalName} (${company.analyticsName}, Forms)`, "Analytics and contact forms", "Page views, form answers"],
          ],
        },
        {
          type: "p",
          text: "We may also disclose information if the law requires it, or to protect our users and the service from fraud or abuse.",
        },
      ],
    },
    {
      id: "retention",
      heading: "How long we keep data",
      blocks: [
        {
          type: "list",
          items: [
            "Files: not kept. Images are discarded once the result is returned.",
            "Saved work in your browser: 24 hours, or until you press Clear All.",
            "Daily counters: deleted automatically after 48 hours.",
            "Account details: until you ask us to delete your account.",
          ],
        },
      ],
    },
    {
      id: "security",
      heading: "Security",
      blocks: [
        {
          type: "p",
          text: `Everything travels over HTTPS, passwords are hashed with bcrypt, and you stay signed in with a signed, HTTP-only cookie that expires after 7 days. The Security & Data page explains how each part of the service is protected.`,
        },
      ],
    },
    {
      id: "rights",
      heading: "Your rights",
      blocks: [
        {
          type: "p",
          text: `You can ask to access, correct or delete your personal data, withdraw consent, or raise a complaint. Under India's DPDP Act you can also nominate someone to exercise these rights for you. Email ${company.email} from the address on your account and we will respond within 30 days. You can also complain to your local data protection authority.`,
        },
      ],
    },
    {
      id: "children",
      heading: "Children",
      blocks: [
        {
          type: "p",
          text: `${name} is not directed at children. If you are under 18, use ${name} only with the consent of a parent or guardian. If you believe a child has given us personal data without consent, contact us and we will delete it.`,
        },
      ],
    },
    {
      id: "transfers",
      heading: "Where data is processed",
      blocks: [
        {
          type: "p",
          text: "Our servers run in India (Mumbai). Some providers, such as Cloudflare and Google, may process data in other countries, including the United States, under their own safeguards.",
        },
      ],
    },
    {
      id: "changes",
      heading: "Changes to this policy",
      blocks: [
        {
          type: "p",
          text: "We may update this policy as the service changes. The date at the top shows the latest version. If a change is significant, we will email account holders before it takes effect.",
        },
      ],
    },
    {
      id: "contact",
      heading: "Contact and grievances",
      blocks: [
        {
          type: "p",
          text: `For any privacy question, request or grievance, contact ${company.legalName} at ${company.email}.`,
        },
      ],
    },
  ],
};

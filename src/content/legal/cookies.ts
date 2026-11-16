import { company } from "@/config/company";
import { routes, siteConfig } from "@/config/site";
import type { LegalDocument } from "@/content/legal/types";

const { name } = siteConfig;

export const cookiePolicy: LegalDocument = {
  slug: "cookies",
  path: routes.cookies,
  navLabel: "Cookies",
  title: "Cookie Policy",
  metaTitle: "Cookie Policy",
  description: `${name} uses only the cookies needed to sign you in. No advertising or tracking cookies.`,
  lead: `${name} keeps cookies to the minimum: a few that make sign-in work, and nothing that tracks or advertises. That's why you won't see a cookie banner.`,
  highlights: [
    {
      title: "Essential only",
      body: "Every cookie we set is needed to sign you in or keep you signed in.",
    },
    {
      title: "No tracking cookies",
      body: `Our analytics, ${company.analyticsName}, is cookieless and stores no IP addresses.`,
    },
    {
      title: "No advertising",
      body: "There are no ad networks, pixels or third-party marketing cookies on the site.",
    },
  ],
  sections: [
    {
      id: "cookies",
      heading: "Cookies we set",
      blocks: [
        {
          type: "table",
          columns: ["Name", "Purpose", "Lasts"],
          rows: [
            ["pexlora_session", "Keeps you signed in. HTTP-only, so page scripts can't read it.", "7 days"],
            ["pexlora_oauth", "Protects Sign in with Google from forgery while you sign in.", "10 minutes"],
            ["pexlora_one_tap", "Protects Google One Tap sign-in from forgery.", "10 minutes"],
          ],
        },
      ],
    },
    {
      id: "storage",
      heading: "Storage on your device",
      blocks: [
        {
          type: "p",
          text: "Some preferences and your saved work are kept in your browser's storage. They never leave your device:",
        },
        {
          type: "table",
          columns: ["Item", "Purpose", "Lasts"],
          rows: [
            ["pexlora-theme", "Remembers light or dark mode.", "Until you change it"],
            ["pexlora-sidebar", "Remembers whether the dashboard sidebar is collapsed.", "Until you change it"],
            ["Workspace sessions (IndexedDB)", "Restores queued files, results and AI outputs.", "24 hours, or until Clear All"],
          ],
        },
      ],
    },
    {
      id: "third-party",
      heading: "Third parties",
      blocks: [
        {
          type: "list",
          items: [
            "If you use Sign in with Google or Google One Tap, Google may set its own cookies under its privacy policy.",
            `The contact and early-access forms are loaded from ${company.formsHost}.`,
            `${company.analyticsName} analytics sets no cookies.`,
          ],
        },
      ],
    },
    {
      id: "control",
      heading: "Your choices",
      blocks: [
        {
          type: "p",
          text: `You can block or delete cookies in your browser settings. ${name}'s tools work without cookies, but you won't be able to stay signed in. Clearing your browser's site data also removes saved preferences and work.`,
        },
      ],
    },
    {
      id: "contact",
      heading: "Contact",
      blocks: [{ type: "p", text: `Questions about cookies? Contact ${company.legalName} at ${company.email}.` }],
    },
  ],
};

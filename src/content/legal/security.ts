import { company } from "@/config/company";
import { routes, siteConfig } from "@/config/site";
import type { LegalDocument } from "@/content/legal/types";

const { name } = siteConfig;

export const securityPage: LegalDocument = {
  slug: "security",
  path: routes.security,
  navLabel: "Security",
  title: "Security & Data",
  metaTitle: "Security & Data Handling",
  description: `How ${name} protects your files and account: in-memory processing, on-device cleaning, encryption and minimal data.`,
  lead: `A privacy tool has to be trustworthy itself. Here is exactly what happens to a file when you use ${name}, and how we protect your account.`,
  highlights: [
    {
      title: "Processed, then gone",
      body: "Images are handled in memory and discarded after the response. Nothing is written to disk.",
    },
    {
      title: "On-device where possible",
      body: "PDFs, Office files, audio and video are cleaned in your browser and never uploaded.",
    },
    {
      title: "Encrypted in transit",
      body: "Every request uses HTTPS with HSTS, so files can't be read on the way.",
    },
  ],
  sections: [
    {
      id: "file-flow",
      heading: "What happens to a file",
      blocks: [
        {
          type: "table",
          columns: ["File type", "Where it is processed", "Kept?"],
          rows: [
            ["JPG, PNG, WebP, AVIF, GIF, TIFF", "Our servers, in memory (Mumbai region)", "No, discarded after the response"],
            ["PDF, Word, Excel, PowerPoint", "Your browser", "Never uploaded"],
            ["Audio and video", "Your browser", "Never uploaded"],
            ["Images and text sent to AI tools", "Cloudflare Workers AI", "Not stored by us"],
          ],
        },
        {
          type: "p",
          text: "Cleaned images are re-inspected before they are returned, so the result tells you how many tags were left, if any.",
        },
      ],
    },
    {
      id: "account",
      heading: "Account security",
      blocks: [
        {
          type: "list",
          items: [
            "Passwords are hashed with bcrypt. We never store or see your password.",
            "Sign-in sessions use a signed token in an HTTP-only, same-site cookie that expires after 7 days.",
            "Sign in with Google uses the authorization code flow with PKCE, and Google's ID token is verified against Google's public keys.",
            "Account pages check your session on the server for every request.",
          ],
        },
      ],
    },
    {
      id: "minimal-data",
      heading: "Minimal data by design",
      blocks: [
        {
          type: "list",
          items: [
            "Signed-out daily limits use a salted hash of the IP address, deleted after 48 hours.",
            `Analytics (${company.analyticsName}) sets no cookies and stores no IP addresses.`,
            "Saved work lives only in your browser for 24 hours.",
          ],
        },
      ],
    },
    {
      id: "infrastructure",
      heading: "Infrastructure",
      blocks: [
        {
          type: "p",
          text: "The site runs on Vercel in the Mumbai region with security headers including HSTS, X-Frame-Options and a strict referrer policy. Account data is stored in MongoDB Atlas. AI requests go to Cloudflare Workers AI.",
        },
      ],
    },
    {
      id: "report",
      heading: "Report a vulnerability",
      blocks: [
        {
          type: "callout",
          title: "Found something? Tell us",
          text: `Email ${company.email} with the details and steps to reproduce. Please give us reasonable time to fix the issue before sharing it publicly, and don't access other people's data while testing.`,
        },
      ],
    },
  ],
};

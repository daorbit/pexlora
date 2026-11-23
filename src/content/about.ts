import { AI_NAME } from "@/config/brand";
import { company } from "@/config/company";
import { DAILY_LIMITS, SESSION_RETENTION_HOURS } from "@/config/limits";
import { siteConfig } from "@/config/site";
import type { LegalSection } from "@/content/legal/types";

const { name } = siteConfig;

export const aboutCopy = {
  metaTitle: `About ${name}`,
  description: `${name} is a free toolkit for removing photo metadata and working with images, PDFs and documents, built by ${company.legalName} in ${company.country}.`,
  eyebrow: "About",
  title: "Free file tools that",
  highlight: "respect privacy.",
  lead: `${name} removes the hidden data in your files and handles the everyday jobs around them: compressing, resizing, converting and editing images, PDFs and documents. It is built by ${company.legalName}, a small product studio in ${company.country}.`,
  factsTitle: `${name} at a glance`,
  sections: [
    {
      id: "why",
      heading: `Why ${name} exists`,
      blocks: [
        {
          type: "p",
          text: "Photos and documents carry more than what you see. A phone photo can hold the GPS coordinates of your home, the camera serial number and the exact time it was taken. An AI image can carry the prompt and the generator's name. A Word file can carry the author's name and edit history.",
        },
        {
          type: "p",
          text: `Most people never see this data, and the tools that remove it are often desktop apps, command-line programs or sites that want an account first. ${name} puts the removal, and the tools people need right after it, on one free page that works on a phone.`,
        },
      ],
    },
    {
      id: "files",
      heading: "How your files are handled",
      blocks: [
        {
          type: "list",
          items: [
            "Removing and viewing metadata in JPG, PNG, WebP and HEIC photos runs in your browser, so the file never leaves your device. So do compressing and resizing those formats, and every PDF, Office, audio and video tool.",
            "AVIF, TIFF and GIF files, and the remaining image tools, upload the file to our server. It is processed in memory and our code does not save it.",
            `${AI_NAME} features (alt text, metadata explanations, AI text detection and the humanizer) send the content to Cloudflare Workers AI.`,
            `Results are kept in your browser for ${SESSION_RETENTION_HOURS} hours so you can come back to them, and Clear All removes them at once.`,
          ],
        },
        {
          type: "p",
          text: "The privacy policy and the security page describe this in full, including what is stored for accounts.",
        },
      ],
    },
    {
      id: "limits",
      heading: `What ${name} does not do`,
      blocks: [
        {
          type: "list",
          items: [
            "It removes metadata only. It does not remove pixel watermarks such as Google SynthID, which are part of the image itself.",
            "It does not claim to beat AI detectors, and the AI Humanizer's score is an estimate from writing signals.",
            "It does not read text from scanned PDFs (no OCR), and some layouts such as charts and text boxes are not converted.",
            "Exam photo presets follow published notices, but official specs change, so always check the latest notice.",
          ],
        },
      ],
    },
    {
      id: "funding",
      heading: "How it is funded",
      blocks: [
        {
          type: "p",
          text: `Every tool is free to use: ${DAILY_LIMITS.anonymous} files a day without an account and ${DAILY_LIMITS.user} with a free account. People who need more buy a Pro pass, a one-time payment with no subscription. ${name} shows no third-party ads; the only promotions are for other ${company.legalName} products, clearly labelled.`,
        },
      ],
    },
    {
      id: "who",
      heading: "Who builds it",
      blocks: [
        {
          type: "p",
          text: `${name} is made by ${company.legalName} in ${company.country}, which also builds ${company.analyticsName}, a cookie-free analytics tool. Every message sent through the contact page or by email is read by a person.`,
        },
      ],
    },
  ] satisfies LegalSection[],
  linksTitle: "More about how we work",
  links: {
    privacy: "Privacy policy",
    security: "Security and data",
    fileHandling: "How your files are handled",
    pricing: "Pricing",
    linkedin: "LinkedIn",
    instagram: "Instagram",
  },
};

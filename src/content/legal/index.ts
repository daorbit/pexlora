import { cookiePolicy } from "@/content/legal/cookies";
import { privacyPolicy } from "@/content/legal/privacy";
import { refundPolicy } from "@/content/legal/refund-policy";
import { securityPage } from "@/content/legal/security";
import { termsOfService } from "@/content/legal/terms";
import type { LegalDocument } from "@/content/legal/types";

export type { LegalBlock, LegalDocument } from "@/content/legal/types";

export const legalDocuments: LegalDocument[] = [privacyPolicy, termsOfService, refundPolicy, cookiePolicy, securityPage];

export const legalCopy = {
  eyebrow: "Legal",
  updated: (date: string) => `Last updated ${date}`,
  contents: "On this page",
  keyPoints: "The short version",
  questions: "Questions?",
  questionsBody: (company: string) => `${company} answers every privacy, legal and security message personally.`,
  email: "Email Us",
  contactForm: "Contact Form",
  operatedBy: (company: string) => `A product of ${company}`,
};

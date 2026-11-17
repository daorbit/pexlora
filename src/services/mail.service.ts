import "server-only";
import { randomUUID } from "node:crypto";
import { siteConfig } from "@/config/site";
import { env } from "@/lib/env";
import { accountExistsEmail } from "@/lib/mail/templates/account-exists";
import type { EmailContent } from "@/lib/mail/templates/layout";
import { passwordChangedEmail } from "@/lib/mail/templates/password-changed";
import { paymentReceiptEmail } from "@/lib/mail/templates/payment-receipt";
import { resetPasswordEmail } from "@/lib/mail/templates/reset-password";
import { verificationCodeEmail } from "@/lib/mail/templates/verification-code";
import { welcomeEmail } from "@/lib/mail/templates/welcome";
import { getMailTransport } from "@/lib/mail/transport";

type Recipient = { name: string; email: string };

export async function sendMail(to: string, content: EmailContent, options: { unique?: boolean } = {}) {
  await getMailTransport().sendMail({
    from: { name: siteConfig.name, address: env.smtp.from },
    to,
    subject: content.subject,
    html: content.html,
    text: content.text,
    headers: options.unique ? { "X-Entity-Ref-ID": randomUUID() } : undefined,
  });
}

async function sendQuietly(label: string, task: () => Promise<void>) {
  try {
    await task();
  } catch (error) {
    console.error(`Failed to send ${label} email`, error);
  }
}

export async function sendVerificationCodeEmail(email: string, code: string, expiresInMinutes: number) {
  await sendMail(email, verificationCodeEmail({ appUrl: env.appUrl, email, code, expiresInMinutes }), { unique: true });
}

export async function sendPasswordResetEmail(user: Recipient, resetUrl: string, expiresInMinutes: number) {
  await sendMail(user.email, resetPasswordEmail({ name: user.name, appUrl: env.appUrl, resetUrl, expiresInMinutes }));
}

export function sendWelcomeEmail(user: Recipient) {
  return sendQuietly("welcome", () => sendMail(user.email, welcomeEmail({ name: user.name, appUrl: env.appUrl })));
}

export function sendAccountExistsEmail(user: Recipient) {
  return sendQuietly("account exists", () => sendMail(user.email, accountExistsEmail({ name: user.name, appUrl: env.appUrl })));
}

export function sendPaymentReceiptEmail(
  user: Recipient,
  receipt: { planName: string; amount: string; paymentId: string; activeUntil: string | null },
) {
  return sendQuietly("payment receipt", () =>
    sendMail(user.email, paymentReceiptEmail({ name: user.name, appUrl: env.appUrl, ...receipt })),
  );
}

export function sendPasswordChangedEmail(user: Recipient) {
  return sendQuietly("password changed", () =>
    sendMail(user.email, passwordChangedEmail({ name: user.name, appUrl: env.appUrl })),
  );
}

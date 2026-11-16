import "server-only";
import { siteConfig } from "@/config/site";
import { env } from "@/lib/env";
import type { EmailContent } from "@/lib/mail/templates/layout";
import { welcomeEmail } from "@/lib/mail/templates/welcome";
import { getMailTransport } from "@/lib/mail/transport";

export async function sendMail(to: string, content: EmailContent) {
  await getMailTransport().sendMail({
    from: { name: siteConfig.name, address: env.smtp.from },
    to,
    subject: content.subject,
    html: content.html,
    text: content.text,
  });
}

export async function sendWelcomeEmail(user: { name: string; email: string }) {
  try {
    await sendMail(user.email, welcomeEmail({ name: user.name, appUrl: env.appUrl }));
  } catch (error) {
    console.error("Failed to send welcome email", error);
  }
}

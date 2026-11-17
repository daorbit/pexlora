import { DAILY_LIMITS } from "@/config/limits";
import { siteConfig } from "@/config/site";
import type { EmailContent } from "@/lib/mail/templates/layout";
import {
  brandLink,
  emailColors,
  emailDocument,
  emailFooterText,
  emailLabel,
  emailMono,
  escapeHtml,
} from "@/lib/mail/templates/email-parts";
import { maskEmail } from "@/lib/utils/mask-email";

type VerificationCodeEmailOptions = { appUrl: string; email: string; code: string; expiresInMinutes: number };

const passStyles = `
  .pass-stub { border-left: 0 !important; border-top: 2px dashed ${emailColors.pearl} !important; border-radius: 0 0 17px 17px !important; text-align: left !important; }
  .pass-main { border-radius: 17px 17px 0 0 !important; }
  .pass-fact { display: block !important; padding: 0 0 12px !important; }
`;

function fact(label: string, value: string) {
  return `<td class="pass-fact" valign="top" style="padding:0 22px 0 0;">
    ${emailLabel(label)}
    <p style="margin:0;font-size:14px;line-height:20px;font-weight:600;color:${emailColors.ink};">${escapeHtml(value)}</p>
  </td>`;
}

export function verificationCodeEmail({ appUrl, email, code, expiresInMinutes }: VerificationCodeEmailOptions): EmailContent {
  const validity = `${expiresInMinutes} minutes`;
  const plan = `Free · ${DAILY_LIMITS.user} files a day`;
  const masked = maskEmail(email);
  const reason = "Not you? Ignore this email. No account is created without the code.";
  const instruction = `Enter the code on the sign-up page. Never share it with anyone. ${siteConfig.name} will never ask you for it.`;

  const content = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;">
      <tr>
        <td class="stack pad pass-main" valign="top" style="background:${emailColors.card};border:1px solid ${emailColors.border};border-right:0;border-radius:17px 0 0 17px;padding:28px 26px;">
          ${brandLink(appUrl)}
          <h1 style="margin:20px 0 18px;font-size:22px;line-height:28px;font-weight:700;letter-spacing:-0.5px;color:${emailColors.ink};">Your sign-up pass</h1>
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr>
              ${fact("Email", masked)}
            </tr>
          </table>
          <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:14px;">
            <tr>
              ${fact("Plan", plan)}
              ${fact("Valid", validity)}
            </tr>
          </table>
          <p style="margin:18px 0 0;font-size:13px;line-height:20px;color:${emailColors.muted};">${escapeHtml(instruction)}</p>
        </td>
        <td class="stack pad pass-stub" width="190" valign="middle" style="width:190px;background:${emailColors.ink};border-left:2px dashed ${emailColors.pearl};border-radius:0 17px 17px 0;padding:26px 20px;">
          ${emailLabel("Code", emailColors.lime)}
          <p style="margin:2px 0 6px;font-family:${emailMono};font-size:34px;line-height:40px;font-weight:700;letter-spacing:3px;color:${emailColors.pearl};">${escapeHtml(code)}</p>
          <p style="margin:0;font-size:12px;line-height:18px;color:${emailColors.pearlMuted};">Valid for ${escapeHtml(validity)}</p>
        </td>
      </tr>
    </table>`;

  return {
    subject: `${code} is your ${siteConfig.name} verification code`,
    html: emailDocument({
      appUrl,
      title: "Your sign-up pass",
      preheader: `${code} is your code. It works for ${validity}.`,
      content,
      reason,
      styles: passStyles,
    }),
    text: [
      "Your sign-up pass",
      "",
      `Code: ${code}`,
      `Email: ${masked}`,
      `Plan: ${plan}`,
      `Valid: ${validity}`,
      "",
      instruction,
      "",
      ...emailFooterText(appUrl, reason),
    ].join("\n"),
  };
}

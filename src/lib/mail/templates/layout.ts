import {
  brandLink,
  emailButton,
  emailColors,
  emailDocument,
  emailFooterText,
  emailMono,
  escapeHtml,
  stripTags,
} from "@/lib/mail/templates/email-parts";

export { escapeHtml, firstName } from "@/lib/mail/templates/email-parts";

export type EmailContent = {
  subject: string;
  html: string;
  text: string;
};

type EmailLayoutOptions = {
  appUrl: string;
  preheader: string;
  heading: string;
  paragraphs: string[];
  code?: string;
  cta?: { label: string; url: string };
  note?: string;
  reason: string;
};

function paragraphHtml(text: string) {
  return `<p style="margin:0 0 16px;font-size:15px;line-height:24px;color:${emailColors.body};">${text}</p>`;
}

function codeHtml(code: string) {
  return `<p style="margin:8px 0 24px;"><span style="display:inline-block;padding:14px 22px;background:${emailColors.codeBg};border-radius:10px;font-family:${emailMono};font-size:30px;line-height:36px;font-weight:600;letter-spacing:8px;color:${emailColors.ink};">${escapeHtml(code)}</span></p>`;
}

export function renderEmail({ appUrl, preheader, heading, paragraphs, code, cta, note, reason }: EmailLayoutOptions) {
  const content = `
    <p style="margin:0;padding:0 6px 18px;">${brandLink(appUrl)}</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;">
      <tr>
        <td class="pad" style="background:${emailColors.card};border:1px solid ${emailColors.border};border-radius:18px;padding:34px 30px 18px;">
          <h1 style="margin:0 0 16px;font-size:23px;line-height:29px;font-weight:700;letter-spacing:-0.4px;color:${emailColors.ink};">${escapeHtml(heading)}</h1>
          ${paragraphs.map(paragraphHtml).join("")}
          ${code ? codeHtml(code) : ""}
          ${cta ? `<p style="margin:8px 0 24px;">${emailButton(cta)}</p>` : ""}
          ${note ? `<p style="margin:0 0 16px;font-size:13px;line-height:20px;color:${emailColors.muted};">${note}</p>` : ""}
        </td>
      </tr>
    </table>`;

  const html = emailDocument({ appUrl, title: heading, preheader, content, reason });

  const text = [
    heading,
    "",
    ...paragraphs.map(stripTags).flatMap((paragraph) => [paragraph, ""]),
    ...(code ? [code, ""] : []),
    ...(cta ? [`${cta.label}: ${cta.url}`, ""] : []),
    ...(note ? [stripTags(note), ""] : []),
    ...emailFooterText(appUrl, reason),
  ].join("\n");

  return { html, text };
}

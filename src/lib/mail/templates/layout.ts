import { brandAssets } from "@/config/brand";
import { siteConfig } from "@/config/site";

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
  cta?: { label: string; url: string };
  footnote?: string;
};

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const colors = {
  paper: "#f5f5f7",
  surface: "#ffffff",
  ink: "#1d1d1f",
  muted: "#6e6e73",
  border: "#e5e5ea",
  accent: "#0071e3",
};

export function renderEmail({ appUrl, preheader, heading, paragraphs, cta, footnote }: EmailLayoutOptions) {
  const body = paragraphs
    .map((text) => `<p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:${colors.ink};">${text}</p>`)
    .join("");

  const button = cta
    ? `<p style="margin:24px 0;"><a href="${cta.url}" style="display:inline-block;background:${colors.accent};color:#ffffff;text-decoration:none;font-weight:500;font-size:15px;padding:12px 22px;border-radius:980px;">${escapeHtml(cta.label)}</a></p>`
    : "";

  const note = footnote
    ? `<p style="margin:24px 0 0;padding-top:16px;border-top:1px solid ${colors.border};font-size:12px;line-height:1.6;color:${colors.muted};">${footnote}</p>`
    : "";

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:${colors.paper};font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;">
    <span style="display:none;max-height:0;overflow:hidden;">${escapeHtml(preheader)}</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${colors.paper};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:${colors.surface};border-radius:18px;">
            <tr>
              <td style="padding:28px 32px 8px;">
                <p style="margin:0 0 24px;font-size:17px;font-weight:600;color:${colors.ink};">
                  <img src="${appUrl}${brandAssets.emailIcon}" width="28" height="28" alt="" style="vertical-align:middle;margin-right:8px;border-radius:7px;" />${escapeHtml(siteConfig.name)}
                </p>
                <h1 style="margin:0 0 20px;font-size:24px;line-height:1.2;color:${colors.ink};">${escapeHtml(heading)}</h1>
                ${body}
                ${button}
                ${note}
              </td>
            </tr>
            <tr><td style="padding:0 32px 28px;"></td></tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    heading,
    "",
    ...paragraphs.map((paragraph) => paragraph.replace(/<[^>]+>/g, "")),
    cta ? `\n${cta.label}: ${cta.url}` : "",
    footnote ? `\n${footnote.replace(/<[^>]+>/g, "")}` : "",
  ].join("\n");

  return { html, text };
}

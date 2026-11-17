import { brandAssets } from "@/config/brand";
import { company } from "@/config/company";
import { routes, siteConfig } from "@/config/site";

export const emailColors = {
  page: "#f4f3ee",
  card: "#ffffff",
  border: "#e7e5dd",
  divider: "#efede6",
  ink: "#10120d",
  body: "#3d4037",
  muted: "#7a7d73",
  pearl: "#f4f3ee",
  pearlMuted: "#bfc2b8",
  lime: "#b9f12f",
  codeBg: "#f4f3ee",
};

export const emailFont =
  "-apple-system,BlinkMacSystemFont,'SF Pro Text','SF Pro Display',Inter,'Helvetica Neue',Helvetica,Arial,sans-serif";
export const emailMono = "'Geist Mono',ui-monospace,'SF Mono',SFMono-Regular,Menlo,Consolas,monospace";

const emailFontsUrl = "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Geist+Mono:wght@600;700&display=swap";

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || name;
}

export const stripTags = (value: string) => value.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ");

export function emailLabel(text: string, color: string = emailColors.muted) {
  return `<p style="margin:0 0 4px;font-family:${emailMono};font-size:10.5px;line-height:14px;font-weight:600;letter-spacing:1.4px;text-transform:uppercase;color:${color};">${escapeHtml(text)}</p>`;
}

export function brandLink(appUrl: string, tone: "light" | "ink" = "light") {
  const color = tone === "ink" ? emailColors.pearl : emailColors.ink;
  const href = escapeHtml(appUrl);
  return `<table role="presentation" cellpadding="0" cellspacing="0"><tr>
    <td valign="middle" style="padding-right:10px;"><a href="${href}"><img src="${href}${brandAssets.emailMark}" width="32" height="32" alt="" style="display:block;border:0;" /></a></td>
    <td valign="middle"><a href="${href}" style="text-decoration:none;font-size:20px;line-height:24px;font-weight:700;letter-spacing:-0.4px;color:${color};">${escapeHtml(siteConfig.name)}</a></td>
  </tr></table>`;
}

export function emailButton({ label, url }: { label: string; url: string }, variant: "ink" | "lime" = "ink") {
  const background = variant === "ink" ? emailColors.ink : emailColors.lime;
  const color = variant === "ink" ? emailColors.pearl : emailColors.ink;
  return `<a href="${escapeHtml(url)}" style="display:inline-block;background:${background};color:${color};text-decoration:none;font-size:15px;line-height:20px;font-weight:600;padding:14px 22px;border-radius:12px;">${escapeHtml(label)}</a>`;
}

export function emailFooterText(appUrl: string, reason: string) {
  return ["--", reason, `${siteConfig.name} by ${company.legalName}, ${company.country}`, `${appUrl}${routes.privacy}`];
}

type EmailDocumentOptions = {
  appUrl: string;
  title: string;
  preheader: string;
  content: string;
  reason: string;
  styles?: string;
};

export function emailDocument({ appUrl, title, preheader, content, reason, styles = "" }: EmailDocumentOptions) {
  const privacyUrl = `${appUrl}${routes.privacy}`;
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <meta name="supported-color-schemes" content="light" />
    <title>${escapeHtml(title)}</title>
    <link rel="stylesheet" href="${emailFontsUrl}" />
    <style>
      body, table, td, p, a, span, h1 { font-family: ${emailFont}; }
      @media (max-width: 520px) {
        .stack { display: block !important; width: 100% !important; box-sizing: border-box; }
        .pad { padding-left: 22px !important; padding-right: 22px !important; }
        ${styles}
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background:${emailColors.page};font-family:${emailFont};-webkit-font-smoothing:antialiased;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${emailColors.page};">
      <tr>
        <td align="center" style="padding:36px 12px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
            <tr>
              <td>${content}</td>
            </tr>
            <tr>
              <td style="padding:20px 6px 0;font-size:12px;line-height:18px;color:${emailColors.muted};">
                <p style="margin:0 0 6px;">${escapeHtml(reason)}</p>
                <p style="margin:0;">${escapeHtml(siteConfig.name)} by ${escapeHtml(company.legalName)}, ${escapeHtml(company.country)} · <a href="${escapeHtml(privacyUrl)}" style="color:${emailColors.muted};">Privacy</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

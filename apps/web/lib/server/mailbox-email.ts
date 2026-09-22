// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

export type MailLocale = "es" | "en";

export type ConfirmationEmail = {
  subject: string;
  text: string;
  html: string;
};

const ROSE = "#c45368";
const INK = "#3c3336";
const PAGE = "#f6f1f2";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function textFor(locale: MailLocale, code: string): { subject: string; paragraphs: string[] } {
  if (locale === "en") {
    return {
      subject: "Your OpenCiclo confirmation code",
      paragraphs: [
        `Your code to confirm this email is yours: ${code}`,
        "It expires in 15 minutes.",
        "This message only checks that the address is yours before the account is created. It does not open the diary.",
        "We do not use this email to track you, for advertising, or to measure how you use Ciclo. The code is not a link and it does not sign you in.",
        "If you forget the password, it cannot be recovered. This email cannot reset it or send it to you. If you also lose the 12-word phrase, the diary cannot be opened. That is on purpose: not even we can read it.",
        "If you did not create an OpenCiclo account, you can ignore this message.",
      ],
    };
  }

  return {
    subject: "Tu código de confirmación de OpenCiclo",
    paragraphs: [
      `Tu código para confirmar que este email es tuyo: ${code}`,
      "Caduca en 15 minutos.",
      "Este mensaje solo comprueba que la dirección es tuya antes de crear la cuenta. No abre el diario.",
      "No usamos este email para rastrearte, para publicidad ni para medir cómo usas Ciclo. El código no es un enlace y no inicia sesión.",
      "Si olvidas la contraseña, no se puede recuperar. Este email no la resetea ni te la envía. Si además pierdes la frase de 12 palabras, el diario no se puede abrir. Es así a propósito: ni siquiera nosotras podemos leerlo.",
      "Si no creaste una cuenta en OpenCiclo, puedes ignorar este mensaje.",
    ],
  };
}

function htmlFor(locale: MailLocale, code: string, paragraphs: string[]): string {
  const intro = paragraphs[0] ?? "";
  const rest = paragraphs.slice(1);
  const safeCode = escapeHtml(code);
  const lang = locale === "en" ? "en" : "es";
  const blocks = rest
    .map(
      (paragraph) =>
        `<p style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.5;color:${INK};">${escapeHtml(paragraph)}</p>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="${lang}">
<body style="margin:0;padding:0;background:${PAGE};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAGE};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#ffffff;border-radius:20px;">
          <tr>
            <td style="padding:28px 32px 8px;" align="center">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="36" height="36" align="center" valign="middle" style="width:36px;height:36px;background:${ROSE};border-radius:18px;">
                    <div style="width:12px;height:12px;background:#fff7f8;border-radius:6px;font-size:0;line-height:0;">&nbsp;</div>
                  </td>
                  <td style="padding-left:12px;font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:1;color:${INK};">OpenCiclo</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 28px;">
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.5;color:${INK};">${escapeHtml(intro.replace(`: ${code}`, ""))}</p>
              <p style="margin:20px 0 8px;font-family:Georgia,'Times New Roman',serif;font-size:36px;letter-spacing:6px;line-height:1.2;color:${ROSE};">${safeCode}</p>
              ${blocks}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function confirmationEmail(locale: MailLocale, code: string): ConfirmationEmail {
  const { subject, paragraphs } = textFor(locale, code);
  return {
    subject,
    text: ["OpenCiclo", "", ...paragraphs].join("\n\n"),
    html: htmlFor(locale, code, paragraphs),
  };
}

// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import nodemailer from "nodemailer";
import { Resend } from "resend";

import { mailFrom } from "@/lib/server/env";
import { confirmationEmail, type MailLocale } from "@/lib/server/mailbox-email";

export function mailTransportConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim() || process.env.SMTP_HOST?.trim());
}

export async function sendMail(to: string, subject: string, text: string, html?: string): Promise<void> {
  const from = mailFrom();
  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (resendKey) {
    const resend = new Resend(resendKey);
    const result = await resend.emails.send({ from, to, subject, text, html });
    if (result.error) {
      throw new Error("Mail send failed");
    }
    return;
  }

  const host = process.env.SMTP_HOST?.trim();
  if (host) {
    const port = Number.parseInt(process.env.SMTP_PORT ?? "587", 10);
    const transporter = nodemailer.createTransport({
      host,
      port: Number.isFinite(port) ? port : 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS ?? "" }
        : undefined,
    });
    await transporter.sendMail({ from, to, subject, text, html });
    return;
  }

  throw new Error("Mail is not configured");
}

export async function sendMailboxCode(to: string, code: string, locale: MailLocale): Promise<void> {
  const message = confirmationEmail(locale, code);
  await sendMail(to, message.subject, message.text, message.html);
}

// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import nodemailer from "nodemailer";
import { Resend } from "resend";

import { mailFrom } from "@/lib/server/env";

export function mailTransportConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim() || process.env.SMTP_HOST?.trim());
}

export async function sendMail(to: string, subject: string, text: string): Promise<void> {
  const from = mailFrom();
  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (resendKey) {
    const resend = new Resend(resendKey);
    const result = await resend.emails.send({ from, to, subject, text });
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
    await transporter.sendMail({ from, to, subject, text });
    return;
  }

  throw new Error("Mail is not configured");
}

export async function sendMailboxCode(to: string, code: string, locale: "es" | "en"): Promise<void> {
  if (locale === "en") {
    await sendMail(
      to,
      "Your Ciclo confirmation code",
      [
        `Your Ciclo confirmation code is ${code}.`,
        "",
        "It expires in 15 minutes. This only proves the inbox is yours. It does not open the diary or change your password.",
        "",
        "If you did not create a Ciclo account, ignore this message.",
      ].join("\n"),
    );
    return;
  }

  await sendMail(
    to,
    "Tu código de confirmación de Ciclo",
    [
      `Tu código de confirmación de Ciclo es ${code}.`,
      "",
      "Caduca en 15 minutos. Solo demuestra que el buzón es tuyo. No abre el diario ni cambia tu contraseña.",
      "",
      "Si no creaste una cuenta en Ciclo, ignora este mensaje.",
    ].join("\n"),
  );
}

// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { afterEach, describe, expect, it } from "vitest";

import { mailTransportConfigured } from "./mail";

describe("mail transport", () => {
  const previous = {
    resend: process.env.RESEND_API_KEY,
    smtp: process.env.SMTP_HOST,
  };

  afterEach(() => {
    if (previous.resend === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = previous.resend;
    if (previous.smtp === undefined) delete process.env.SMTP_HOST;
    else process.env.SMTP_HOST = previous.smtp;
  });

  it("is unconfigured when neither Resend nor SMTP is set", () => {
    delete process.env.RESEND_API_KEY;
    delete process.env.SMTP_HOST;
    expect(mailTransportConfigured()).toBe(false);
  });

  it("accepts Resend or SMTP", () => {
    delete process.env.SMTP_HOST;
    process.env.RESEND_API_KEY = "re_test";
    expect(mailTransportConfigured()).toBe(true);
    delete process.env.RESEND_API_KEY;
    process.env.SMTP_HOST = "mailpit";
    expect(mailTransportConfigured()).toBe(true);
  });
});

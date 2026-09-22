// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it } from "vitest";

import { confirmationEmail } from "./mailbox-email";

describe("confirmation email", () => {
  it("writes Spanish when the interface locale is es", () => {
    const message = confirmationEmail("es", "483225");
    expect(message.subject).toContain("OpenCiclo");
    expect(message.text).toContain("este email es tuyo");
    expect(message.text).toContain("483225");
    expect(message.text).toContain("no se puede recuperar");
    expect(message.text).toContain("rastrearte");
    expect(message.text.toLowerCase()).not.toContain("buzón");
    expect(message.html).toContain("OpenCiclo");
    expect(message.html).toContain("483225");
    expect(message.html).not.toContain("<a ");
    expect(message.html).not.toContain("http");
  });

  it("writes English when the interface locale is en", () => {
    const message = confirmationEmail("en", "111111");
    expect(message.subject).toBe("Your OpenCiclo confirmation code");
    expect(message.text).toContain("this email is yours");
    expect(message.text).toContain("cannot be recovered");
    expect(message.text).toContain("do not use this email to track you");
    expect(message.text).not.toContain("Caduca");
    expect(message.html).toContain('lang="en"');
    expect(message.html).toContain("111111");
  });
});

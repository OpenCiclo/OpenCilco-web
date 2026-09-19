// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { clearSessionCookie } from "@/lib/server/session";

export async function POST() {
  await clearSessionCookie();
  return Response.json({ ok: true });
}

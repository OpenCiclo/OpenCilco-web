// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Once app.openciclo.com points at this deployment, requests to that host
// for "/" are transparently rewritten to "/app" (the calendar/home screen),
// while openciclo.com keeps "/" as the marketing landing page. Every other
// path (e.g. /diary, /settings, /learn) already resolves the same on both
// hosts, so no rewrite is needed for them.
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const isAppSubdomain = host.startsWith("app.");

  if (isAppSubdomain && request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/app";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};

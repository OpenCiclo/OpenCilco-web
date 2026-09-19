// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { notFound } from "next/navigation";

import { SeasonPlaygroundClient } from "./season-playground-client";

export const metadata = {
  title: "Season cards · playground",
  robots: { index: false, follow: false },
};

export default function DevSeasonsPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <SeasonPlaygroundClient />;
}

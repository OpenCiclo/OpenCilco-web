// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { notFound } from "next/navigation";

import { ConsoleForbidden } from "@/components/console/console-forbidden";
import { LearnEditor } from "@/components/console/learn-editor";
import { requireConsolePage } from "@/lib/server/console";
import { loadLearnEditorPayload } from "@/lib/server/learn-articles";

export const dynamic = "force-dynamic";

export default async function ConsoleLearnEditorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const access = await requireConsolePage(`/console/learn/${slug}`);
  if (!access.ok) return <ConsoleForbidden />;
  const payload = await loadLearnEditorPayload(slug);
  if (!payload) notFound();
  return <LearnEditor initial={payload} />;
}

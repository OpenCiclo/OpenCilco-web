// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { jsonError } from "@/lib/server/env";
import { requireConsoleApi } from "@/lib/server/console";
import { deleteLearnArticle, loadLearnEditorPayload, parseUpsertLearnInput, upsertLearnArticle } from "@/lib/server/learn-articles";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const access = await requireConsoleApi();
  if (!access.ok) return access.response;
  const { slug } = await params;
  const payload = await loadLearnEditorPayload(slug);
  if (!payload) return jsonError("Not found", 404);
  return Response.json(payload);
}

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const access = await requireConsoleApi();
  if (!access.ok) return access.response;
  const { slug: pathSlug } = await params;
  const body = (await request.json()) as {
    slug?: string;
    category?: string;
    reviewedAt?: string;
    status?: string;
    sources?: unknown;
    es?: unknown;
    en?: unknown;
  };
  const slug = pathSlug === "new" ? body.slug?.trim() ?? "" : pathSlug;
  const parsed = parseUpsertLearnInput({
    slug,
    category: body.category ?? "",
    reviewedAt: body.reviewedAt ?? "",
    status: body.status ?? "draft",
    sources: body.sources,
    es: body.es,
    en: body.en,
  });
  if (!parsed.ok) return jsonError(parsed.error, 400);
  await upsertLearnArticle(parsed.entry);
  return Response.json({ ok: true, slug: parsed.entry.slug });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const access = await requireConsoleApi();
  if (!access.ok) return access.response;
  const { slug } = await params;
  const deleted = await deleteLearnArticle(slug);
  if (!deleted) return jsonError("Not found", 404);
  return Response.json({ ok: true });
}

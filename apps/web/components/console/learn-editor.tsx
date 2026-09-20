// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useCiclo } from "@/lib/client/ciclo-context";
import { consoleCopy } from "@/lib/console/copy";
import { LEARN_CATEGORIES, isLearnCategory, type LearnArticle, type LearnArticleCopy, type LearnCategory } from "@/lib/learn/articles";
import { isLearnSlug, isPublishReady, type LearnEditorPayload } from "@/lib/learn/catalog";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type LocaleTab = "es" | "en";

function asArticle(payload: LearnEditorPayload): LearnArticle {
  const article = payload.article;
  return {
    slug: article.slug,
    category: article.category as LearnCategory,
    reviewedAt: article.reviewedAt,
    sources: article.sources ?? [{ label: "", href: "" }],
    es: article.es ?? { title: "", summary: "", sections: [{ heading: "", body: "" }], notice: "" },
    en: article.en ?? { title: "", summary: "", sections: [{ heading: "", body: "" }], notice: "" },
  };
}

export function LearnEditor({ initial }: { initial: LearnEditorPayload }) {
  const router = useRouter();
  const { locale } = useCiclo();
  const copy = consoleCopy(locale);
  const [slug, setSlug] = useState(initial.article.slug);
  const [category, setCategory] = useState<LearnCategory>(
    isLearnCategory(initial.article.category) ? initial.article.category : "cycle",
  );
  const [reviewedAt, setReviewedAt] = useState(initial.article.reviewedAt);
  const [sources, setSources] = useState(asArticle(initial).sources);
  const [es, setEs] = useState<LearnArticleCopy>(asArticle(initial).es);
  const [en, setEn] = useState<LearnArticleCopy>(asArticle(initial).en);
  const [tab, setTab] = useState<LocaleTab>("es");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const draftPayload = {
    slug: initial.isNew ? slug.trim() : initial.slug,
    category,
    reviewedAt,
    sources,
    es,
    en,
  };

  async function save(status: "draft" | "published") {
    const targetSlug = draftPayload.slug;
    if (!isLearnSlug(targetSlug)) {
      setError(copy.publishBlocked);
      return;
    }
    if (status === "published" && !isPublishReady(draftPayload)) {
      setError(copy.publishBlocked);
      return;
    }
    try {
      setBusy(true);
      setError(null);
      setMessage(null);
      const response = await fetch(`/api/console/learn/${targetSlug}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...draftPayload, status }),
      });
      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        setError(body?.error === "Article is not ready to publish" ? copy.publishBlocked : copy.errorGeneric);
        return;
      }
      setMessage(copy.saved);
      if (initial.isNew) {
        router.push(`/console/learn/${targetSlug}`);
        router.refresh();
        return;
      }
      router.refresh();
    } catch {
      setError(copy.errorGeneric);
    } finally {
      setBusy(false);
    }
  }

  async function removeRow() {
    if (!initial.slug || initial.origin !== "database") return;
    if (!window.confirm(copy.confirmDelete)) return;
    try {
      setBusy(true);
      const response = await fetch(`/api/console/learn/${initial.slug}`, { method: "DELETE" });
      if (!response.ok) {
        setError(copy.errorGeneric);
        return;
      }
      router.push("/console/learn");
      router.refresh();
    } catch {
      setError(copy.errorGeneric);
    } finally {
      setBusy(false);
    }
  }

  const localeCopy = tab === "es" ? es : en;
  const setLocaleCopy = tab === "es" ? setEs : setEn;

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(event) => {
        event.preventDefault();
        void save("draft");
      }}
    >
      <div className="flex items-center justify-between gap-4">
        <Link href="/console/learn" className="text-sm font-semibold text-primary underline">
          {copy.backToList}
        </Link>
      </div>
      <div className="grid gap-4">
        <div>
          <Label htmlFor="learn-slug">{copy.slug}</Label>
          <Input
            id="learn-slug"
            className="mt-1"
            value={slug}
            disabled={!initial.isNew}
            onChange={(event) => setSlug(event.target.value.toLowerCase())}
          />
        </div>
        <div>
          <Label htmlFor="learn-category">{copy.category}</Label>
          <select
            id="learn-category"
            className="mt-1 flex min-h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-base md:text-sm"
            value={category}
            onChange={(event) => setCategory(event.target.value as LearnCategory)}
          >
            {LEARN_CATEGORIES.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="learn-reviewed">{copy.reviewedAt}</Label>
          <Input
            id="learn-reviewed"
            type="date"
            className="mt-1"
            value={reviewedAt}
            onChange={(event) => setReviewedAt(event.target.value)}
          />
        </div>
      </div>

      <div>
        <p className="text-sm font-medium">{copy.sources}</p>
        <div className="mt-2 flex flex-col gap-3">
          {sources.map((source, index) => (
            <div key={index} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
              <Input
                placeholder={copy.sourceLabel}
                value={source.label}
                onChange={(event) => {
                  const next = [...sources];
                  next[index] = { ...next[index], label: event.target.value };
                  setSources(next);
                }}
              />
              <Input
                placeholder={copy.sourceHref}
                value={source.href}
                onChange={(event) => {
                  const next = [...sources];
                  next[index] = { ...next[index], href: event.target.value };
                  setSources(next);
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => setSources(sources.filter((_, sourceIndex) => sourceIndex !== index))}
              >
                {copy.remove}
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={() => setSources([...sources, { label: "", href: "" }])}>
            {copy.addSource}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button type="button" variant={tab === "es" ? "default" : "outline"} onClick={() => setTab("es")}>
          {copy.localeEs}
        </Button>
        <Button type="button" variant={tab === "en" ? "default" : "outline"} onClick={() => setTab("en")}>
          {copy.localeEn}
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="learn-title">{copy.titleField}</Label>
        <Input
          id="learn-title"
          value={localeCopy.title}
          onChange={(event) => setLocaleCopy({ ...localeCopy, title: event.target.value })}
        />
        <Label htmlFor="learn-summary">{copy.summary}</Label>
        <Textarea
          id="learn-summary"
          value={localeCopy.summary}
          onChange={(event) => setLocaleCopy({ ...localeCopy, summary: event.target.value })}
        />
        {localeCopy.sections.map((section, index) => (
          <div key={index} className="rounded-2xl border border-border p-4">
            <Label>{copy.heading}</Label>
            <Input
              className="mt-1"
              value={section.heading}
              onChange={(event) => {
                const sections = [...localeCopy.sections];
                sections[index] = { ...sections[index], heading: event.target.value };
                setLocaleCopy({ ...localeCopy, sections });
              }}
            />
            <Label className="mt-3 block">{copy.body}</Label>
            <Textarea
              className="mt-1"
              value={section.body}
              onChange={(event) => {
                const sections = [...localeCopy.sections];
                sections[index] = { ...sections[index], body: event.target.value };
                setLocaleCopy({ ...localeCopy, sections });
              }}
            />
            <Button
              type="button"
              variant="outline"
              className="mt-3"
              onClick={() =>
                setLocaleCopy({
                  ...localeCopy,
                  sections: localeCopy.sections.filter((_, sectionIndex) => sectionIndex !== index),
                })
              }
            >
              {copy.remove}
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => setLocaleCopy({ ...localeCopy, sections: [...localeCopy.sections, { heading: "", body: "" }] })}
        >
          {copy.addSection}
        </Button>
        <Label htmlFor="learn-notice">{copy.notice}</Label>
        <Textarea
          id="learn-notice"
          value={localeCopy.notice}
          onChange={(event) => setLocaleCopy({ ...localeCopy, notice: event.target.value })}
        />
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" variant="outline" disabled={busy}>
          {copy.saveDraft}
        </Button>
        <Button type="button" disabled={busy} onClick={() => void save("published")}>
          {copy.publish}
        </Button>
      </div>
      {initial.origin === "database" ? (
        <div>
          <p className="text-xs text-muted-foreground">{copy.deleteHint}</p>
          <Button type="button" variant="destructive" className="mt-2" disabled={busy} onClick={() => void removeRow()}>
            {copy.deleteOverride}
          </Button>
        </div>
      ) : null}
    </form>
  );
}

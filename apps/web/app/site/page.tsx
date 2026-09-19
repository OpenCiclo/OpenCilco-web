// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Cpu,
  Download,
  EyeOff,
  FileText,
  KeyRound,
  Lock,
  MessageCircle,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { useCiclo } from "@/lib/client/ciclo-context";
import { marketingCopy, MARKETING_LINKS } from "@/lib/marketing/copy";
import { LEARN_ARTICLES, articleCopy } from "@/lib/learn/articles";
import { Reveal } from "@/components/marketing/reveal";
import { AppDemo } from "@/components/marketing/app-demo";
import { GithubMark } from "@/components/marketing/github-mark";
import { TypewriterTitle } from "@/components/marketing/typewriter-title";

type IconComponent = (props: { className?: string }) => React.ReactNode;

const ICONS: Record<string, IconComponent> = {
  lock: Lock as IconComponent,
  "eye-off": EyeOff as IconComponent,
  "key-round": KeyRound as IconComponent,
  github: GithubMark,
  cpu: Cpu as IconComponent,
  download: Download as IconComponent,
  "file-text": FileText as IconComponent,
  "book-open": BookOpen as IconComponent,
  "message-circle": MessageCircle as IconComponent,
};

export default function SitePage() {
  const { locale } = useCiclo();
  const copy = marketingCopy(locale);
  const featured = LEARN_ARTICLES.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 h-72 bg-gradient-to-b from-secondary/50 to-transparent"
        />
        <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-5 pt-14 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pt-20 lg:pb-24">
          <div className="animate-fade-up flex flex-col items-start gap-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground">
              <ShieldCheck className="size-4 text-primary" />
              {copy.hero.eyebrow}
            </span>
            <h1 className="flex min-h-[6.3rem] flex-col justify-end font-serif text-5xl leading-[1.05] tracking-tight text-balance sm:min-h-[7.875rem] sm:text-6xl">
              <TypewriterTitle
                lines={
                  locale === "es"
                    ? [
                        "Tu ciclo, en tu dispositivo.",
                        "Tu ciclo, privado.",
                        "Tu ciclo, bajo tu control.",
                        "Tu ciclo, tuyo.",
                      ]
                    : [
                        "Your cycle, on your device.",
                        "Your cycle, private.",
                        "Your cycle, under your control.",
                        "Your cycle, yours.",
                      ]
                }
              />
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">
              {copy.hero.subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={MARKETING_LINKS.app}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-base font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                {copy.hero.ctaPrimary}
                <ArrowRight className="size-4" />
              </Link>
              <a
                href={MARKETING_LINKS.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 text-base font-semibold text-foreground transition-colors hover:bg-accent"
              >
                <GithubMark className="size-4" />
                {copy.hero.ctaSecondary}
              </a>
            </div>
            <p className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
              {copy.hero.disclaimer}
            </p>
          </div>

                <div className="flex w-full justify-center lg:justify-end lg:pb-0 lg:[margin-bottom:-2.5rem]">
                  <AppDemo locale={locale} />
                </div>
        </div>
      </section>

      {/* Why / Privacy */}
      <section id="privacidad" className="scroll-mt-20 border-t border-border/60 bg-card/30">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 lg:py-24">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-primary uppercase">{copy.why.eyebrow}</p>
            <h2 className="mt-3 font-serif text-3xl tracking-tight text-balance sm:text-4xl">{copy.why.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground">{copy.why.subtitle}</p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {copy.why.features.map((feature, index) => {
              const Icon = ICONS[feature.icon] ?? ShieldCheck;
              return (
                <Reveal
                  key={feature.title}
                  delay={index * 60}
                  className="group flex flex-col gap-3 rounded-3xl border border-border bg-card p-6 shadow-sm transition-transform hover:-translate-y-1"
                >
                  <span className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="font-serif text-xl text-card-foreground">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{feature.body}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 lg:py-24">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-primary uppercase">{copy.how.eyebrow}</p>
            <h2 className="mt-3 font-serif text-3xl tracking-tight text-balance sm:text-4xl">{copy.how.title}</h2>
          </Reveal>

          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {copy.how.steps.map((step, index) => (
              <Reveal
                key={step.title}
                as="li"
                delay={index * 70}
                className="relative flex flex-col gap-3 rounded-3xl border border-border bg-card p-6 shadow-sm"
              >
                <span className="font-serif text-3xl text-primary/40">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="font-serif text-lg text-card-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Science / the model */}
      <section className="border-y border-border/60 bg-secondary/30">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-24">
          <Reveal>
            <p className="text-xs font-semibold tracking-wide text-primary uppercase">{copy.science.eyebrow}</p>
            <h2 className="mt-3 font-serif text-3xl tracking-tight text-balance sm:text-4xl">{copy.science.title}</h2>
          </Reveal>
          <Reveal delay={80} className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-7 shadow-sm">
            <p className="text-base leading-relaxed text-pretty text-muted-foreground">{copy.science.body}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={MARKETING_LINKS.docs}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
              >
                {copy.science.docsLink}
                <ArrowRight className="size-4" />
              </Link>
              <a
                href={MARKETING_LINKS.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                {copy.science.modelLink}
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Learn */}
      <section>
        <div className="mx-auto w-full max-w-6xl px-5 py-16 lg:py-24">
          <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wide text-primary uppercase">{copy.learn.eyebrow}</p>
              <h2 className="mt-3 font-serif text-3xl tracking-tight text-balance sm:text-4xl">{copy.learn.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground">
                {copy.learn.subtitle}
              </p>
            </div>
            <Link
              href={MARKETING_LINKS.learn}
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              {copy.learn.cta}
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {featured.map((article, index) => {
              const article_copy = articleCopy(article, locale);
              return (
                <Reveal key={article.slug} delay={index * 70} as="div">
                  <Link
                    href={`/learn/${article.slug}`}
                    className="flex h-full flex-col gap-2 rounded-3xl border border-border bg-card p-6 shadow-sm transition-transform hover:-translate-y-1"
                  >
                    <BookOpen className="size-5 text-primary" />
                    <h3 className="mt-1 font-serif text-xl text-card-foreground">{article_copy.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{article_copy.summary}</p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="border-t border-border/60 bg-card/30">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 lg:py-24">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-primary uppercase">{copy.resources.eyebrow}</p>
            <h2 className="mt-3 font-serif text-3xl tracking-tight text-balance sm:text-4xl">
              {copy.resources.title}
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {copy.resources.items.map((item, index) => {
              const Icon = ICONS[item.icon] ?? FileText;
              const inner = (
                <>
                  <span className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 flex items-center gap-1.5 font-serif text-lg text-card-foreground">
                    {item.title}
                    {item.external ? <ArrowUpRight className="size-4 text-muted-foreground" /> : null}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </>
              );
              const className =
                "flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-sm transition-transform hover:-translate-y-1";
              return (
                <Reveal key={item.title} delay={index * 60} as="div">
                  {item.external ? (
                    <a href={item.href} target="_blank" rel="noreferrer" className={className}>
                      {inner}
                    </a>
                  ) : (
                    <Link href={item.href} className={className}>
                      {inner}
                    </Link>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto w-full max-w-6xl px-5 py-16 lg:py-24">
        <Reveal className="relative overflow-hidden rounded-4xl border border-primary/20 bg-primary/5 p-10 text-center sm:p-16">
          <h2 className="font-serif text-3xl tracking-tight text-balance sm:text-4xl">{copy.finalCta.title}</h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-pretty text-muted-foreground">
            {copy.finalCta.body}
          </p>
          <Link
            href={MARKETING_LINKS.app}
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-primary px-8 text-base font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            {copy.finalCta.button}
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}

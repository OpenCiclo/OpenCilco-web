// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

"use client";

import Link from "next/link";
import { ArrowUpRight, Info, MessageCircle } from "lucide-react";

import { useCiclo } from "@/lib/client/ciclo-context";
import { marketingCopy } from "@/lib/marketing/copy";
import { Reveal } from "@/components/marketing/reveal";
import { GithubMark } from "@/components/marketing/github-mark";

type IconComponent = (props: { className?: string }) => React.ReactNode;

const ICONS: Record<string, IconComponent> = {
  "message-circle": MessageCircle as IconComponent,
  github: GithubMark,
};

export default function ContactPage() {
  const { locale } = useCiclo();
  const copy = marketingCopy(locale).contact;

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-16 lg:py-24">
      <Reveal className="max-w-2xl">
        <p className="text-xs font-semibold tracking-wide text-primary uppercase">{copy.eyebrow}</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight text-balance sm:text-5xl">{copy.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">{copy.body}</p>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {copy.cards.map((card, index) => {
          const Icon = ICONS[card.icon] ?? MessageCircle;
          return (
            <Reveal key={card.title} delay={index * 70} as="div">
              <a
                href={card.href}
                target="_blank"
                rel="noreferrer"
                className="flex h-full flex-col gap-3 rounded-3xl border border-border bg-card p-6 shadow-sm transition-transform hover:-translate-y-1"
              >
                <span className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <h2 className="font-serif text-xl text-card-foreground">{card.title}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{card.body}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-primary">
                  {card.action}
                  <ArrowUpRight className="size-4" />
                </span>
              </a>
            </Reveal>
          );
        })}
      </div>

      <Reveal
        delay={120}
        className="mt-6 flex items-start gap-3 rounded-3xl border border-primary/20 bg-primary/5 p-5"
      >
        <Info className="mt-0.5 size-5 shrink-0 text-primary" />
        <p className="text-sm leading-relaxed text-muted-foreground">{copy.privacyNote}</p>
      </Reveal>

      <Reveal delay={160} className="mt-12">
        <h2 className="font-serif text-lg text-foreground">{copy.otherTitle}</h2>
        <ul className="mt-3 flex flex-col gap-2 text-sm">
          {copy.otherLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="font-semibold text-primary transition-colors hover:text-primary/80">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import type {
  CustomSymptomCategory,
  SymptomId,
  SymptomMap,
} from "@/lib/diary";
import { isCustomSymptomId } from "@/lib/symptoms/definitions";
import type { Messages } from "@/lib/i18n";
import {
  SYMPTOM_CATEGORY_ORDER,
  symptomCategoryLabel,
  symptomLabel,
  type SymptomMeta,
} from "@/lib/symptoms/catalog";
import { SymptomChip } from "@/components/calendar/symptom-chip";

export function MoreSymptomsView({
  catalog,
  selected,
  favorites,
  disabled,
  t,
  onToggle,
  onToggleFavorite,
  onCreateCustom,
  onDeleteCustom,
}: {
  catalog: readonly SymptomMeta[];
  selected: SymptomMap;
  favorites: readonly SymptomId[];
  disabled: boolean;
  t: Messages;
  onToggle: (id: SymptomId) => void;
  onToggleFavorite: (id: SymptomId) => void;
  onCreateCustom?: (
    label: string,
    emoji: string,
    category: CustomSymptomCategory,
  ) => void;
  onDeleteCustom?: (id: SymptomId) => void;
}) {
  return (
    <div className="pb-3">
      {SYMPTOM_CATEGORY_ORDER.map((category) => {
        const items = catalog.filter((item) => item.category === category);
        if (
          items.length === 0 &&
          !(onCreateCustom && (category === "custom" || category === "otherPills"))
        ) {
          return null;
        }
        return (
          <section key={category} className="py-3">
            <h3 className="mb-2.5 text-sm font-bold tracking-wide text-card-foreground uppercase">
              {symptomCategoryLabel(category, t)}
            </h3>
            {items.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <SymptomChip
                    key={item.id}
                    item={item}
                    active={Boolean(selected[item.id])}
                    favorite={favorites.includes(item.id)}
                    showFavorite
                    disabled={disabled}
                    t={t}
                    onToggle={() => onToggle(item.id)}
                    onToggleFavorite={() => onToggleFavorite(item.id)}
                    onDelete={
                      onDeleteCustom && isCustomSymptomId(item.id)
                        ? () => onDeleteCustom(item.id)
                        : undefined
                    }
                  />
                ))}
              </div>
            ) : null}
            {onCreateCustom && (category === "custom" || category === "otherPills") ? (
              <CustomSymptomCreator
                category={category}
                catalog={catalog}
                disabled={disabled}
                t={t}
                onCreate={onCreateCustom}
              />
            ) : null}
          </section>
        );
      })}
    </div>
  );
}

function CustomSymptomCreator({
  category,
  catalog,
  disabled,
  t,
  onCreate,
}: {
  category: CustomSymptomCategory;
  catalog: readonly SymptomMeta[];
  disabled: boolean;
  t: Messages;
  onCreate: (
    label: string,
    emoji: string,
    category: CustomSymptomCategory,
  ) => void;
}) {
  const [label, setLabel] = useState("");
  const [emoji, setEmoji] = useState(category === "otherPills" ? "💊" : "✨");
  const [error, setError] = useState<string | null>(null);
  const isPill = category === "otherPills";

  function submit() {
    const normalized = label.trim();
    if (!normalized) {
      setError(t.customSymptomRequired);
      return;
    }
    if (
      catalog.some(
        (item) => symptomLabel(item, t).localeCompare(normalized, undefined, { sensitivity: "accent" }) === 0,
      )
    ) {
      setError(t.customSymptomDuplicate);
      return;
    }
    onCreate(normalized, emoji.trim(), category);
    setLabel("");
    setError(null);
  }

  return (
    <div className="mt-3 rounded-2xl border border-border bg-muted/40 p-3">
      <p className="mb-2 text-sm font-semibold text-card-foreground">
        {isPill ? t.addPill : t.addCustomSymptom}
      </p>
      <div className="flex gap-2">
        <label className="sr-only" htmlFor={`custom-emoji-${category}`}>{t.customSymptomEmoji}</label>
        <input
          id={`custom-emoji-${category}`}
          type="text"
          inputMode="text"
          maxLength={16}
          value={emoji}
          disabled={disabled}
          onChange={(event) => setEmoji(event.target.value)}
          className="h-11 w-14 rounded-xl border border-border bg-background px-2 text-center text-xl outline-none focus:border-primary"
        />
        <label className="sr-only" htmlFor={`custom-name-${category}`}>{t.customSymptomName}</label>
        <input
          id={`custom-name-${category}`}
          type="text"
          maxLength={80}
          value={label}
          disabled={disabled}
          placeholder={isPill ? t.pillNamePlaceholder : t.customSymptomPlaceholder}
          onChange={(event) => {
            setLabel(event.target.value);
            if (error) setError(null);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              submit();
            }
          }}
          className="h-11 min-w-0 flex-1 rounded-xl border border-border bg-background px-3 text-sm text-card-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
        />
        <button
          type="button"
          disabled={disabled}
          onClick={submit}
          aria-label={isPill ? t.addPill : t.createSymptom}
          className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform active:scale-90"
        >
          <Plus className="size-5" aria-hidden />
        </button>
      </div>
      {error ? <p className="mt-2 text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { Star, X } from "lucide-react";

import type { Messages } from "@/lib/i18n";
import { symptomLabel, type SymptomMeta } from "@/lib/symptoms/catalog";
import { cn } from "@/lib/utils";

export function SymptomChip({
  item,
  active,
  favorite,
  showFavorite = false,
  disabled,
  t,
  onToggle,
  onToggleFavorite,
  onDelete,
}: {
  item: SymptomMeta;
  active: boolean;
  favorite: boolean;
  showFavorite?: boolean;
  disabled: boolean;
  t: Messages;
  onToggle: () => void;
  onToggleFavorite?: () => void;
  onDelete?: () => void;
}) {
  const Icon = item.icon;
  const label = symptomLabel(item, t);

  return (
    <div
      className={cn(
        "inline-flex overflow-hidden rounded-full border-2 transition-all",
        active
          ? "border-primary bg-primary text-primary-foreground shadow-sm"
          : "border-border bg-background text-muted-foreground",
      )}
    >
      <button
        type="button"
        aria-pressed={active}
        disabled={disabled}
        onClick={onToggle}
        className="flex items-center gap-1.5 py-2 pl-2.5 pr-3 text-sm font-medium transition-transform active:scale-95"
      >
        {item.emoji ? (
          <span className="text-base leading-none" aria-hidden>{item.emoji}</span>
        ) : (
          <Icon className="size-4" aria-hidden />
        )}
        <span>{label}</span>
      </button>
      {showFavorite && onToggleFavorite ? (
        <button
          type="button"
          aria-label={favorite ? t.unfavoriteSymptom : t.favoriteSymptom}
          aria-pressed={favorite}
          disabled={disabled}
          onClick={onToggleFavorite}
          className={cn(
            "flex w-9 items-center justify-center border-l transition-colors active:scale-90",
            active ? "border-primary-foreground/25" : "border-border",
          )}
        >
          <Star className={cn("size-4", favorite && "fill-current")} aria-hidden />
        </button>
      ) : null}
      {onDelete ? (
        <button
          type="button"
          aria-label={t.deleteCustomSymptom.replace("{name}", label)}
          disabled={disabled}
          onClick={onDelete}
          className={cn(
            "flex w-9 items-center justify-center border-l transition-colors active:scale-90",
            active ? "border-primary-foreground/25" : "border-border",
          )}
        >
          <X className="size-4" aria-hidden />
        </button>
      ) : null}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "flex min-h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-base md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  showLabel: string;
  hideLabel: string;
};

export function PasswordInput({ className, showLabel, hideLabel, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <input
        {...props}
        type={visible ? "text" : "password"}
        className={cn(
          "flex min-h-11 w-full rounded-xl border border-input bg-background px-3 py-2 pr-11 text-base md:text-sm",
          className,
        )}
      />
      <button
        type="button"
        className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg p-2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        onClick={() => setVisible((current) => !current)}
        aria-label={visible ? hideLabel : showLabel}
        aria-pressed={visible}
      >
        {visible ? <EyeOff className="size-5" aria-hidden /> : <Eye className="size-5" aria-hidden />}
      </button>
    </div>
  );
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "flex min-h-28 w-full rounded-xl border border-input bg-background px-3 py-2 text-base md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

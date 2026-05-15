"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "@phosphor-icons/react";

type Status = "idle" | "submitting" | "success" | "validation" | "ratelimit" | "send";

type SubmitResult =
  | { ok: true; honeypot?: boolean }
  | { ok: false; error: "validation" | "ratelimit" | "send"; retryAfterSeconds?: number };

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", { method: "POST", body: new FormData(e.currentTarget) });
      const result = (await res.json()) as SubmitResult;
      if (result.ok) setStatus("success");
      else setStatus(result.error);
    } catch {
      setStatus("send");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[var(--radius-card)] border border-[var(--color-border-default)] bg-[var(--color-elevated)] p-8">
        <CheckCircle size={36} weight="fill" className="text-[var(--color-accent)]" />
        <h2 className="mt-3 font-display text-2xl font-bold">{t("successTitle")}</h2>
        <p className="mt-3 text-[var(--color-text-body)]">{t("successBody")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-[var(--radius-card)] border border-[var(--color-border-default)] bg-[var(--color-elevated)] p-8">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="grid gap-2"><Label htmlFor="name">{t("name")}</Label><Input id="name" name="name" required /></div>
        <div className="grid gap-2"><Label htmlFor="email">{t("email")}</Label><Input id="email" name="email" type="email" required /></div>
        <div className="grid gap-2"><Label htmlFor="phone">{t("phone")}</Label><Input id="phone" name="phone" /></div>
        <div className="grid gap-2"><Label htmlFor="company">{t("company")}</Label><Input id="company" name="company" /></div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="sector">{t("sector")}</Label>
          <select id="sector" name="sector" required className="h-11 rounded-md border border-[var(--color-border-default)] bg-[var(--color-elevated)] px-3 text-sm">
            <option value="">—</option>
            {(["dental", "legal", "reforms", "hospitality", "ecommerce", "other"] as const).map((k) => (
              <option key={k} value={k}>{t(`sectors.${k}` as never)}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="budget">{t("budget")}</Label>
          <select id="budget" name="budget" required className="h-11 rounded-md border border-[var(--color-border-default)] bg-[var(--color-elevated)] px-3 text-sm">
            <option value="">—</option>
            {(["lt1k", "b1_2k", "b2_5k", "gt5k"] as const).map((k) => (
              <option key={k} value={k}>{t(`budgets.${k}` as never)}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-2"><Label htmlFor="message">{t("message")}</Label><Textarea id="message" name="message" rows={5} required /></div>

      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" name="gdpr" required className="mt-1" />
        <span>{t("gdpr")}</span>
      </label>

      {(status === "validation" || status === "ratelimit" || status === "send") && (
        <p className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-800">
          <strong>{t("errorTitle")}.</strong> {t("errorBody")}
        </p>
      )}

      <Button type="submit" disabled={status === "submitting"} size="lg" className="w-full md:w-auto">
        {status === "submitting" ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}

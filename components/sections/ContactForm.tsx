"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    console.log("contact form submit (stub)", data);
    setTimeout(() => setStatus("success"), 600);
  }

  if (status === "success") {
    return (
      <div className="rounded-[var(--radius-card)] border border-[var(--color-border-default)] bg-[var(--color-elevated)] p-8">
        <h2 className="font-display text-2xl font-bold">{t("successTitle")}</h2>
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

      <Button type="submit" disabled={status === "submitting"} size="lg" className="w-full md:w-auto">
        {status === "submitting" ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}

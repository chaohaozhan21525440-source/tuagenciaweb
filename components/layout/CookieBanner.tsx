"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { readConsent, writeConsent, type Consent } from "@/lib/consent";

export function CookieBanner() {
  const t = useTranslations("common.cookies");
  const [show, setShow] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [configuring, setConfiguring] = useState(false);

  useEffect(() => {
    setShow(readConsent() === null);
  }, []);

  if (!show) return null;

  const save = (c: Consent) => {
    writeConsent(c);
    setShow(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--color-border-default)] bg-[var(--color-elevated)] shadow-[0_-10px_40px_-20px_rgba(15,23,42,0.15)]">
      <div className="container-page flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold">{t("title")}</p>
          <p className="text-sm text-[var(--color-text-body)]">{t("body")}</p>
        </div>

        {configuring ? (
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked disabled />
              <span>{t("categories.necessary.name")}</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
              <span>{t("categories.analytics.name")}</span>
            </label>
            <Button onClick={() => save({ necessary: true, analytics, ts: Date.now() })}>{t("save")}</Button>
          </div>
        ) : (
          <div className="flex flex-col gap-2 md:flex-row">
            <Button variant="ghost" onClick={() => save({ necessary: true, analytics: false, ts: Date.now() })}>{t("reject")}</Button>
            <Button variant="ghost" onClick={() => setConfiguring(true)}>{t("configure")}</Button>
            <Button onClick={() => save({ necessary: true, analytics: true, ts: Date.now() })}>{t("accept")}</Button>
          </div>
        )}
      </div>
    </div>
  );
}

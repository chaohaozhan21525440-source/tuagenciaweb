import type { Dict, Locale } from "@/lib/i18n";

export function ServicesPageContent({
  dict,
  locale,
}: {
  dict: Dict["servicesPage"];
  locale: Locale;
}) {
  return (
    <main className="services-redesign">
      <div style={{ padding: 80, textAlign: "center", color: "#64748b" }}>
        <p>/servicios redesign in progress · {locale.toUpperCase()}</p>
        <p style={{ fontSize: 12, marginTop: 8 }}>{dict.hero.h1Top}</p>
      </div>
    </main>
  );
}

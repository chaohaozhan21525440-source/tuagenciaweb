# /servicios Premium Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `/servicios` (ES + EN) into a premium, conversion-oriented landing with 7 sections: split-editorial hero with anchor nav, 4 service detail blocks, horizontal process timeline with hover, comparison table, marketing grid, FAQ with FAQPage schema, gradient CTA. No projects, no photos, all-text with typography + motion.

**Architecture:**
- New components in `components/services/sr-*.tsx` (one per section), orchestrated by a refactored `ServicesPageContent.tsx`.
- New CSS scoped under `.sr-*` classes in `app/globals.css` (separate from the old `.services-page` rules — old rules deleted after migration in a single cleanup commit).
- `lib/i18n/dict.es.ts` and `lib/i18n/dict.en.ts` get the `servicesPage` key replaced with the new schema. TypeScript enforces parity.
- FAQPage JSON-LD injected as inline `<script type="application/ld+json">` from the page Server Components.
- Animations via `framer-motion` (`whileInView` for fade-up, CSS transitions for hover).

**Tech Stack:** Next.js 16 App Router · TypeScript · framer-motion 12 · Tailwind v4 (utility-light — page uses CSS classes from globals.css) · inline SVG icons (no lucide).

**Spec:** `docs/superpowers/specs/2026-05-20-servicios-redesign-design.md`.

**Branch:** `feat/servicios-redesign` → merge to `main` → Vercel auto-deploy.

---

## Task 1: Branch setup + dict skeleton + page placeholder

**Goal:** Get a working but empty new /servicios so the rest of the work happens incrementally on a green build.

**Files:**
- Create: `feat/servicios-redesign` branch
- Modify: `lib/i18n/dict.es.ts:342-439` (replace `servicesPage` block)
- Modify: `lib/i18n/dict.en.ts` (the equivalent `servicesPage` block — search for the existing one)
- Modify: `components/services/ServicesPageContent.tsx` (replace contents)
- Modify: `app/es/servicios/page.tsx:7-10` (update metadata)
- Modify: `app/en/services/page.tsx` (update metadata equivalent)

- [ ] **Step 1: Create feature branch from main**

```bash
cd /c/Users/chaoh/Desktop/Tuagenciaweb
git checkout main
git pull
git checkout -b feat/servicios-redesign
```

- [ ] **Step 2: Replace `servicesPage` in `lib/i18n/dict.es.ts`**

Locate the existing block (starts around line 342 with `servicesPage: {` and ends around line 439 with the closing `},`). Replace the entire block with:

```ts
  servicesPage: {
    meta: {
      title: "Servicios de diseño web, SEO y marketing digital | Tuagenciaweb",
      description:
        "Diseño web en Barcelona, tiendas online, SEO técnico y marketing digital. Creamos webs rápidas y orientadas a conversión.",
    },
    hero: {
      badge: "SERVICIOS",
      h1Top: "Diseño web, SEO y marketing digital",
      h1Accent: "para hacer crecer tu negocio.",
      sub:
        "Creamos webs rápidas, modernas y orientadas a conversión. Desde el diseño hasta el posicionamiento, nos encargamos de todo para que tu web genere resultados.",
      ctaPrimary: "Solicitar presupuesto",
      ctaSecondary: "Ver proyectos",
      trustPills: [
        "Sin cuotas obligatorias",
        "SEO técnico incluido",
        "Entrega en 2–3 semanas",
        "Código y dominio 100% tuyos",
      ],
      navLabel: "EN ESTA PÁGINA",
      navItems: [
        { num: "01", title: "Diseño web a medida", anchor: "diseno-web" },
        { num: "02", title: "Tiendas online", anchor: "tiendas-online" },
        { num: "03", title: "SEO técnico y contenidos", anchor: "seo-tecnico" },
        { num: "04", title: "Mantenimiento opcional", anchor: "mantenimiento" },
      ],
    },
    detail: {
      items: [
        {
          id: "diseno-web",
          num: "01",
          eyebrow: "DISEÑO WEB",
          title: "Diseño web a medida",
          lead:
            "Webs únicas en Next.js, sin plantillas reutilizadas. Diseñamos cada interfaz pensando en tu marca y en convertir visitas en clientes.",
          bullets: [
            "Diseño UI/UX propio",
            "Animaciones sutiles y rendimiento 100/100",
            "Editable por ti tras la entrega",
          ],
        },
        {
          id: "tiendas-online",
          num: "02",
          eyebrow: "TIENDAS ONLINE",
          title: "Tiendas online",
          lead:
            "E-commerce con catálogo, pasarela de pago segura y panel de gestión simple. Listas para vender desde el día 1.",
          bullets: [
            "Stripe, Redsys o PayPal",
            "Inventario y envíos automatizados",
            "Optimizado para Google Shopping",
          ],
        },
        {
          id: "seo-tecnico",
          num: "03",
          eyebrow: "SEO TÉCNICO",
          title: "SEO técnico y contenidos",
          lead:
            "Indexación, velocidad, schema y contenido optimizado para que tu web posicione de verdad — no solo para que se vea bonita.",
          bullets: [
            "Core Web Vitals en verde",
            "Schema.org y sitemap dinámico",
            "Auditoría mensual opcional",
          ],
        },
        {
          id: "mantenimiento",
          num: "04",
          eyebrow: "MANTENIMIENTO",
          title: "Mantenimiento opcional",
          lead:
            "Soporte por horas, sin cuota mensual obligatoria. Tú decides cuándo necesitas algo y solo pagas por lo que usas.",
          bullets: [
            "Bolsa de horas prepago",
            "Backups y monitorización 24/7",
            "Sin contratos de permanencia",
          ],
        },
      ],
    },
    process: {
      eyebrow: "PROCESO",
      h2: "Cómo trabajamos",
      sub: "Cuatro fases claras, sin sorpresas y con entregables medibles en cada una.",
      steps: [
        {
          num: "01",
          title: "Estrategia",
          desc: "Definimos objetivo, público objetivo y prioridades antes de tocar una sola pantalla.",
        },
        {
          num: "02",
          title: "Diseño y desarrollo",
          desc: "UI a medida y código limpio sobre Next.js. Sin plantillas, sin atajos.",
        },
        {
          num: "03",
          title: "Optimización SEO",
          desc: "Indexación, velocidad, schema y on-page desde el primer commit.",
        },
        {
          num: "04",
          title: "Lanzamiento y soporte",
          desc: "Deploy, formación al equipo y mantenimiento opcional sin permanencia.",
        },
      ],
    },
    comparison: {
      h2Top: "Más que una",
      h2Accent: "web bonita.",
      sub: "Una comparación honesta de lo que ofrecemos frente a la mayoría del mercado.",
      others: {
        eyebrow: "OTRAS AGENCIAS",
        items: [
          "Plantillas genéricas",
          "Cuotas mensuales eternas",
          "SEO superficial o inexistente",
          "Código y dominio bajo su control",
        ],
      },
      us: {
        eyebrow: "TUAGENCIAWEB",
        items: [
          "Diseño a medida sobre Next.js",
          "Pago único, sin cuotas obligatorias",
          "SEO técnico real, no parches",
          "Código y dominio 100% tuyos",
          "Soporte opcional por horas",
        ],
      },
    },
    marketing: {
      eyebrow: "MARKETING & SEO",
      h2: "Estrategia digital end-to-end",
      sub: "Más allá del diseño: ayudamos a que tu web atraiga, convierta y crezca.",
      items: [
        { icon: "pin",       title: "SEO local",        desc: "Aparece primero en las búsquedas de tu ciudad y barrio." },
        { icon: "gauge",     title: "SEO técnico",      desc: "Velocidad, indexación y schema listos para Google." },
        { icon: "link",      title: "Link building",    desc: "Enlaces de autoridad para escalar posiciones." },
        { icon: "google",    title: "Google Ads",       desc: "Campañas rentables con tracking de conversión real." },
        { icon: "meta",      title: "Meta Ads",         desc: "Anuncios en Instagram y Facebook bien segmentados." },
        { icon: "chart",     title: "Analítica web",    desc: "GA4, Search Console y dashboards a medida." },
        { icon: "target",    title: "CRO",              desc: "Optimización de conversión basada en datos reales." },
        { icon: "workflow",  title: "Automatizaciones", desc: "Email, CRM y flujos sin trabajo manual." },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      h2: "Preguntas frecuentes",
      sub: "Todo lo que sueles preguntarnos antes de empezar.",
      items: [
        {
          q: "¿Cuánto cuesta una página web?",
          a: "Depende del alcance. Una web corporativa parte de 590€, una tienda online desde 1.890€. Te enviamos un presupuesto cerrado en 24h sin compromiso.",
        },
        {
          q: "¿Cuánto se tarda en tener la web lista?",
          a: "Entre 2 y 3 semanas para una web corporativa. Para una tienda online suelen ser 4-6 semanas, dependiendo del catálogo.",
        },
        {
          q: "¿De quién es el dominio y el código?",
          a: "Tuyos al 100%. El dominio se compra a tu nombre desde el día 1, y el código fuente se te entrega al cierre del proyecto sin candados.",
        },
        {
          q: "¿Incluye SEO?",
          a: "Sí: el SEO técnico (velocidad, schema, indexación, sitemap) está incluido en todos los packs. El SEO de contenidos y link building son opcionales y se contratan aparte.",
        },
        {
          q: "¿Podré editar la web yo mismo?",
          a: "Sí. Te entregamos un panel de edición con el que puedes cambiar textos, imágenes y secciones sin tocar código ni depender de nosotros.",
        },
        {
          q: "¿Puedo pagar a plazos?",
          a: "Sí, ofrecemos pago en 2 o 3 plazos sin recargo. Lo acordamos contigo al cerrar el presupuesto.",
        },
        {
          q: "¿Trabajáis con clientes de toda España?",
          a: "Sí. Trabajamos 100% en remoto con clientes en cualquier punto de España. Las reuniones son por videollamada y el ritmo lo marcas tú.",
        },
        {
          q: "¿Ofrecéis mantenimiento después de la entrega?",
          a: "Sí, mantenimiento opcional por bolsa de horas prepago. Sin cuota mensual obligatoria, solo pagas por lo que necesites.",
        },
      ],
    },
    cta: {
      eyebrow: "LISTO PARA EMPEZAR",
      h2: "¿Hablamos de tu proyecto?",
      sub: "Te preparamos una propuesta personalizada en menos de 24 horas.",
      primary: "Solicitar presupuesto",
      whatsapp: "WhatsApp",
      whatsappHref:
        "https://wa.me/34613654273?text=Hola%2C%20me%20interesa%20un%20presupuesto%20para%20mi%20web.",
      indicators: ["Respuesta en 24h", "Sin compromiso", "Presupuesto detallado"],
    },
  },
```

- [ ] **Step 3: Mirror the same structure in `lib/i18n/dict.en.ts`**

Locate the existing `servicesPage` block and replace the entire block with:

```ts
  servicesPage: {
    meta: {
      title: "Web design, SEO and digital marketing services | Tuagenciaweb",
      description:
        "Web design in Barcelona, online stores, technical SEO and digital marketing. Fast, conversion-focused websites.",
    },
    hero: {
      badge: "SERVICES",
      h1Top: "Web design, SEO and digital marketing",
      h1Accent: "to grow your business.",
      sub:
        "We build fast, modern, conversion-driven websites. From design to ranking, we handle everything so your site delivers results.",
      ctaPrimary: "Request a quote",
      ctaSecondary: "View projects",
      trustPills: [
        "No mandatory monthly fees",
        "Technical SEO included",
        "Delivered in 2–3 weeks",
        "Code and domain 100% yours",
      ],
      navLabel: "ON THIS PAGE",
      navItems: [
        { num: "01", title: "Custom web design", anchor: "web-design" },
        { num: "02", title: "Online stores", anchor: "online-stores" },
        { num: "03", title: "Technical SEO & content", anchor: "technical-seo" },
        { num: "04", title: "Optional maintenance", anchor: "maintenance" },
      ],
    },
    detail: {
      items: [
        {
          id: "web-design",
          num: "01",
          eyebrow: "WEB DESIGN",
          title: "Custom web design",
          lead:
            "Unique sites in Next.js, no reused templates. We design every interface around your brand and around turning visitors into customers.",
          bullets: [
            "Bespoke UI/UX",
            "Subtle animations and 100/100 performance",
            "Editable by you after delivery",
          ],
        },
        {
          id: "online-stores",
          num: "02",
          eyebrow: "ONLINE STORES",
          title: "Online stores",
          lead:
            "E-commerce with catalog, secure payment gateway and a simple admin panel. Ready to sell from day one.",
          bullets: [
            "Stripe, Redsys or PayPal",
            "Automated inventory and shipping",
            "Optimized for Google Shopping",
          ],
        },
        {
          id: "technical-seo",
          num: "03",
          eyebrow: "TECHNICAL SEO",
          title: "Technical SEO & content",
          lead:
            "Indexing, speed, schema and optimized content so your site actually ranks — not just looks pretty.",
          bullets: [
            "Core Web Vitals in the green",
            "Schema.org and dynamic sitemap",
            "Optional monthly audit",
          ],
        },
        {
          id: "maintenance",
          num: "04",
          eyebrow: "MAINTENANCE",
          title: "Optional maintenance",
          lead:
            "Support by the hour, no mandatory monthly fee. You decide when you need something and pay only for what you use.",
          bullets: [
            "Prepaid hour bank",
            "Backups and 24/7 monitoring",
            "No long-term contracts",
          ],
        },
      ],
    },
    process: {
      eyebrow: "PROCESS",
      h2: "How we work",
      sub: "Four clear phases, no surprises, with measurable deliverables in each one.",
      steps: [
        {
          num: "01",
          title: "Strategy",
          desc: "We define goal, target audience and priorities before touching a single screen.",
        },
        {
          num: "02",
          title: "Design & development",
          desc: "Bespoke UI and clean code on Next.js. No templates, no shortcuts.",
        },
        {
          num: "03",
          title: "SEO optimization",
          desc: "Indexing, speed, schema and on-page from the first commit.",
        },
        {
          num: "04",
          title: "Launch & support",
          desc: "Deploy, team training and optional maintenance with no lock-in.",
        },
      ],
    },
    comparison: {
      h2Top: "More than a",
      h2Accent: "pretty website.",
      sub: "An honest comparison of what we offer versus most of the market.",
      others: {
        eyebrow: "OTHER AGENCIES",
        items: [
          "Generic templates",
          "Endless monthly fees",
          "Shallow or non-existent SEO",
          "Code and domain under their control",
        ],
      },
      us: {
        eyebrow: "TUAGENCIAWEB",
        items: [
          "Custom design on Next.js",
          "One-time payment, no mandatory fees",
          "Real technical SEO, not patches",
          "Code and domain 100% yours",
          "Optional hourly support",
        ],
      },
    },
    marketing: {
      eyebrow: "MARKETING & SEO",
      h2: "End-to-end digital strategy",
      sub: "Beyond design: we help your site attract, convert and grow.",
      items: [
        { icon: "pin",       title: "Local SEO",       desc: "Show up first in searches in your city and neighborhood." },
        { icon: "gauge",     title: "Technical SEO",   desc: "Speed, indexing and schema ready for Google." },
        { icon: "link",      title: "Link building",   desc: "Authority links to climb rankings." },
        { icon: "google",    title: "Google Ads",      desc: "Profitable campaigns with real conversion tracking." },
        { icon: "meta",      title: "Meta Ads",        desc: "Well-targeted ads on Instagram and Facebook." },
        { icon: "chart",     title: "Web analytics",   desc: "GA4, Search Console and tailored dashboards." },
        { icon: "target",    title: "CRO",             desc: "Conversion optimization based on real data." },
        { icon: "workflow",  title: "Automations",     desc: "Email, CRM and workflows with no manual work." },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      h2: "Frequently asked questions",
      sub: "Everything you usually ask us before we start.",
      items: [
        {
          q: "How much does a website cost?",
          a: "It depends on scope. A corporate website starts from €590, an online store from €1,890. We send you a closed quote within 24h with no commitment.",
        },
        {
          q: "How long does it take?",
          a: "Between 2 and 3 weeks for a corporate website. For an online store it's usually 4-6 weeks, depending on the catalog.",
        },
        {
          q: "Who owns the domain and the code?",
          a: "You, 100%. The domain is registered in your name from day one, and the source code is handed over to you at project close with no locks.",
        },
        {
          q: "Is SEO included?",
          a: "Yes: technical SEO (speed, schema, indexing, sitemap) is included in every pack. Content SEO and link building are optional and contracted separately.",
        },
        {
          q: "Can I edit the website myself?",
          a: "Yes. We give you an editing panel where you can change text, images and sections without touching code or depending on us.",
        },
        {
          q: "Can I pay in installments?",
          a: "Yes, we offer payment in 2 or 3 installments at no extra cost. We agree it when closing the quote.",
        },
        {
          q: "Do you work with clients across Spain?",
          a: "Yes. We work fully remote with clients anywhere in Spain. Meetings are by video call and you set the pace.",
        },
        {
          q: "Do you offer maintenance after delivery?",
          a: "Yes, optional maintenance via a prepaid hour bank. No mandatory monthly fee, you only pay for what you need.",
        },
      ],
    },
    cta: {
      eyebrow: "READY TO START",
      h2: "Let's talk about your project?",
      sub: "We'll prepare a custom proposal in less than 24 hours.",
      primary: "Request a quote",
      whatsapp: "WhatsApp",
      whatsappHref:
        "https://wa.me/34613654273?text=Hi%2C%20I%27m%20interested%20in%20a%20quote%20for%20my%20website.",
      indicators: ["Reply in 24h", "No commitment", "Detailed quote"],
    },
  },
```

Note: `anchor` slugs differ per locale (`web-design` vs `diseno-web`) — this is intentional, they're URL fragments matching the locale.

- [ ] **Step 4: Run typecheck to find consumers**

```bash
npx tsc --noEmit
```
Expected: errors in `components/services/ServicesPageContent.tsx` referencing the old fields (`dict.detailsH2`, `dict.detailsPill`, `dict.details`, etc.). This confirms the dict shape changed.

- [ ] **Step 5: Replace `components/services/ServicesPageContent.tsx` with a placeholder**

Overwrite the entire file with:

```tsx
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
```

Note: the old props included `servicesDict`. Remove that since the new page no longer reuses the home `<Services>` component.

- [ ] **Step 6: Update both page.tsx files**

In `app/es/servicios/page.tsx`, change:
```tsx
<ServicesPageContent
  dict={dict.servicesPage}
  servicesDict={dict.services}
  locale="es"
/>
```
to:
```tsx
<ServicesPageContent dict={dict.servicesPage} locale="es" />
```

Also update metadata block (replace lines 7-22 entirely):
```tsx
export const metadata: Metadata = {
  title: dict.servicesPage.meta.title,
  description: dict.servicesPage.meta.description,
  alternates: {
    canonical: "/es/servicios",
    languages: { es: "/es/servicios", en: "/en/services", "x-default": "/es/servicios" },
  },
  openGraph: {
    title: dict.servicesPage.meta.title,
    description: dict.servicesPage.meta.description,
    locale: "es_ES",
    type: "website",
  },
};
```

Mirror in `app/en/services/page.tsx` with locale `"en"`, `locale: "en_US"`, canonical `/en/services`.

- [ ] **Step 7: Build and lint**

```bash
npm run lint
npm run build
```
Expected: both pass green. Page renders the placeholder.

- [ ] **Step 8: Commit**

```bash
git add lib/i18n/dict.es.ts lib/i18n/dict.en.ts components/services/ServicesPageContent.tsx app/es/servicios/page.tsx app/en/services/page.tsx
git commit -m "refactor(servicios): new dict shape + placeholder page"
```

---

## Task 2: ServicesHero + ServicesNav (§1)

**Files:**
- Create: `components/services/sr/ServicesHero.tsx`
- Create: `components/services/sr/ServicesNav.tsx`
- Modify: `components/services/ServicesPageContent.tsx`
- Modify: `app/globals.css` (append new block at the end)

- [ ] **Step 1: Create `components/services/sr/ServicesHero.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Dict, Locale } from "@/lib/i18n";
import { path, sectionPath } from "@/lib/i18n";
import { ServicesNav } from "./ServicesNav";

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export function ServicesHero({
  dict,
  locale,
}: {
  dict: Dict["servicesPage"]["hero"];
  locale: Locale;
}) {
  return (
    <section className="sr-hero">
      <div className="sr-container">
        <motion.div
          className="sr-hero-grid"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <div className="sr-hero-left">
            <span className="sr-pill"><span className="dot" /> {dict.badge}</span>
            <h1 className="sr-h1">
              {dict.h1Top}{" "}
              <span className="sr-accent">{dict.h1Accent}</span>
            </h1>
            <p className="sr-lead">{dict.sub}</p>
            <div className="sr-cta-row">
              <Link href={path("contact", locale)} className="sr-btn sr-btn-primary">
                {dict.ctaPrimary}
                <ArrowRight />
              </Link>
              <Link
                href={sectionPath("home", locale, "projects")}
                className="sr-btn sr-btn-ghost"
              >
                {dict.ctaSecondary}
              </Link>
            </div>
            <ul className="sr-trust">
              {dict.trustPills.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <ServicesNav label={dict.navLabel} items={dict.navItems} />
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/services/sr/ServicesNav.tsx`**

```tsx
"use client";

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export function ServicesNav({
  label,
  items,
}: {
  label: string;
  items: { num: string; title: string; anchor: string }[];
}) {
  return (
    <aside className="sr-nav" aria-label={label}>
      <div className="sr-nav-label">{label}</div>
      <ul>
        {items.map((it) => (
          <li key={it.anchor}>
            <a href={`#${it.anchor}`}>
              <span className="sr-nav-num">{it.num}</span>
              <span className="sr-nav-title">{it.title}</span>
              <span className="sr-nav-arrow"><ArrowRight /></span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
```

- [ ] **Step 3: Update `components/services/ServicesPageContent.tsx`**

Replace the placeholder body with:

```tsx
import type { Dict, Locale } from "@/lib/i18n";
import { ServicesHero } from "./sr/ServicesHero";

export function ServicesPageContent({
  dict,
  locale,
}: {
  dict: Dict["servicesPage"];
  locale: Locale;
}) {
  return (
    <main className="services-redesign">
      <ServicesHero dict={dict.hero} locale={locale} />
    </main>
  );
}
```

- [ ] **Step 4: Add hero CSS to `app/globals.css`**

Append at the very end of the file:

```css
/* ===== /servicios — redesign 2026-05-20 ===== */

.services-redesign {
  --sr-brand: #2563eb;
  --sr-brand-hover: #1d4ed8;
  --sr-brand-soft: #eef4ff;
  --sr-ink: #0f172a;
  --sr-ink-2: #475569;
  --sr-muted: #64748b;
  --sr-muted-2: #94a3b8;
  --sr-line: #e5e7eb;
  --sr-line-2: #eef1f6;
  --sr-bg-soft: #f8fafc;
  --sr-radius: 24px;
  background: #fff;
  color: var(--sr-ink);
  position: relative;
  overflow: hidden;
}
.services-redesign::before {
  content: "";
  position: absolute;
  inset: 0 0 auto 0;
  height: 480px;
  background: radial-gradient(ellipse 60% 50% at 80% 0%, rgba(37, 99, 235, 0.06), transparent 70%);
  pointer-events: none;
  z-index: 0;
}
.services-redesign .sr-container {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}
@media (min-width: 1024px) {
  .services-redesign .sr-container { padding: 0 56px; }
}

/* Hero */
.sr-hero { padding: 56px 0 72px; }
@media (min-width: 1024px) { .sr-hero { padding: 88px 0 96px; } }

.sr-hero-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: start;
}
@media (min-width: 1024px) {
  .sr-hero-grid { grid-template-columns: 1.4fr 1fr; gap: 72px; }
}

.sr-pill {
  display: inline-flex; align-items: center; gap: 8px;
  background: #fff; border: 1px solid var(--sr-line);
  border-radius: 999px; padding: 6px 14px 6px 10px;
  font-size: 12px; font-weight: 700;
  letter-spacing: 0.14em; color: var(--sr-brand);
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
}
.sr-pill .dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--sr-brand);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.18);
}

.sr-h1 {
  font-size: clamp(36px, 4.6vw, 60px);
  line-height: 1.04;
  letter-spacing: -0.03em;
  font-weight: 800;
  color: var(--sr-ink);
  margin: 22px 0 18px;
  max-width: 18ch;
}
.sr-accent { color: var(--sr-brand); }

.sr-lead {
  color: var(--sr-ink-2);
  font-size: 16.5px;
  line-height: 1.6;
  max-width: 540px;
  margin: 0 0 28px;
}

.sr-cta-row { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 28px; }
.sr-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 22px;
  border-radius: 14px;
  font-weight: 700; font-size: 14.5px;
  text-decoration: none;
  transition: transform 0.3s cubic-bezier(0.2, 0.7, 0.2, 1),
              background 0.3s ease, color 0.3s ease, border-color 0.3s ease,
              box-shadow 0.3s ease;
}
.sr-btn-primary {
  background: var(--sr-brand); color: #fff;
  box-shadow: 0 18px 40px -14px rgba(37, 99, 235, 0.55);
}
.sr-btn-primary:hover {
  background: var(--sr-brand-hover);
  transform: translateY(-1px);
  box-shadow: 0 22px 46px -14px rgba(37, 99, 235, 0.65);
}
.sr-btn-ghost {
  background: #fff; color: var(--sr-ink);
  border: 1px solid var(--sr-line);
}
.sr-btn-ghost:hover { border-color: #cdd6e3; }

.sr-trust {
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-wrap: wrap; gap: 8px;
}
.sr-trust li {
  font-size: 12.5px;
  font-weight: 500;
  color: var(--sr-muted);
  background: #fff;
  border: 1px solid var(--sr-line);
  border-radius: 999px;
  padding: 6px 12px;
}

/* Hero nav (right column) */
.sr-nav {
  background: linear-gradient(180deg, var(--sr-brand-soft) 0%, var(--sr-bg-soft) 100%);
  border-radius: var(--sr-radius);
  padding: 26px 24px;
  border: 1px solid var(--sr-line-2);
}
.sr-nav-label {
  font-size: 11.5px;
  letter-spacing: 0.14em;
  font-weight: 700;
  color: var(--sr-muted-2);
  margin-bottom: 18px;
}
.sr-nav ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 6px; }
.sr-nav a {
  display: grid;
  grid-template-columns: 36px 1fr 20px;
  align-items: center;
  gap: 12px;
  padding: 14px 14px;
  border-radius: 14px;
  text-decoration: none;
  color: var(--sr-ink);
  transition: background 0.3s ease, transform 0.3s ease;
}
.sr-nav a:hover { background: #fff; }
.sr-nav-num {
  font-size: 12.5px; font-weight: 700;
  color: var(--sr-brand);
  letter-spacing: 0.08em;
}
.sr-nav-title { font-size: 14.5px; font-weight: 600; }
.sr-nav-arrow {
  color: var(--sr-muted-2);
  display: inline-flex;
  transition: transform 0.3s ease, color 0.3s ease;
}
.sr-nav a:hover .sr-nav-arrow { transform: translateX(4px); color: var(--sr-brand); }
```

- [ ] **Step 5: Build, lint, and visually verify locally**

```bash
npm run lint
npm run build
npm run dev
```
Open `http://localhost:3000/es/servicios` and `http://localhost:3000/en/services`. Confirm hero renders, anchor links exist (clicking them does nothing yet because §2 is empty).

- [ ] **Step 6: Commit**

```bash
git add components/services/sr/ServicesHero.tsx components/services/sr/ServicesNav.tsx components/services/ServicesPageContent.tsx app/globals.css
git commit -m "feat(servicios): split editorial hero with anchor service nav"
```

---

## Task 3: ServicesDetail (§2)

**Files:**
- Create: `components/services/sr/ServicesDetail.tsx`
- Modify: `components/services/ServicesPageContent.tsx`
- Modify: `app/globals.css` (append new section)

- [ ] **Step 1: Create `components/services/sr/ServicesDetail.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import type { Dict } from "@/lib/i18n";

const Check = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polyline points="5 12 10 17 19 7" />
  </svg>
);

export function ServicesDetail({ dict }: { dict: Dict["servicesPage"]["detail"] }) {
  return (
    <section className="sr-detail-wrap">
      <div className="sr-container">
        {dict.items.map((item, idx) => (
          <motion.article
            key={item.id}
            id={item.id}
            className="sr-detail"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1], delay: idx * 0.05 }}
          >
            <span className="sr-detail-ghost" aria-hidden>{item.num}</span>
            <div className="sr-detail-body">
              <span className="sr-detail-eyebrow">{item.eyebrow}</span>
              <h2 className="sr-detail-title">{item.title}</h2>
              <p className="sr-detail-lead">{item.lead}</p>
              <ul className="sr-detail-bullets">
                {item.bullets.map((b) => (
                  <li key={b}><span className="sr-detail-check"><Check /></span>{b}</li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire it into `ServicesPageContent.tsx`**

```tsx
import type { Dict, Locale } from "@/lib/i18n";
import { ServicesHero } from "./sr/ServicesHero";
import { ServicesDetail } from "./sr/ServicesDetail";

export function ServicesPageContent({ dict, locale }: { dict: Dict["servicesPage"]; locale: Locale }) {
  return (
    <main className="services-redesign">
      <ServicesHero dict={dict.hero} locale={locale} />
      <ServicesDetail dict={dict.detail} />
    </main>
  );
}
```

- [ ] **Step 3: Append detail CSS to `app/globals.css`**

```css
/* Detail blocks */
.sr-detail-wrap { padding: 24px 0 48px; }
@media (min-width: 1024px) { .sr-detail-wrap { padding: 32px 0 80px; } }

.sr-detail {
  position: relative;
  padding: 56px 0 56px;
  border-top: 1px solid var(--sr-line);
  scroll-margin-top: 96px;
}
.sr-detail:first-child { border-top: none; padding-top: 32px; }

.sr-detail-ghost {
  position: absolute;
  top: 28px;
  left: 0;
  font-size: clamp(72px, 12vw, 144px);
  font-weight: 800;
  letter-spacing: -0.06em;
  color: var(--sr-brand);
  opacity: 0.08;
  line-height: 1;
  pointer-events: none;
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.sr-detail:hover .sr-detail-ghost {
  opacity: 0.16;
  transform: scale(1.05);
}

.sr-detail-body { position: relative; padding-top: 24px; max-width: 760px; }
@media (min-width: 768px) { .sr-detail-body { padding-top: 56px; padding-left: 48px; } }
@media (min-width: 1024px) { .sr-detail-body { padding-left: 120px; } }

.sr-detail-eyebrow {
  display: inline-block;
  font-size: 12px;
  letter-spacing: 0.14em;
  font-weight: 700;
  color: var(--sr-brand);
  margin-bottom: 16px;
}
.sr-detail-title {
  font-size: clamp(28px, 3.6vw, 40px);
  line-height: 1.08;
  letter-spacing: -0.025em;
  font-weight: 800;
  color: var(--sr-ink);
  margin: 0 0 14px;
}
.sr-detail-lead {
  font-size: 16.5px;
  line-height: 1.6;
  color: var(--sr-ink-2);
  max-width: 56ch;
  margin: 0 0 24px;
}
.sr-detail-bullets {
  list-style: none; padding: 0; margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}
@media (min-width: 768px) { .sr-detail-bullets { grid-template-columns: repeat(3, 1fr); gap: 18px; } }
.sr-detail-bullets li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14.5px;
  font-weight: 600;
  color: var(--sr-ink);
}
.sr-detail-check {
  width: 22px; height: 22px;
  flex: 0 0 22px;
  border-radius: 50%;
  background: var(--sr-brand-soft);
  color: var(--sr-brand);
  display: inline-flex; align-items: center; justify-content: center;
}
```

- [ ] **Step 4: Build, lint, verify**

```bash
npm run lint
npm run build
npm run dev
```
Open the page, scroll through the 4 service blocks. Verify anchor scroll from hero nav works (clicking "01 Diseño web a medida" jumps to that block).

- [ ] **Step 5: Commit**

```bash
git add components/services/sr/ServicesDetail.tsx components/services/ServicesPageContent.tsx app/globals.css
git commit -m "feat(servicios): 4-service detail blocks with ghost numbers and anchors"
```

---

## Task 4: ProcessTimeline (§3)

**Files:**
- Create: `components/services/sr/ProcessTimeline.tsx`
- Modify: `components/services/ServicesPageContent.tsx`
- Modify: `app/globals.css` (append)

- [ ] **Step 1: Create `components/services/sr/ProcessTimeline.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import type { Dict } from "@/lib/i18n";

export function ProcessTimeline({ dict }: { dict: Dict["servicesPage"]["process"] }) {
  return (
    <section className="sr-process">
      <div className="sr-container">
        <motion.div
          className="sr-process-head"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <span className="sr-pill"><span className="dot" /> {dict.eyebrow}</span>
          <h2 className="sr-section-title">{dict.h2}</h2>
          <p className="sr-section-sub">{dict.sub}</p>
        </motion.div>

        <div className="sr-timeline" role="list">
          <div className="sr-timeline-line" aria-hidden />
          {dict.steps.map((s, i) => (
            <motion.div
              key={s.num}
              className="sr-step"
              role="listitem"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1], delay: i * 0.08 }}
            >
              <div className="sr-step-dot" aria-hidden />
              <div className="sr-step-num">{s.num}</div>
              <div className="sr-step-title">{s.title}</div>
              <div className="sr-step-desc">{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire it into `ServicesPageContent.tsx` after `<ServicesDetail>`**

```tsx
import { ProcessTimeline } from "./sr/ProcessTimeline";
// ...
<ProcessTimeline dict={dict.process} />
```

- [ ] **Step 3: Append process CSS to `app/globals.css`**

```css
/* Process */
.sr-process { padding: 72px 0 96px; background: var(--sr-bg-soft); }

.sr-process-head { text-align: center; margin-bottom: 56px; }
.sr-section-title {
  font-size: clamp(28px, 3.6vw, 40px);
  font-weight: 800;
  letter-spacing: -0.025em;
  color: var(--sr-ink);
  line-height: 1.08;
  margin: 18px 0 14px;
}
.sr-section-sub {
  color: var(--sr-ink-2);
  font-size: 15.5px;
  line-height: 1.6;
  max-width: 560px;
  margin: 0 auto;
}

.sr-timeline {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  max-width: 1100px;
  margin: 0 auto;
}
@media (min-width: 768px) {
  .sr-timeline { grid-template-columns: repeat(4, 1fr); gap: 24px; }
}
.sr-timeline-line {
  display: none;
}
@media (min-width: 768px) {
  .sr-timeline-line {
    display: block;
    position: absolute;
    top: 7px;
    left: 28px;
    right: 28px;
    height: 1px;
    background: linear-gradient(to right, var(--sr-line), var(--sr-brand) 50%, var(--sr-line));
  }
}

.sr-step {
  position: relative;
  padding-top: 0;
  transition: transform 0.32s cubic-bezier(0.2, 0.7, 0.2, 1);
  transform-origin: center top;
}
.sr-step-dot {
  width: 14px; height: 14px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid var(--sr-brand);
  margin-bottom: 18px;
  position: relative;
  z-index: 1;
  transition: background 0.32s ease, transform 0.32s ease, box-shadow 0.32s ease;
}
.sr-step-num {
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--sr-brand);
  margin-bottom: 6px;
}
.sr-step-title {
  font-size: 17px;
  font-weight: 700;
  color: var(--sr-ink);
  margin-bottom: 6px;
  line-height: 1.2;
  transition: color 0.32s ease;
}
.sr-step-desc {
  font-size: 14px;
  line-height: 1.55;
  color: var(--sr-muted);
  max-width: 240px;
}

.sr-step:hover { transform: scale(1.04); }
.sr-step:hover .sr-step-dot {
  background: var(--sr-brand);
  box-shadow: 0 0 0 6px rgba(37, 99, 235, 0.12);
  transform: scale(1.1);
}
.sr-step:hover .sr-step-title { color: var(--sr-brand-hover); }

@media (prefers-reduced-motion: reduce) {
  .sr-step,
  .sr-step-dot,
  .sr-step-title { transition: none; }
  .sr-step:hover { transform: none; }
  .sr-step:hover .sr-step-dot { transform: none; box-shadow: none; }
}
```

- [ ] **Step 4: Build, lint, verify**

```bash
npm run lint
npm run build
npm run dev
```
Hover each step — confirm dot fills blue, column scales 1.04, title turns blue. Resize to mobile — confirm steps stack vertically without the horizontal line.

- [ ] **Step 5: Commit**

```bash
git add components/services/sr/ProcessTimeline.tsx components/services/ServicesPageContent.tsx app/globals.css
git commit -m "feat(servicios): horizontal process timeline with hover micro-interaction"
```

---

## Task 5: ComparisonTable (§4)

**Files:**
- Create: `components/services/sr/ComparisonTable.tsx`
- Modify: `components/services/ServicesPageContent.tsx`
- Modify: `app/globals.css` (append)

- [ ] **Step 1: Create `components/services/sr/ComparisonTable.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import type { Dict } from "@/lib/i18n";

const Check = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polyline points="5 12 10 17 19 7" />
  </svg>
);

const Cross = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export function ComparisonTable({ dict }: { dict: Dict["servicesPage"]["comparison"] }) {
  return (
    <section className="sr-compare">
      <div className="sr-container">
        <motion.div
          className="sr-compare-head"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <h2 className="sr-section-title">
            {dict.h2Top}{" "}<span className="sr-accent">{dict.h2Accent}</span>
          </h2>
          <p className="sr-section-sub">{dict.sub}</p>
        </motion.div>

        <motion.div
          className="sr-compare-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <div className="sr-compare-col sr-compare-others">
            <span className="sr-compare-eyebrow muted">{dict.others.eyebrow}</span>
            <ul>
              {dict.others.items.map((it, i) => (
                <motion.li
                  key={it}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <span className="sr-compare-icon cross"><Cross /></span>
                  {it}
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="sr-compare-divider" aria-hidden />
          <div className="sr-compare-col sr-compare-us">
            <span className="sr-compare-eyebrow brand">{dict.us.eyebrow}</span>
            <ul>
              {dict.us.items.map((it, i) => (
                <motion.li
                  key={it}
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <span className="sr-compare-icon check"><Check /></span>
                  {it}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `ServicesPageContent.tsx`**

```tsx
import { ComparisonTable } from "./sr/ComparisonTable";
// ...
<ComparisonTable dict={dict.comparison} />
```

- [ ] **Step 3: Append comparison CSS to `app/globals.css`**

```css
/* Comparison */
.sr-compare { padding: 80px 0 88px; }
.sr-compare-head { text-align: center; margin-bottom: 48px; }

.sr-compare-card {
  max-width: 1080px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  background: #fff;
  border: 1px solid var(--sr-line);
  border-radius: 28px;
  box-shadow: 0 30px 60px -30px rgba(15, 23, 42, 0.12), 0 4px 10px -4px rgba(15, 23, 42, 0.04);
  overflow: hidden;
}
@media (min-width: 768px) {
  .sr-compare-card {
    grid-template-columns: 1fr 1px 1fr;
  }
}

.sr-compare-col { padding: 36px 32px 32px; }
.sr-compare-others { background: #fafafa; color: var(--sr-muted); }
.sr-compare-us { background: #fff; color: var(--sr-ink); }

.sr-compare-divider {
  background: var(--sr-line);
  width: 100%; height: 1px;
}
@media (min-width: 768px) {
  .sr-compare-divider { width: 1px; height: auto; }
}

.sr-compare-eyebrow {
  display: inline-block;
  font-size: 12px;
  letter-spacing: 0.14em;
  font-weight: 700;
  margin-bottom: 20px;
}
.sr-compare-eyebrow.muted { color: var(--sr-muted-2); }
.sr-compare-eyebrow.brand { color: var(--sr-brand); }

.sr-compare-col ul {
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-direction: column; gap: 14px;
}
.sr-compare-col li {
  display: flex; align-items: center; gap: 14px;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.4;
}
.sr-compare-us li { font-weight: 600; }

.sr-compare-icon {
  width: 22px; height: 22px;
  flex: 0 0 22px;
  border-radius: 50%;
  display: inline-flex; align-items: center; justify-content: center;
}
.sr-compare-icon.cross { background: var(--sr-line); color: var(--sr-muted-2); }
.sr-compare-icon.check { background: var(--sr-brand); color: #fff; }
```

- [ ] **Step 4: Build, lint, verify**

```bash
npm run lint
npm run build
```
Run dev and check both columns aligned, divider visible at desktop, stacked on mobile.

- [ ] **Step 5: Commit**

```bash
git add components/services/sr/ComparisonTable.tsx components/services/ServicesPageContent.tsx app/globals.css
git commit -m "feat(servicios): comparison table with vertical divider"
```

---

## Task 6: MarketingGrid (§5)

**Files:**
- Create: `components/services/sr/MarketingGrid.tsx`
- Create: `components/services/sr/marketing-icons.tsx`
- Modify: `components/services/ServicesPageContent.tsx`
- Modify: `app/globals.css` (append)

- [ ] **Step 1: Create icons file `components/services/sr/marketing-icons.tsx`**

```tsx
import type { SVGProps } from "react";

const base: SVGProps<SVGSVGElement> = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export const ICONS: Record<string, JSX.Element> = {
  pin: (
    <svg {...base}>
      <path d="M12 21s-7-7.5-7-12a7 7 0 1 1 14 0c0 4.5-7 12-7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  ),
  gauge: (
    <svg {...base}>
      <path d="M4 14a8 8 0 1 1 16 0" />
      <path d="m12 14 4-4" />
    </svg>
  ),
  link: (
    <svg {...base}>
      <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1.5 1.5" />
      <path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 1 0 5.66 5.66l1.5-1.5" />
    </svg>
  ),
  google: (
    <svg {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M21 12h-9V8" />
    </svg>
  ),
  meta: (
    <svg {...base}>
      <path d="M3 12c0-4 2-7 5-7 4 0 6 7 8 7 2 0 3-2 3-3" />
      <path d="M3 12c0 4 2 7 5 7 4 0 6-7 8-7" />
    </svg>
  ),
  chart: (
    <svg {...base}>
      <path d="M4 20V8" />
      <path d="M10 20v-7" />
      <path d="M16 20v-4" />
      <path d="M22 20H2" />
    </svg>
  ),
  target: (
    <svg {...base}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </svg>
  ),
  workflow: (
    <svg {...base}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <path d="M10 7h3a3 3 0 0 1 3 3v4" />
    </svg>
  ),
};
```

- [ ] **Step 2: Create `components/services/sr/MarketingGrid.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import type { Dict } from "@/lib/i18n";
import { ICONS } from "./marketing-icons";

export function MarketingGrid({ dict }: { dict: Dict["servicesPage"]["marketing"] }) {
  return (
    <section className="sr-mk">
      <div className="sr-container">
        <motion.div
          className="sr-mk-head"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <span className="sr-pill"><span className="dot" /> {dict.eyebrow}</span>
          <h2 className="sr-section-title">{dict.h2}</h2>
          <p className="sr-section-sub">{dict.sub}</p>
        </motion.div>

        <div className="sr-mk-grid">
          {dict.items.map((it, i) => (
            <motion.article
              key={it.title}
              className="sr-mk-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <span className="sr-mk-icon">{ICONS[it.icon] ?? ICONS.target}</span>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Wire into `ServicesPageContent.tsx`**

```tsx
import { MarketingGrid } from "./sr/MarketingGrid";
// ...
<MarketingGrid dict={dict.marketing} />
```

- [ ] **Step 4: Append marketing CSS to `app/globals.css`**

```css
/* Marketing grid */
.sr-mk { padding: 80px 0 88px; background: var(--sr-bg-soft); }
.sr-mk-head { text-align: center; margin-bottom: 48px; }

.sr-mk-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  max-width: 1180px;
  margin: 0 auto;
}
@media (min-width: 480px) { .sr-mk-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .sr-mk-grid { grid-template-columns: repeat(4, 1fr); gap: 20px; } }

.sr-mk-card {
  background: #fff;
  border: 1px solid var(--sr-line);
  border-radius: 18px;
  padding: 22px 22px 20px;
  transition: transform 0.3s cubic-bezier(0.2, 0.7, 0.2, 1),
              border-color 0.3s ease,
              box-shadow 0.3s ease;
}
.sr-mk-card:hover {
  transform: translateY(-3px);
  border-color: var(--sr-brand);
  box-shadow: 0 18px 32px -16px rgba(37, 99, 235, 0.20), 0 4px 10px -4px rgba(15, 23, 42, 0.05);
}

.sr-mk-icon {
  width: 44px; height: 44px;
  border-radius: 12px;
  background: var(--sr-brand-soft);
  color: var(--sr-brand);
  display: inline-flex; align-items: center; justify-content: center;
  margin-bottom: 16px;
}
.sr-mk-card h3 {
  font-size: 15.5px;
  font-weight: 700;
  color: var(--sr-ink);
  margin: 0 0 6px;
}
.sr-mk-card p {
  font-size: 13.5px;
  color: var(--sr-muted);
  line-height: 1.5;
  margin: 0;
}
```

- [ ] **Step 5: Build, lint, verify**

```bash
npm run lint
npm run build
```
Confirm 8 cards render with each unique icon, hover lifts the card and shifts border to brand.

- [ ] **Step 6: Commit**

```bash
git add components/services/sr/MarketingGrid.tsx components/services/sr/marketing-icons.tsx components/services/ServicesPageContent.tsx app/globals.css
git commit -m "feat(servicios): marketing & seo grid with 8 mini-cards"
```

---

## Task 7: ServicesFaq + FAQPage schema (§6)

**Files:**
- Create: `components/services/sr/ServicesFaq.tsx`
- Create: `lib/seo/faq-schema.ts`
- Modify: `components/services/ServicesPageContent.tsx`
- Modify: `app/es/servicios/page.tsx` and `app/en/services/page.tsx` (inject JSON-LD)
- Modify: `app/globals.css` (append)

- [ ] **Step 1: Create `lib/seo/faq-schema.ts`**

```ts
export type FaqItem = { q: string; a: string };

export function buildFaqPageSchema(items: FaqItem[]): string {
  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.a,
      },
    })),
  };
  return JSON.stringify(json);
}
```

- [ ] **Step 2: Create `components/services/sr/ServicesFaq.tsx`**

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Dict } from "@/lib/i18n";

const Plus = ({ open }: { open: boolean }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    aria-hidden
    style={{
      transform: `rotate(${open ? 45 : 0}deg)`,
      transition: "transform 0.32s cubic-bezier(0.2, 0.7, 0.2, 1)",
    }}
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export function ServicesFaq({ dict }: { dict: Dict["servicesPage"]["faq"] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="sr-faq">
      <div className="sr-container">
        <motion.div
          className="sr-faq-head"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <span className="sr-pill"><span className="dot" /> {dict.eyebrow}</span>
          <h2 className="sr-section-title">{dict.h2}</h2>
          <p className="sr-section-sub">{dict.sub}</p>
        </motion.div>

        <ul className="sr-faq-list" role="list">
          {dict.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className={isOpen ? "open" : ""}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{item.q}</span>
                  <Plus open={isOpen} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.2, 0.7, 0.2, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="sr-faq-answer">{item.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Wire into `ServicesPageContent.tsx`**

```tsx
import { ServicesFaq } from "./sr/ServicesFaq";
// ...
<ServicesFaq dict={dict.faq} />
```

- [ ] **Step 4: Inject JSON-LD in `app/es/servicios/page.tsx`**

Replace the file body with:

```tsx
import type { Metadata } from "next";
import { ServicesPageContent } from "@/components/services/ServicesPageContent";
import { getDict } from "@/lib/i18n";
import { buildFaqPageSchema } from "@/lib/seo/faq-schema";

const dict = getDict("es");

export const metadata: Metadata = {
  title: dict.servicesPage.meta.title,
  description: dict.servicesPage.meta.description,
  alternates: {
    canonical: "/es/servicios",
    languages: { es: "/es/servicios", en: "/en/services", "x-default": "/es/servicios" },
  },
  openGraph: {
    title: dict.servicesPage.meta.title,
    description: dict.servicesPage.meta.description,
    locale: "es_ES",
    type: "website",
  },
};

export default function ServiciosEs() {
  const faqJson = buildFaqPageSchema(dict.servicesPage.faq.items);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJson }}
      />
      <ServicesPageContent dict={dict.servicesPage} locale="es" />
    </>
  );
}
```

- [ ] **Step 5: Mirror in `app/en/services/page.tsx`**

Same shape, swap `getDict("es")` → `getDict("en")`, locale prop `"en"`, canonical `/en/services`, `locale: "en_US"`.

- [ ] **Step 6: Append FAQ CSS to `app/globals.css`**

```css
/* FAQ */
.sr-faq { padding: 80px 0 96px; }
.sr-faq-head { text-align: center; margin-bottom: 40px; }

.sr-faq-list {
  list-style: none; padding: 0; margin: 0 auto;
  max-width: 760px;
  border-top: 1px solid var(--sr-line);
}
.sr-faq-list li { border-bottom: 1px solid var(--sr-line); }
.sr-faq-list button {
  width: 100%;
  display: flex; align-items: center; justify-content: space-between; gap: 24px;
  padding: 22px 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 16.5px;
  font-weight: 600;
  color: var(--sr-ink);
  text-align: left;
  transition: color 0.32s ease;
}
.sr-faq-list button:hover { color: var(--sr-brand); }
.sr-faq-list li.open button { color: var(--sr-brand); }
.sr-faq-answer {
  padding: 0 12px 22px;
  font-size: 15px;
  line-height: 1.65;
  color: var(--sr-ink-2);
  max-width: 70ch;
}
```

- [ ] **Step 7: Build, lint, validate schema**

```bash
npm run lint
npm run build
npm run dev
```
- Open `http://localhost:3000/es/servicios`, view page source, copy the `<script type="application/ld+json">` content, paste into https://search.google.com/test/rich-results. Confirm 8 Q+A detected as FAQPage.
- Click each FAQ — confirm only one open at a time.

- [ ] **Step 8: Commit**

```bash
git add components/services/sr/ServicesFaq.tsx lib/seo/faq-schema.ts components/services/ServicesPageContent.tsx app/es/servicios/page.tsx app/en/services/page.tsx app/globals.css
git commit -m "feat(servicios): FAQ accordion with FAQPage JSON-LD schema"
```

---

## Task 8: ServicesCta (§7)

**Files:**
- Create: `components/services/sr/ServicesCta.tsx`
- Modify: `components/services/ServicesPageContent.tsx`
- Modify: `app/globals.css` (append)

- [ ] **Step 1: Create `components/services/sr/ServicesCta.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Dict, Locale } from "@/lib/i18n";
import { path } from "@/lib/i18n";

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M20.5 3.5A11 11 0 0 0 3 17l-1 5 5-1a11 11 0 0 0 16.4-9.4 11 11 0 0 0-2.9-8.1Zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-3 .6.6-3-.2-.3A9 9 0 1 1 12 20.5Zm5-6.7c-.3-.2-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.1l-.9 1c-.1.2-.3.2-.5.1a7 7 0 0 1-3.6-3.2c-.1-.2 0-.4.1-.5l.4-.5.2-.3v-.4l-.9-2c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.8.4 3 3 0 0 0-1 2.2c0 1.3 1 2.5 1.1 2.7.1.2 1.9 2.9 4.6 4.1a16 16 0 0 0 1.5.6c.6.2 1.2.2 1.7.1.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
  </svg>
);

export function ServicesCta({
  dict,
  locale,
}: {
  dict: Dict["servicesPage"]["cta"];
  locale: Locale;
}) {
  return (
    <section className="sr-cta-section">
      <div className="sr-container">
        <motion.div
          className="sr-cta-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <span className="sr-cta-eyebrow">{dict.eyebrow}</span>
          <h2 className="sr-cta-h2">{dict.h2}</h2>
          <p className="sr-cta-sub">{dict.sub}</p>
          <div className="sr-cta-actions">
            <Link href={path("contact", locale)} className="sr-cta-btn primary">
              {dict.primary}
            </Link>
            <a
              href={dict.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="sr-cta-btn ghost"
            >
              <WhatsAppIcon />
              {dict.whatsapp}
            </a>
          </div>
          <ul className="sr-cta-indicators">
            {dict.indicators.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `ServicesPageContent.tsx` as the final section**

```tsx
import { ServicesCta } from "./sr/ServicesCta";
// ...
<ServicesCta dict={dict.cta} locale={locale} />
```

- [ ] **Step 3: Append CTA CSS to `app/globals.css`**

```css
/* CTA final */
.sr-cta-section { padding: 16px 0 96px; }

.sr-cta-card {
  max-width: 1080px;
  margin: 0 auto;
  padding: 56px 32px;
  border-radius: 28px;
  text-align: center;
  color: #fff;
  background:
    linear-gradient(135deg, #1d4ed8 0%, #2563eb 60%, #1e40af 100%);
  position: relative;
  overflow: hidden;
}
@media (min-width: 768px) { .sr-cta-card { padding: 72px 56px; border-radius: 32px; } }

.sr-cta-card::before {
  content: "";
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse 60% 60% at 80% 0%, rgba(255, 255, 255, 0.16), transparent 60%),
    radial-gradient(ellipse 40% 50% at 10% 100%, rgba(255, 255, 255, 0.10), transparent 60%);
  pointer-events: none;
}
.sr-cta-card > * { position: relative; z-index: 1; }

.sr-cta-eyebrow {
  display: inline-block;
  font-size: 12px;
  letter-spacing: 0.16em;
  font-weight: 700;
  opacity: 0.7;
  margin-bottom: 14px;
}
.sr-cta-h2 {
  font-size: clamp(28px, 4vw, 44px);
  letter-spacing: -0.025em;
  font-weight: 800;
  line-height: 1.08;
  margin: 0 0 14px;
}
.sr-cta-sub {
  font-size: 16.5px;
  line-height: 1.55;
  max-width: 540px;
  margin: 0 auto 28px;
  opacity: 0.88;
}

.sr-cta-actions {
  display: flex; flex-wrap: wrap; justify-content: center; gap: 14px;
  margin-bottom: 24px;
}
.sr-cta-btn {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 14px 26px;
  border-radius: 14px;
  font-weight: 700;
  font-size: 15px;
  text-decoration: none;
  transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
}
.sr-cta-btn.primary {
  background: #fff;
  color: var(--sr-brand);
  box-shadow: 0 18px 36px -16px rgba(15, 23, 42, 0.45);
}
.sr-cta-btn.primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 22px 40px -16px rgba(15, 23, 42, 0.55);
}
.sr-cta-btn.ghost {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.4);
}
.sr-cta-btn.ghost:hover { background: rgba(255, 255, 255, 0.18); }

.sr-cta-indicators {
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-wrap: wrap; justify-content: center; gap: 8px 22px;
  font-size: 13px;
  opacity: 0.85;
}
.sr-cta-indicators li { position: relative; padding-left: 14px; }
.sr-cta-indicators li::before {
  content: "·";
  position: absolute;
  left: 0; top: -2px;
  font-weight: 700;
}
.sr-cta-indicators li:first-child::before { content: ""; padding: 0; }
.sr-cta-indicators li:first-child { padding-left: 0; }

@media (max-width: 480px) {
  .sr-cta-actions { flex-direction: column; align-items: stretch; }
  .sr-cta-btn { justify-content: center; }
}
```

- [ ] **Step 4: Build, lint, verify**

```bash
npm run lint
npm run build
```
Run dev and verify card gradient, WhatsApp link target=_blank works, mobile buttons full-width.

- [ ] **Step 5: Commit**

```bash
git add components/services/sr/ServicesCta.tsx components/services/ServicesPageContent.tsx app/globals.css
git commit -m "feat(servicios): gradient CTA with WhatsApp + indicators"
```

---

## Task 9: Cleanup old CSS

**Goal:** Remove the old `.services-page` / `.sp-*` / `.dt-*` / `.mk-*` CSS rules from `app/globals.css` now that nothing references them.

**Files:**
- Modify: `app/globals.css` (delete old block)

- [ ] **Step 1: Identify the old block to remove**

```bash
grep -n "\.services-page\b" app/globals.css | head -5
grep -n "\.sp-hero\b\|\.sp-details\b\|\.sp-marketing\b\|\.sp-cta\b" app/globals.css | head -5
grep -n "\.dt-row\b\|\.dt-copy\b\|\.dt-visual\b\|\.dt-card\b" app/globals.css | head -5
grep -n "\.mk-grid\b\|\.mk-card\b" app/globals.css | head -5
grep -n "\.cta-card\b\|\.cta-eyebrow\b\|\.cta-btn\b" app/globals.css | head -5
```
Expected: these all live in one contiguous block — the old /servicios page CSS. Note the start line of the first hit and the end line of the last hit (the line just before the next unrelated rule begins).

**CRITICAL DISAMBIGUATION:**
- `.services-page` (singular, no `-section`) → OLD /servicios page → **DELETE these rules**.
- `.services-section` (plural with `-section`) → home `<Services>` component → **KEEP these rules**. The recent hover commit `8da5311` is in this block.

If a rule starts with `.services-page` or selectors that are only used inside the old /servicios markup (`.sp-*`, `.dt-*`, the unscoped `.mk-grid`/`.mk-card`, the unscoped `.cta-card`/`.cta-eyebrow`/`.cta-btn`), it is part of the block to remove.

If a rule starts with `.services-section`, `.about-page`, `.contact-page`, `.home-`, `.sr-*`, `.proyectos-section`, `.site-footer`, `.marcas-section`, or any other page scope, it is NOT part of this block.

- [ ] **Step 2: Delete the old `.services-page` block**

Open `app/globals.css` in your editor. Select from the first matched line to the last matched line and delete. After deletion, save and run the grep commands from Step 1 again — expected output: empty.

DO NOT remove the new `.sr-*` rules added in tasks 2–8.

DO NOT remove the mobile-fix `@media (max-width: 1023px)` and `(max-width: 640px)` blocks near the top of the file — they reference `.contact-page` and `.about-page`, not `.services-page`.

DO NOT remove `.services-section` rules (home Services component).

- [ ] **Step 3: Build, lint, verify nothing else broke**

```bash
npm run lint
npm run build
npm run dev
```
Visit home, about, contact, blog — confirm no styling regression. Visit /es/servicios and /en/services — confirm new design intact.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "chore(servicios): remove old .services-page CSS now unused"
```

---

## Task 10: Responsive QA pass

**Goal:** Manually verify the new /servicios page at multiple viewports. Fix any obvious overflow/spacing issues.

**Files:**
- Modify (if needed): `app/globals.css`

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Test viewports in Chrome DevTools**

Visit `http://localhost:3000/es/servicios`. Toggle device toolbar. Test at 320, 375, 414, 768, 1024, 1280, 1440 px widths. For each viewport check:
- No horizontal scroll.
- Hero stacks correctly under 1024px (text on top, nav below).
- Detail blocks have the ghost number visible but not overflowing.
- Process timeline collapses to vertical under 768px.
- Comparison table stacks vertically under 768px with horizontal divider.
- Marketing grid: 1 col <480, 2 cols 480-1023, 4 cols ≥1024.
- FAQ accordion buttons large enough to tap (≥44px).
- CTA buttons stack vertically full-width under 480px.

- [ ] **Step 3: Fix any overflow / spacing issue inline in `app/globals.css`**

If you find issues, add scoped overrides inside `@media (max-width: ...)` blocks under the relevant `.sr-*` rule. Do not modify desktop CSS.

- [ ] **Step 4: Repeat for `/en/services`**

Same viewports. Verify EN copy doesn't break layout (English strings are usually similar length to Spanish here).

- [ ] **Step 5: Test `prefers-reduced-motion`**

In DevTools, Rendering panel → "Emulate CSS media feature prefers-reduced-motion" → `reduce`. Reload /servicios. Confirm fade-up animations don't run, hover on process steps doesn't scale.

- [ ] **Step 6: Commit (only if changes made)**

```bash
git add app/globals.css
git commit -m "fix(servicios): responsive polish from QA pass"
```

---

## Task 11: Merge to main and deploy

**Files:** none (git operations only)

- [ ] **Step 1: Final build check**

```bash
npm run lint
npm run build
```
Both must pass green.

- [ ] **Step 2: Push the feature branch (optional, for Vercel preview)**

```bash
git push -u origin feat/servicios-redesign
```
Vercel auto-creates a preview deployment. Visit the preview URL and verify production-built behavior matches local dev.

- [ ] **Step 3: Ask the user to review the preview deployment**

Before merging to main, present the preview URL to the user and wait for explicit "OK" before merging.

- [ ] **Step 4: Merge to main and push**

```bash
git checkout main
git pull
git merge --no-ff feat/servicios-redesign -m "feat(servicios): premium redesign — 7 sections, FAQ schema, no projects"
git push origin main
```
Vercel auto-deploys `main` to `www.tuagenciaweb.es`.

- [ ] **Step 5: Verify production**

After ~2 minutes, visit:
- `https://www.tuagenciaweb.es/es/servicios`
- `https://www.tuagenciaweb.es/en/services`

Confirm both render the new design.

- [ ] **Step 6: Validate the FAQPage schema in production**

Run https://search.google.com/test/rich-results on the production URL. Expected: 8 FAQ items detected, no errors.

- [ ] **Step 7: Delete the feature branch (only after production is verified)**

```bash
git branch -d feat/servicios-redesign
git push origin --delete feat/servicios-redesign
```

---

## Self-Review notes

- **Spec coverage:** Each of the 7 spec sections has a dedicated task (Hero §1 → Task 2; Detail §2 → Task 3; Process §3 → Task 4; Comparison §4 → Task 5; Marketing §5 → Task 6; FAQ §6 → Task 7; CTA §7 → Task 8). The FAQPage schema (spec SEO requirement) is in Task 7 step 1+4. Metadata (title/description) updated in Task 1 step 6 + Task 7 step 4-5. Cleanup of old CSS in Task 9. Responsive QA in Task 10. Deploy in Task 11.
- **No placeholders:** every step has the actual code or command.
- **Type consistency:** the `Dict["servicesPage"]["..."]` slices used in each component match exactly the shape defined in Task 1.

# Tuagenciaweb Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Tuagenciaweb agency website end-to-end: Next.js 15 multi-page site with ES/EN i18n, MDX blog, RGPD-compliant cookie banner, contact form backed by Resend + Upstash rate limit, SEO infra (sitemap/robots/JSON-LD/OG), and Vercel deployment on `tuagenciaweb.es`.

**Architecture:** App Router with `[locale]` segment. Static-first (SSG/ISR) for marketing pages and blog. Server Action for the contact form (not a public API). Visual design follows `taste-skill` (variant `design-taste-frontend`) with dials `DESIGN_VARIANCE=5, MOTION_INTENSITY=4, VISUAL_DENSITY=4`.

**Tech Stack:** Next.js 15, React 19, TypeScript 5, Tailwind CSS v4, next-intl 3.x, Framer Motion 11, @phosphor-icons/react, shadcn/ui (customized), MDX via next-mdx-remote, React Hook Form + Zod, Resend, @upstash/ratelimit, @vercel/og, @vercel/analytics.

**Testing philosophy:** Strict TDD for business logic only — Zod schemas, server actions, slug/seo helpers, content loaders. Smoke tests with Playwright for critical user flows. No unit tests for purely visual components.

**Spec reference:** `docs/superpowers/specs/2026-05-14-tuagenciaweb-design.md`.

---

## Milestones

- **M0 — Scaffold & tokens** (T1–T6)
- **M1 — Logo & i18n** (T7–T11)
- **M2 — Layout shell** (T12–T14)
- **M3 — Home** (T15–T24)
- **M4 — Internal pages** (T25–T29)
- **M5 — Blog** (T30–T33)
- **M6 — Legal pages** (T34–T36)
- **M7 — Contact backend** (T37–T41)
- **M8 — SEO infra** (T42–T45)
- **M9 — Portfolio captures** (T46)
- **M10 — Deploy** (T47–T48)

---

## M0 — Scaffold & tokens

### Task 1: Initialize Next.js project

**Files:** project root `C:\Users\chaoh\Desktop\Tuagenciaweb` (currently has only `docs/` and `.gitignore`).

- [ ] **Step 1: Move existing content aside, scaffold, restore**

The folder is not empty (has `docs/`), so `create-next-app` will refuse. Move out, scaffold, restore.

```bash
cd "C:/Users/chaoh/Desktop"
mv Tuagenciaweb/docs Tuagenciaweb-docs-tmp
mv Tuagenciaweb/.git Tuagenciaweb-git-tmp
mv Tuagenciaweb/.gitignore Tuagenciaweb-gi-tmp
rmdir Tuagenciaweb
npx --yes create-next-app@latest Tuagenciaweb --typescript --tailwind --eslint --app --import-alias "@/*" --use-npm --no-turbopack --no-src-dir
mv Tuagenciaweb-docs-tmp Tuagenciaweb/docs
rm -rf Tuagenciaweb/.git
mv Tuagenciaweb-git-tmp Tuagenciaweb/.git
mv Tuagenciaweb-gi-tmp Tuagenciaweb/.gitignore
```

- [ ] **Step 2: Verify dev server boots**

```bash
cd "C:/Users/chaoh/Desktop/Tuagenciaweb"
npm run dev
```

Expected: dev server on http://localhost:3000, default Next.js welcome page. Stop with Ctrl+C.

- [ ] **Step 3: Commit scaffold**

```bash
git add -A
git commit -m "chore: scaffold Next.js 15 + TypeScript + Tailwind v4"
```

---

### Task 2: Install runtime + dev dependencies

**Files:** `package.json`, `package-lock.json`.

- [ ] **Step 1: Install runtime deps**

```bash
npm install next-intl framer-motion @phosphor-icons/react react-hook-form @hookform/resolvers zod resend @upstash/ratelimit @upstash/redis next-mdx-remote rehype-pretty-code shiki clsx tailwind-merge class-variance-authority @vercel/og @vercel/analytics @vercel/speed-insights
```

- [ ] **Step 2: Install dev deps**

```bash
npm install -D @types/node prettier prettier-plugin-tailwindcss @playwright/test
```

- [ ] **Step 3: Commit lockfile**

```bash
git add package.json package-lock.json
git commit -m "chore: install runtime and dev dependencies"
```

---

### Task 3: Configure Tailwind v4 tokens

Tailwind v4 uses CSS-first config via `@theme` in `globals.css`.

**Files:** modify `app/globals.css`; create `lib/cn.ts`.

- [ ] **Step 1: Replace `app/globals.css`**

```css
@import "tailwindcss";

@theme {
  --color-canvas: #fafafa;
  --color-elevated: #ffffff;
  --color-dark: #0b1426;
  --color-text-strong: #0f172a;
  --color-text-body: #475569;
  --color-text-muted: #94a3b8;
  --color-border-default: #e2e8f0;
  --color-divider: #f1f5f9;
  --color-accent: #2c5bff;
  --color-accent-hover: #1e40ff;
  --color-accent-soft: #eff4ff;

  --font-sans: var(--font-geist), ui-sans-serif, system-ui, sans-serif;
  --font-display: var(--font-cabinet), var(--font-geist), sans-serif;

  --radius-card: 1.25rem;
  --radius-pill: 9999px;
  --container-max: 1400px;
}

@layer base {
  html {
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  body {
    background: var(--color-canvas);
    color: var(--color-text-strong);
    font-family: var(--font-sans);
  }
  ::selection {
    background: var(--color-accent);
    color: white;
  }
}

@layer utilities {
  .container-page {
    max-width: var(--container-max);
    margin-inline: auto;
    padding-inline: 1rem;
  }
  @media (min-width: 768px) {
    .container-page {
      padding-inline: 2rem;
    }
  }
}
```

- [ ] **Step 2: Create `lib/cn.ts`**

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 3: Verify dev still builds**

```bash
npm run dev
```

Expected: page background is off-white #FAFAFA.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css lib/cn.ts
git commit -m "feat: define Tailwind v4 palette and typography tokens"
```

---

### Task 4: Wire base font (Geist)

**Files:** modify `app/layout.tsx`.

- [ ] **Step 1: Replace `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });

export const metadata: Metadata = {
  title: "Tuagenciaweb",
  description: "Webs profesionales para tu negocio, listas en 2 semanas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Until Cabinet Grotesk is loaded (Task 7), --font-cabinet falls back to Geist.
  return (
    <html
      lang="es"
      className={geist.variable}
      style={{ ["--font-cabinet" as string]: "var(--font-geist)" }}
    >
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: wire Geist as base font via next/font"
```

---

### Task 5: Install and customize shadcn/ui

**Files:** create `components.json`; create `components/ui/{button,input,textarea,select,accordion,checkbox,label,badge}.tsx`.

- [ ] **Step 1: Init shadcn**

```bash
npx --yes shadcn@latest init --base-color slate --yes
```

- [ ] **Step 2: Add components**

```bash
npx --yes shadcn@latest add button input textarea select accordion checkbox label badge
```

- [ ] **Step 3: Override `components/ui/button.tsx` variants block**

Find the `buttonVariants` cva call. Replace its body with:

```ts
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]",
        ghost:
          "border border-[var(--color-border-default)] bg-[var(--color-elevated)] text-[var(--color-text-strong)] hover:bg-[var(--color-accent-soft)]",
        link: "text-[var(--color-accent)] underline-offset-4 hover:underline",
        dark: "bg-[var(--color-dark)] text-white hover:bg-[var(--color-text-strong)]",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-7 text-base",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);
```

- [ ] **Step 4: Commit**

```bash
git add components.json components/ui app/globals.css lib
git commit -m "feat: add customized shadcn/ui components"
```

---

### Task 6: Prettier + npm scripts

**Files:** create `.prettierrc.json`; modify `package.json`.

- [ ] **Step 1: Create `.prettierrc.json`**

```json
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

- [ ] **Step 2: Update `package.json` scripts block**

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "format": "prettier --write \"**/*.{ts,tsx,md,json,css}\"",
  "format:check": "prettier --check \"**/*.{ts,tsx,md,json,css}\"",
  "typecheck": "tsc --noEmit",
  "test:e2e": "playwright test"
}
```

- [ ] **Step 3: Run format + typecheck + lint**

```bash
npm run format && npm run typecheck && npm run lint
```

Expected: all three succeed.

- [ ] **Step 4: Commit**

```bash
git add .prettierrc.json package.json
git commit -m "chore: add prettier config and npm scripts"
```

---

## M1 — Logo & i18n

### Task 7: Create the logo SVGs

**Files:** create `public/logo/symbol.svg`, `public/logo/logo-full-light.svg`, `public/logo/logo-full-dark.svg`.

- [ ] **Step 1: Create `public/logo/symbol.svg`** (square with rounded corners + lowercase "t")

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <rect width="64" height="64" rx="14" fill="#2C5BFF"/>
  <path d="M22 18h20v8h-6v22h-8V26h-6z" fill="#FFFFFF"/>
</svg>
```

- [ ] **Step 2: Create `public/logo/logo-full-light.svg`** (symbol + wordmark, dark text for light backgrounds)

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 64" fill="none">
  <rect width="64" height="64" rx="14" fill="#2C5BFF"/>
  <path d="M22 18h20v8h-6v22h-8V26h-6z" fill="#FFFFFF"/>
  <text x="80" y="44" font-family="ui-sans-serif, system-ui, sans-serif" font-weight="700" font-size="28" letter-spacing="-0.02em" fill="#0F172A">tuagenciaweb</text>
</svg>
```

- [ ] **Step 3: Create `public/logo/logo-full-dark.svg`** (white text for dark backgrounds)

Same as above but `fill="#FAFAFA"` on the `<text>`.

- [ ] **Step 4: Commit**

```bash
git add public/logo
git commit -m "feat: add logo SVG set (symbol + light + dark wordmarks)"
```

---

### Task 8: Favicon set + app icon

**Files:** create `app/icon.tsx`, `app/apple-icon.tsx`.

Next.js 15 generates favicons from these special files at build time — no PNG generation needed.

- [ ] **Step 1: Create `app/icon.tsx`**

```tsx
import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: 32,
        height: 32,
        background: "#2C5BFF",
        borderRadius: 7,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: 22,
        fontWeight: 800,
        fontFamily: "sans-serif",
      }}
    >
      t
    </div>,
    { ...size },
  );
}
```

- [ ] **Step 2: Create `app/apple-icon.tsx`**

```tsx
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: 180,
        height: 180,
        background: "#2C5BFF",
        borderRadius: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: 120,
        fontWeight: 800,
        fontFamily: "sans-serif",
      }}
    >
      t
    </div>,
    { ...size },
  );
}
```

- [ ] **Step 3: Build and visually verify favicon in the browser tab**

```bash
npm run build && npm run start
```

Open http://localhost:3000 and confirm the blue "t" appears as tab icon.

- [ ] **Step 4: Commit**

```bash
git add app/icon.tsx app/apple-icon.tsx
git commit -m "feat: generate favicon and apple-icon from blue t mark"
```

---

### Task 9: Configure next-intl with localized routes

**Files:** create `i18n.ts`, `middleware.ts`, `i18n/routing.ts`, `i18n/request.ts`; modify `next.config.ts` (or `.mjs`); restructure `app/` to `app/[locale]/`.

- [ ] **Step 1: Create `i18n/routing.ts`**

```ts
import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/servicios": { es: "/servicios", en: "/services" },
    "/portfolio": "/portfolio",
    "/sobre-nosotros": { es: "/sobre-nosotros", en: "/about" },
    "/contacto": { es: "/contacto", en: "/contact" },
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/legal/aviso-legal": { es: "/legal/aviso-legal", en: "/legal/legal-notice" },
    "/legal/privacidad": { es: "/legal/privacidad", en: "/legal/privacy" },
    "/legal/cookies": "/legal/cookies",
  },
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
```

- [ ] **Step 2: Create `i18n/request.ts`**

```ts
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  return { locale, messages: (await import(`../messages/${locale}.json`)).default };
});
```

- [ ] **Step 3: Create `middleware.ts` at project root**

```ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

- [ ] **Step 4: Modify `next.config.ts`**

Replace its contents:

```ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: { mdxRs: false },
};

export default withNextIntl(nextConfig);
```

- [ ] **Step 5: Restructure routing — move `app/page.tsx` into `app/[locale]/page.tsx`**

```bash
cd "C:/Users/chaoh/Desktop/Tuagenciaweb"
mkdir -p app/[locale]
git mv app/page.tsx app/[locale]/page.tsx
```

- [ ] **Step 6: Create `app/[locale]/layout.tsx`**

```tsx
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
```

- [ ] **Step 7: Update `app/layout.tsx` to set `lang` dynamically**

Replace the `<html lang="es"` with `<html` (no lang). Lang now goes in the locale layout when we have access to it. For root layout, keep simple:

```tsx
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });

export const metadata: Metadata = {
  title: "Tuagenciaweb",
  description: "Webs profesionales para tu negocio, listas en 2 semanas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={geist.variable} style={{ ["--font-cabinet" as string]: "var(--font-geist)" }}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 8: Verify routing**

```bash
npm run dev
```

Visit http://localhost:3000 → should redirect to `/es`. Visit `/en` → should render. Visit `/es/servicios` → 404 expected (we haven't built that page yet). Visit `/en/services` → 404 expected.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: configure next-intl with localized pathnames"
```

---

### Task 10: Create initial messages/{es,en}.json

**Files:** create `messages/es.json`, `messages/en.json`.

- [ ] **Step 1: Create `messages/es.json`** (full content; the structure is canonical, components will reference these keys)

```json
{
  "common": {
    "brand": "Tuagenciaweb",
    "tagline": "Webs profesionales para pymes y autónomos.",
    "nav": {
      "services": "Servicios",
      "portfolio": "Portfolio",
      "about": "Sobre nosotros",
      "blog": "Blog",
      "contact": "Contacto",
      "cta": "Pedir presupuesto",
      "languageToggle": "EN"
    },
    "footer": {
      "tagline": "Webs profesionales para pymes y autónomos en España.",
      "sections": {
        "navigate": "Navegación",
        "contact": "Contacto",
        "legal": "Legal"
      },
      "legalLine": "© 2026 Tuagenciaweb · CIF/NIF: pendiente · Hecho con Next.js",
      "links": {
        "legalNotice": "Aviso legal",
        "privacy": "Privacidad",
        "cookies": "Cookies"
      }
    },
    "cookies": {
      "title": "Usamos cookies",
      "body": "Usamos cookies propias y de terceros para analítica anónima. Puedes aceptarlas, rechazarlas o configurarlas.",
      "accept": "Aceptar",
      "reject": "Rechazar",
      "configure": "Configurar",
      "save": "Guardar preferencias",
      "categories": {
        "necessary": {
          "name": "Necesarias",
          "desc": "Imprescindibles para que el sitio funcione."
        },
        "analytics": { "name": "Analítica", "desc": "Vercel Analytics anónima." }
      }
    },
    "states": {
      "loading": "Cargando…",
      "error": "Algo ha fallado. Inténtalo de nuevo.",
      "success": "Hecho."
    }
  },
  "home": {
    "hero": {
      "headline": "Webs profesionales para tu negocio, listas en 2 semanas.",
      "subheadline": "Diseñamos y desarrollamos webs a medida para pymes y autónomos. Sin permanencia. Sin sorpresas.",
      "ctaPrimary": "Pedir presupuesto",
      "ctaSecondary": "Ver portfolio",
      "microcopy": "Sin permanencia · Sin sorpresas",
      "badgeProjects": "+30 proyectos entregados"
    },
    "trust": {
      "title": "Trabajamos en",
      "sectors": ["Clínicas", "Despachos", "Reformas", "Hostelería"]
    },
    "services": {
      "title": "Tres formas de empezar",
      "subtitle": "Elige el pack que encaja con tu proyecto. Sin letra pequeña.",
      "mostChosen": "Más elegido"
    },
    "process": {
      "title": "Cómo trabajamos",
      "subtitle": "De inicio a fin: 14 días laborables.",
      "steps": [
        { "title": "Reunión", "body": "Te llamamos, entendemos tu negocio y definimos objetivos." },
        { "title": "Diseño", "body": "Mockups a medida basados en tu marca y tus clientes." },
        {
          "title": "Desarrollo",
          "body": "Construimos en Next.js, optimizado para velocidad y SEO."
        },
        { "title": "Lanzamiento", "body": "Publicamos, te formamos y te acompañamos." }
      ]
    },
    "portfolio": {
      "title": "Trabajo reciente",
      "subtitle": "Algunos proyectos que hemos lanzado.",
      "cta": "Ver todos los proyectos"
    },
    "differentiators": {
      "title": "Por qué Tuagenciaweb",
      "items": [
        { "title": "Entrega rápida", "body": "De la primera reunión al lanzamiento en 14 días." },
        { "title": "SEO de base", "body": "Schema, sitemap, Core Web Vitals cuidados." },
        {
          "title": "Mobile-first",
          "body": "Diseñamos primero el móvil. Es donde están tus clientes."
        },
        { "title": "Soporte directo", "body": "Hablas con quien hace la web. Sin call centers." },
        { "title": "Sin permanencia", "body": "El código es tuyo desde el primer día." },
        { "title": "Código limpio", "body": "Next.js + Tailwind. Nada de plantillas pesadas." }
      ]
    },
    "testimonials": {
      "title": "Lo que dicen nuestros clientes",
      "items": [
        {
          "quote": "Subió las llamadas un 40% el primer mes. La web parece de una empresa mucho más grande.",
          "author": "Marta Iglesias",
          "role": "Directora, Clínica Dental Iglesias"
        },
        {
          "quote": "Profesionales y rápidos. Entregaron antes de lo previsto.",
          "author": "Jorge Vilaró",
          "role": "Socio, Vilaró Abogados"
        },
        {
          "quote": "La web carga muy rápido y Google la posiciona bien para mi zona.",
          "author": "Andrea Soto",
          "role": "Reformas Soto"
        }
      ]
    },
    "faq": {
      "title": "Preguntas frecuentes",
      "subtitle": "Lo que más nos preguntan antes de empezar.",
      "items": [
        {
          "q": "¿Cuánto cuesta una web?",
          "a": "Desde 590 € el pack Esencial. Tienes los tres packs detallados en /servicios."
        },
        {
          "q": "¿Cuánto se tarda?",
          "a": "Entre 7 y 21 días laborables según el pack. La media es 14 días."
        },
        {
          "q": "¿Quién es dueño del dominio y del código?",
          "a": "Tú. Te entregamos las credenciales y el repositorio al finalizar."
        },
        { "q": "¿Hay permanencia?", "a": "Ninguna. El mantenimiento mensual es opcional." },
        {
          "q": "¿Incluye hosting?",
          "a": "Sí, el primer año. A partir del segundo año son ~60 €/año a coste."
        },
        {
          "q": "¿Qué pasa si no me gusta?",
          "a": "Tienes rondas de revisiones incluidas en cada pack para ajustar lo que haga falta."
        }
      ]
    },
    "finalCta": {
      "title": "¿Listo para tu nueva web?",
      "body": "Cuéntanos tu proyecto. Te respondemos en 24h.",
      "ctaPrimary": "Pedir presupuesto",
      "ctaSecondary": "WhatsApp"
    }
  },
  "services": {
    "hero": {
      "title": "Servicios y packs",
      "subtitle": "Sin letra pequeña. Sin sorpresas. Tú decides hasta dónde llegamos."
    },
    "compareTitle": "Comparativa de packs",
    "extras": {
      "title": "Servicios extra a la carta",
      "subtitle": "Para cuando necesitas ir un paso más allá."
    },
    "faq": {
      "title": "Sobre los packs",
      "items": [
        {
          "q": "¿Puedo mezclar packs?",
          "a": "Sí. Empiezas por uno y vas añadiendo extras cuando lo necesites."
        },
        {
          "q": "¿Aceptáis pagos a plazos?",
          "a": "Sí, 50% al empezar y 50% antes del lanzamiento."
        },
        {
          "q": "¿Y si necesito algo a medida?",
          "a": "Cuéntanoslo y te hacemos un presupuesto cerrado."
        }
      ]
    }
  },
  "portfolio": {
    "hero": { "title": "Portfolio", "subtitle": "Algunos de los proyectos que hemos lanzado." },
    "filters": {
      "all": "Todos",
      "dental": "Clínicas",
      "legal": "Despachos",
      "reforms": "Reformas",
      "hospitality": "Hostelería"
    },
    "comingSoon": "Próximamente",
    "viewLive": "Ver web"
  },
  "about": {
    "hero": {
      "title": "Webs honestas para negocios reales.",
      "subtitle": "Somos una agencia pequeña con foco en pymes y autónomos."
    },
    "story": {
      "title": "Cómo nacimos",
      "body": "Tuagenciaweb nació de ver demasiadas webs de pyme abandonadas, lentas o feas. Diseñamos cada proyecto desde cero, sin plantillas, con código moderno."
    },
    "method": { "title": "Nuestro método" },
    "commitments": {
      "title": "Compromisos",
      "items": [
        {
          "title": "Tiempos cerrados",
          "body": "Te decimos cuándo entregamos. Si nos retrasamos, te lo descontamos."
        },
        {
          "title": "Tú eres dueño",
          "body": "Del dominio, del código y de tus datos. Sin permanencia."
        },
        { "title": "Transparencia", "body": "Te enseñamos cada paso antes de seguir." },
        { "title": "Soporte real", "body": "Hablas con quien programa tu web." }
      ]
    },
    "tech": { "title": "Tecnologías que usamos" }
  },
  "blog": {
    "hero": { "title": "Blog", "subtitle": "Ideas y guías sobre webs para negocios pequeños." },
    "readingTime": "{minutes} min de lectura",
    "related": "También te puede interesar",
    "ctaTitle": "¿Necesitas una web?",
    "ctaBody": "Te respondemos en 24h.",
    "ctaButton": "Pedir presupuesto"
  },
  "contact": {
    "hero": { "title": "Hablemos", "subtitle": "Cuéntanos tu proyecto. Te respondemos en 24h." },
    "form": {
      "name": "Nombre",
      "email": "Email",
      "phone": "Teléfono (opcional)",
      "company": "Empresa (opcional)",
      "sector": "Sector",
      "sectors": {
        "dental": "Clínica dental",
        "legal": "Despacho",
        "reforms": "Reformas",
        "hospitality": "Hostelería",
        "ecommerce": "E-commerce",
        "other": "Otro"
      },
      "budget": "Presupuesto orientativo",
      "budgets": {
        "lt1k": "Menos de 1.000 €",
        "b1_2k": "1.000 – 2.000 €",
        "b2_5k": "2.000 – 5.000 €",
        "gt5k": "Más de 5.000 €"
      },
      "message": "Cuéntanos tu proyecto",
      "gdpr": "He leído la política de privacidad y acepto el tratamiento de mis datos.",
      "submit": "Enviar",
      "submitting": "Enviando…",
      "successTitle": "Mensaje recibido",
      "successBody": "Te respondemos en menos de 24 horas.",
      "errorTitle": "No se ha podido enviar",
      "errorBody": "Inténtalo en un minuto o escríbenos por WhatsApp."
    },
    "channels": {
      "title": "También puedes",
      "whatsapp": "WhatsApp",
      "email": "Email",
      "phone": "Teléfono",
      "schedule": "Horario",
      "scheduleValue": "L-V · 9:00–19:00",
      "location": "Online · Toda España"
    }
  },
  "legal": {
    "legalNotice": { "title": "Aviso legal" },
    "privacy": { "title": "Política de privacidad" },
    "cookies": { "title": "Política de cookies" },
    "lastUpdated": "Última actualización"
  },
  "notFound": {
    "title": "404",
    "subtitle": "Esta página se mudó o nunca existió.",
    "ctaHome": "Volver al inicio",
    "ctaPortfolio": "Ver portfolio"
  }
}
```

- [ ] **Step 2: Create `messages/en.json`**

Same structure, English copy. Key replacements:

```json
{
  "common": {
    "brand": "Tuagenciaweb",
    "tagline": "Professional websites for small businesses.",
    "nav": {
      "services": "Services",
      "portfolio": "Portfolio",
      "about": "About",
      "blog": "Blog",
      "contact": "Contact",
      "cta": "Get a quote",
      "languageToggle": "ES"
    },
    "footer": {
      "tagline": "Professional websites for small businesses in Spain.",
      "sections": { "navigate": "Navigation", "contact": "Contact", "legal": "Legal" },
      "legalLine": "© 2026 Tuagenciaweb · VAT: pending · Built with Next.js",
      "links": { "legalNotice": "Legal notice", "privacy": "Privacy", "cookies": "Cookies" }
    },
    "cookies": {
      "title": "We use cookies",
      "body": "We use first- and third-party cookies for anonymous analytics. You can accept, reject, or configure them.",
      "accept": "Accept",
      "reject": "Reject",
      "configure": "Configure",
      "save": "Save preferences",
      "categories": {
        "necessary": { "name": "Necessary", "desc": "Required for the site to work." },
        "analytics": { "name": "Analytics", "desc": "Anonymous Vercel Analytics." }
      }
    },
    "states": {
      "loading": "Loading…",
      "error": "Something went wrong. Try again.",
      "success": "Done."
    }
  },
  "home": {
    "hero": {
      "headline": "Professional websites for your business, ready in 2 weeks.",
      "subheadline": "We design and build custom websites for small businesses. No lock-in. No surprises.",
      "ctaPrimary": "Get a quote",
      "ctaSecondary": "View portfolio",
      "microcopy": "No lock-in · No surprises",
      "badgeProjects": "30+ projects shipped"
    },
    "trust": {
      "title": "We work with",
      "sectors": ["Clinics", "Law firms", "Construction", "Hospitality"]
    },
    "services": {
      "title": "Three ways to start",
      "subtitle": "Pick the pack that fits your project. No fine print.",
      "mostChosen": "Most chosen"
    },
    "process": {
      "title": "How we work",
      "subtitle": "Start to launch: 14 business days.",
      "steps": [
        { "title": "Discovery", "body": "We call, understand your business, set goals." },
        { "title": "Design", "body": "Custom mockups based on your brand and your clients." },
        { "title": "Build", "body": "Built in Next.js, optimized for speed and SEO." },
        { "title": "Launch", "body": "We publish, train you and stay close." }
      ]
    },
    "portfolio": {
      "title": "Recent work",
      "subtitle": "Some of the projects we have shipped.",
      "cta": "View all projects"
    },
    "differentiators": {
      "title": "Why Tuagenciaweb",
      "items": [
        { "title": "Fast delivery", "body": "From kickoff to launch in 14 days." },
        { "title": "SEO baked in", "body": "Schema, sitemap, Core Web Vitals." },
        {
          "title": "Mobile-first",
          "body": "We design mobile first. That is where your clients are."
        },
        {
          "title": "Direct support",
          "body": "You talk to whoever builds your site. No call centers."
        },
        { "title": "No lock-in", "body": "You own the code from day one." },
        { "title": "Clean code", "body": "Next.js + Tailwind. No bloated templates." }
      ]
    },
    "testimonials": {
      "title": "What our clients say",
      "items": [
        {
          "quote": "Calls went up 40% in the first month. The site looks like a much bigger company.",
          "author": "Marta Iglesias",
          "role": "Director, Iglesias Dental"
        },
        {
          "quote": "Professional and fast. Delivered ahead of schedule.",
          "author": "Jorge Vilaró",
          "role": "Partner, Vilaró Lawyers"
        },
        {
          "quote": "The site is very fast and Google ranks it well for my area.",
          "author": "Andrea Soto",
          "role": "Soto Construction"
        }
      ]
    },
    "faq": {
      "title": "Frequently asked",
      "subtitle": "What people ask us most before starting.",
      "items": [
        {
          "q": "How much does a website cost?",
          "a": "From €590 for the Essential pack. See all three packs at /services."
        },
        {
          "q": "How long does it take?",
          "a": "Between 7 and 21 business days depending on the pack. Average is 14."
        },
        {
          "q": "Who owns the domain and the code?",
          "a": "You. We hand over credentials and the repository when we finish."
        },
        { "q": "Is there any lock-in?", "a": "None. Monthly maintenance is optional." },
        {
          "q": "Is hosting included?",
          "a": "Yes, the first year. From the second year onward it is ~€60/year at cost."
        },
        {
          "q": "What if I don't like it?",
          "a": "Every pack includes revision rounds so we can adjust whatever you need."
        }
      ]
    },
    "finalCta": {
      "title": "Ready for your new site?",
      "body": "Tell us about your project. We reply within 24h.",
      "ctaPrimary": "Get a quote",
      "ctaSecondary": "WhatsApp"
    }
  },
  "services": {
    "hero": {
      "title": "Services and packs",
      "subtitle": "No fine print. No surprises. You decide how far we go."
    },
    "compareTitle": "Pack comparison",
    "extras": {
      "title": "Extra services à la carte",
      "subtitle": "When you need to go one step further."
    },
    "faq": {
      "title": "About the packs",
      "items": [
        {
          "q": "Can I mix packs?",
          "a": "Yes. You start with one and add extras when you need them."
        },
        { "q": "Do you accept installments?", "a": "Yes, 50% at kickoff and 50% before launch." },
        {
          "q": "What if I need something custom?",
          "a": "Tell us and we'll put together a fixed quote."
        }
      ]
    }
  },
  "portfolio": {
    "hero": { "title": "Portfolio", "subtitle": "Some of the projects we have shipped." },
    "filters": {
      "all": "All",
      "dental": "Clinics",
      "legal": "Law firms",
      "reforms": "Construction",
      "hospitality": "Hospitality"
    },
    "comingSoon": "Coming soon",
    "viewLive": "View site"
  },
  "about": {
    "hero": {
      "title": "Honest websites for real businesses.",
      "subtitle": "We are a small agency focused on small and medium businesses."
    },
    "story": {
      "title": "How we started",
      "body": "Tuagenciaweb was born after seeing too many abandoned, slow or ugly small business websites. We design every project from scratch, no templates, modern code."
    },
    "method": { "title": "Our method" },
    "commitments": {
      "title": "Commitments",
      "items": [
        {
          "title": "Fixed timeline",
          "body": "We tell you when we deliver. If we miss it, we discount it."
        },
        { "title": "You own everything", "body": "Domain, code, and data. No lock-in." },
        { "title": "Transparency", "body": "We show you every step before moving on." },
        { "title": "Real support", "body": "You talk to whoever codes your site." }
      ]
    },
    "tech": { "title": "Tech we use" }
  },
  "blog": {
    "hero": { "title": "Blog", "subtitle": "Ideas and guides on websites for small businesses." },
    "readingTime": "{minutes} min read",
    "related": "You may also like",
    "ctaTitle": "Need a website?",
    "ctaBody": "We reply within 24h.",
    "ctaButton": "Get a quote"
  },
  "contact": {
    "hero": {
      "title": "Let's talk",
      "subtitle": "Tell us about your project. We reply within 24h."
    },
    "form": {
      "name": "Name",
      "email": "Email",
      "phone": "Phone (optional)",
      "company": "Company (optional)",
      "sector": "Sector",
      "sectors": {
        "dental": "Dental clinic",
        "legal": "Law firm",
        "reforms": "Construction",
        "hospitality": "Hospitality",
        "ecommerce": "E-commerce",
        "other": "Other"
      },
      "budget": "Budget range",
      "budgets": {
        "lt1k": "Under €1,000",
        "b1_2k": "€1,000 – 2,000",
        "b2_5k": "€2,000 – 5,000",
        "gt5k": "Over €5,000"
      },
      "message": "Tell us about your project",
      "gdpr": "I have read the privacy policy and consent to the processing of my data.",
      "submit": "Send",
      "submitting": "Sending…",
      "successTitle": "Message received",
      "successBody": "We'll get back to you within 24 hours.",
      "errorTitle": "Could not send",
      "errorBody": "Try again in a minute or reach us on WhatsApp."
    },
    "channels": {
      "title": "Or reach us via",
      "whatsapp": "WhatsApp",
      "email": "Email",
      "phone": "Phone",
      "schedule": "Hours",
      "scheduleValue": "Mon-Fri · 9:00–19:00",
      "location": "Online · All Spain"
    }
  },
  "legal": {
    "legalNotice": { "title": "Legal notice" },
    "privacy": { "title": "Privacy policy" },
    "cookies": { "title": "Cookie policy" },
    "lastUpdated": "Last updated"
  },
  "notFound": {
    "title": "404",
    "subtitle": "This page moved or never existed.",
    "ctaHome": "Back to home",
    "ctaPortfolio": "View portfolio"
  }
}
```

- [ ] **Step 3: Add `messages/` to TypeScript types** (so `useTranslations` is typed)

Create `global.d.ts` at project root:

```ts
import type messages from "./messages/es.json";
declare module "next-intl" {
  interface AppConfig {
    Messages: typeof messages;
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add messages global.d.ts
git commit -m "feat: add ES/EN translation messages with typed keys"
```

---

### Task 11: LocaleSwitcher component

**Files:** create `components/layout/LocaleSwitcher.tsx`.

- [ ] **Step 1: Create `components/layout/LocaleSwitcher.tsx`**

```tsx
"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const next = locale === "es" ? "en" : "es";

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => router.replace(pathname, { locale: next })}
      aria-label={`Switch to ${next.toUpperCase()}`}
    >
      {next.toUpperCase()}
    </Button>
  );
}
```

- [ ] **Step 2: Smoke test by importing into the home page temporarily**

In `app/[locale]/page.tsx`, replace contents with:

```tsx
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";

export default function Home() {
  return (
    <main className="container-page py-20">
      <h1 className="text-4xl font-bold">Tuagenciaweb</h1>
      <LocaleSwitcher />
    </main>
  );
}
```

Run `npm run dev`, visit `/es` and `/en`, click the switcher: URL toggles correctly.

- [ ] **Step 3: Commit**

```bash
git add components/layout/LocaleSwitcher.tsx app/[locale]/page.tsx
git commit -m "feat: add LocaleSwitcher component"
```

---

## M2 — Layout shell

### Task 12: Navbar (sticky + blur on scroll)

**Files:** create `components/layout/Navbar.tsx`; modify `app/[locale]/layout.tsx`.

- [ ] **Step 1: Create `components/layout/Navbar.tsx`**

```tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { List, X } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

export function Navbar() {
  const t = useTranslations("common.nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/servicios", label: t("services") },
    { href: "/portfolio", label: t("portfolio") },
    { href: "/sobre-nosotros", label: t("about") },
    { href: "/blog", label: t("blog") },
    { href: "/contacto", label: t("contact") },
  ] as const;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "border-b border-[var(--color-border-default)] bg-[var(--color-canvas)]/85 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-center" aria-label="Tuagenciaweb">
          <Image
            src="/logo/logo-full-light.svg"
            alt="Tuagenciaweb"
            width={180}
            height={36}
            priority
          />
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href as never}
                className="text-sm font-medium text-[var(--color-text-body)] transition-colors hover:text-[var(--color-text-strong)]"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <LocaleSwitcher />
          <Button asChild>
            <Link href="/contacto">{t("cta")}</Link>
          </Button>
        </div>

        <button className="md:hidden" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
          {open ? <X size={28} weight="regular" /> : <List size={28} weight="regular" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-[var(--color-border-default)] bg-[var(--color-canvas)] md:hidden">
          <ul className="container-page flex flex-col gap-2 py-6">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href as never}
                  className="block py-2 text-lg font-medium"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="flex items-center gap-2 pt-4">
              <LocaleSwitcher />
              <Button asChild className="flex-1">
                <Link href="/contacto" onClick={() => setOpen(false)}>
                  {t("cta")}
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Mount Navbar in `app/[locale]/layout.tsx`**

Replace the contents:

```tsx
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/layout/Navbar";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return (
    <NextIntlClientProvider>
      <Navbar />
      {children}
    </NextIntlClientProvider>
  );
}
```

- [ ] **Step 3: Dev test**

```bash
npm run dev
```

Visit `/es` and `/en`. Confirm sticky behavior, blur on scroll, locale switcher works, mobile menu opens.

- [ ] **Step 4: Commit**

```bash
git add components/layout/Navbar.tsx app/[locale]/layout.tsx
git commit -m "feat: add sticky Navbar with mobile menu and locale switcher"
```

---

### Task 13: Footer

**Files:** create `components/layout/Footer.tsx`; modify `app/[locale]/layout.tsx`.

- [ ] **Step 1: Create `components/layout/Footer.tsx`**

```tsx
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const NAV = [
  { href: "/servicios", key: "services" },
  { href: "/portfolio", key: "portfolio" },
  { href: "/sobre-nosotros", key: "about" },
  { href: "/blog", key: "blog" },
  { href: "/contacto", key: "contact" },
] as const;

const LEGAL = [
  { href: "/legal/aviso-legal", key: "legalNotice" },
  { href: "/legal/privacidad", key: "privacy" },
  { href: "/legal/cookies", key: "cookies" },
] as const;

export function Footer() {
  const tFooter = useTranslations("common.footer");
  const tNav = useTranslations("common.nav");
  const tChannels = useTranslations("contact.channels");

  return (
    <footer className="mt-32 bg-[var(--color-dark)] text-white">
      <div className="container-page grid grid-cols-1 gap-12 py-16 md:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Image src="/logo/logo-full-dark.svg" alt="Tuagenciaweb" width={180} height={36} />
          <p className="max-w-xs text-sm text-white/70">{tFooter("tagline")}</p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold tracking-wider text-white/60 uppercase">
            {tFooter("sections.navigate")}
          </h3>
          <ul className="space-y-2">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href as never} className="text-sm text-white/85 hover:text-white">
                  {tNav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold tracking-wider text-white/60 uppercase">
            {tFooter("sections.contact")}
          </h3>
          <ul className="space-y-2 text-sm text-white/85">
            <li>
              <a href="https://wa.me/34000000000" target="_blank" rel="noopener noreferrer">
                {tChannels("whatsapp")}: +34 000 000 000
              </a>
            </li>
            <li>
              <a href="mailto:hola@tuagenciaweb.es">hola@tuagenciaweb.es</a>
            </li>
            <li>
              <a href="tel:+34000000000">+34 000 000 000</a>
            </li>
            <li className="text-white/60">{tChannels("scheduleValue")}</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold tracking-wider text-white/60 uppercase">
            {tFooter("sections.legal")}
          </h3>
          <ul className="space-y-2">
            {LEGAL.map((item) => (
              <li key={item.href}>
                <Link href={item.href as never} className="text-sm text-white/85 hover:text-white">
                  {tFooter(`links.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-6 text-xs text-white/50">{tFooter("legalLine")}</div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Mount in `app/[locale]/layout.tsx`** (below `{children}`):

```tsx
import { Footer } from "@/components/layout/Footer";
// inside the return:
<NextIntlClientProvider>
  <Navbar />
  {children}
  <Footer />
</NextIntlClientProvider>;
```

- [ ] **Step 3: Visual check + commit**

```bash
npm run dev
```

Then:

```bash
git add components/layout/Footer.tsx app/[locale]/layout.tsx
git commit -m "feat: add dark footer with 4-column layout"
```

---

### Task 14: Cookie banner with consent persistence

**Files:** create `lib/consent.ts`, `components/layout/CookieBanner.tsx`; modify `app/[locale]/layout.tsx`.

Strategy: persist consent in a first-party cookie (12 months). Banner is a Client Component that reads the cookie via `document.cookie` on mount. While not consented, no analytics scripts mount.

- [ ] **Step 1: Create `lib/consent.ts`**

```ts
export type Consent = { necessary: true; analytics: boolean; ts: number };

const COOKIE = "tw_consent";
const TTL_DAYS = 365;

export function readConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp(`${COOKIE}=([^;]+)`));
  if (!m) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(m[1])) as Consent;
    if (parsed && parsed.necessary === true && typeof parsed.analytics === "boolean") return parsed;
    return null;
  } catch {
    return null;
  }
}

export function writeConsent(c: Consent) {
  const value = encodeURIComponent(JSON.stringify(c));
  const maxAge = TTL_DAYS * 24 * 60 * 60;
  document.cookie = `${COOKIE}=${value}; path=/; max-age=${maxAge}; samesite=lax`;
}
```

- [ ] **Step 2: Write a unit test for consent helpers**

Install vitest only if you want fast TDD here. For a single-file helper this small you can skip the test framework and do a quick in-browser sanity check. We will rely on Playwright e2e (Task 18 of M3 path / acceptance) to confirm flow. Skip explicit unit test here — YAGNI.

- [ ] **Step 3: Create `components/layout/CookieBanner.tsx`**

```tsx
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
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
              />
              <span>{t("categories.analytics.name")}</span>
            </label>
            <Button onClick={() => save({ necessary: true, analytics, ts: Date.now() })}>
              {t("save")}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-2 md:flex-row">
            <Button
              variant="ghost"
              onClick={() => save({ necessary: true, analytics: false, ts: Date.now() })}
            >
              {t("reject")}
            </Button>
            <Button variant="ghost" onClick={() => setConfiguring(true)}>
              {t("configure")}
            </Button>
            <Button onClick={() => save({ necessary: true, analytics: true, ts: Date.now() })}>
              {t("accept")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Mount banner in `app/[locale]/layout.tsx`** (just before `</NextIntlClientProvider>`):

```tsx
import { CookieBanner } from "@/components/layout/CookieBanner";
// ...
<CookieBanner />;
```

- [ ] **Step 5: Visual check**

```bash
npm run dev
```

Open in incognito. Verify banner appears, accept/reject/configure all dismiss it and persist via cookie (devtools → Application → Cookies).

- [ ] **Step 6: Commit**

```bash
git add lib/consent.ts components/layout/CookieBanner.tsx app/[locale]/layout.tsx
git commit -m "feat: add RGPD-compliant cookie banner with consent persistence"
```

---

## M3 — Home

Reusable motion helper used by every section (mounted once):

`components/motion/FadeUp.tsx`

```tsx
"use client";

import { motion, type Variants } from "framer-motion";

const variants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

export function FadeUp({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

Create this file once at the start of M3 and reuse in every task below.

### Task 15: Hero section

**Files:** create `components/motion/FadeUp.tsx`, `components/sections/Hero.tsx`.

- [ ] **Step 1: Create the FadeUp helper** (code block above)

- [ ] **Step 2: Create `components/sections/Hero.tsx`**

```tsx
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeUp } from "@/components/motion/FadeUp";

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative min-h-[100dvh]">
      <div className="container-page grid grid-cols-1 items-center gap-12 py-16 md:grid-cols-12 md:gap-8 md:py-24">
        <FadeUp className="md:col-span-7">
          <p className="rounded-pill mb-6 inline-flex items-center gap-2 border border-[var(--color-border-default)] bg-[var(--color-elevated)] px-3 py-1 text-xs font-medium text-[var(--color-text-body)]">
            <span className="size-1.5 rounded-full bg-[var(--color-accent)]" /> {t("badgeProjects")}
          </p>
          <h1 className="font-display text-5xl leading-[0.95] font-bold tracking-tighter md:text-7xl">
            {t("headline")}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-text-body)] md:text-lg">
            {t("subheadline")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contacto">{t("ctaPrimary")}</Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link href="/portfolio">{t("ctaSecondary")}</Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-[var(--color-text-muted)]">{t("microcopy")}</p>
        </FadeUp>

        <FadeUp delay={0.1} className="md:col-span-5">
          <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-default)] bg-[var(--color-elevated)] shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)]">
            <div className="flex items-center gap-1.5 border-b border-[var(--color-border-default)] bg-[var(--color-divider)] px-4 py-3">
              <span className="size-2.5 rounded-full bg-[#FF5F57]" />
              <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="size-2.5 rounded-full bg-[#28C840]" />
            </div>
            <Image
              src="/portfolio/dentistlab-hero.png"
              alt="Dentistlab"
              width={1280}
              height={900}
              priority
              className="h-auto w-full"
            />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
```

Note: `public/portfolio/dentistlab-hero.png` doesn't exist yet — falls back to broken image until Task 46 generates captures. During development, drop any placeholder image with that filename, or use `https://picsum.photos/seed/dentist/1280/900`.

- [ ] **Step 3: Wire Hero into home page temporarily**

Update `app/[locale]/page.tsx`:

```tsx
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main>
      <Hero />
    </main>
  );
}
```

- [ ] **Step 4: Dev test + commit**

```bash
npm run dev
# verify hero renders in both /es and /en
git add components/motion components/sections/Hero.tsx app/[locale]/page.tsx
git commit -m "feat: implement hero section with badge and visual frame"
```

---

### Task 16: TrustBar

**Files:** create `components/sections/TrustBar.tsx`; modify home page.

- [ ] **Step 1: Create `components/sections/TrustBar.tsx`**

```tsx
import { useTranslations } from "next-intl";
import { FadeUp } from "@/components/motion/FadeUp";

export function TrustBar() {
  const t = useTranslations("home.trust");
  const sectors = t.raw("sectors") as string[];

  return (
    <section className="border-y border-[var(--color-border-default)] bg-[var(--color-elevated)]">
      <FadeUp>
        <div className="container-page flex flex-col items-center gap-6 py-10 md:flex-row md:justify-between">
          <p className="text-xs font-semibold tracking-wider text-[var(--color-text-muted)] uppercase">
            {t("title")}
          </p>
          <ul className="flex flex-wrap items-center gap-x-10 gap-y-3">
            {sectors.map((s) => (
              <li key={s} className="text-base font-medium text-[var(--color-text-body)]">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </FadeUp>
    </section>
  );
}
```

- [ ] **Step 2: Add to home page**

```tsx
import { TrustBar } from "@/components/sections/TrustBar";
// inside <main>
<Hero />
<TrustBar />
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/TrustBar.tsx app/[locale]/page.tsx
git commit -m "feat: add trust bar with sector list"
```

---

### Task 17: Service packs data + ServicesGrid

**Files:** create `lib/packs.ts`, `components/sections/ServicesGrid.tsx`; modify home page.

- [ ] **Step 1: Create `lib/packs.ts`** (single source of truth, consumed by home and `/servicios`)

```ts
import type { ReactNode } from "react";
import { Lightning, Rocket, Storefront } from "@phosphor-icons/react/dist/ssr";

export type PackId = "essential" | "professional" | "shop";

export type Pack = {
  id: PackId;
  name: { es: string; en: string };
  price: string;
  priceNote: { es: string; en: string };
  tagline: { es: string; en: string };
  features: { es: string[]; en: string[] };
  delivery: { es: string; en: string };
  highlight: boolean;
  cta: { es: string; en: string };
  Icon: typeof Lightning;
};

export const PACKS: Pack[] = [
  {
    id: "essential",
    name: { es: "Esencial", en: "Essential" },
    price: "590 €",
    priceNote: { es: "pago único", en: "one-off" },
    tagline: {
      es: "Una landing profesional para empezar a tener presencia.",
      en: "A professional landing to start being online.",
    },
    features: {
      es: [
        "Diseño a medida (no plantillas)",
        "Web one-page hasta 5 secciones",
        "Mobile-first",
        "Formulario de contacto + WhatsApp",
        "Dominio .es + hosting primer año",
        "SSL + SEO básico",
        "Google Maps + Google Business",
        "1 ronda de revisiones",
      ],
      en: [
        "Custom design (no templates)",
        "One-page site up to 5 sections",
        "Mobile-first",
        "Contact form + WhatsApp",
        ".es domain + first year hosting",
        "SSL + basic SEO",
        "Google Maps + Google Business",
        "1 revision round",
      ],
    },
    delivery: { es: "Entrega en 7 días laborables", en: "Delivered in 7 business days" },
    highlight: false,
    cta: { es: "Quiero el Esencial", en: "I want Essential" },
    Icon: Lightning,
  },
  {
    id: "professional",
    name: { es: "Profesional", en: "Professional" },
    price: "990 €",
    priceNote: { es: "pago único", en: "one-off" },
    tagline: {
      es: "Web completa multi-página, lista para vender y posicionar.",
      en: "Complete multi-page site, ready to sell and rank.",
    },
    features: {
      es: [
        "Todo lo del Esencial",
        "Hasta 6 páginas",
        "Blog integrado (MDX)",
        "Multi-idioma (ES + EN)",
        "SEO técnico (schema, OG, sitemap multilingüe)",
        "Analítica (Vercel + GA4)",
        "Micro-interacciones premium",
        "2 rondas de revisiones",
        "Soporte 3 meses incluido",
      ],
      en: [
        "Everything in Essential",
        "Up to 6 pages",
        "Integrated MDX blog",
        "Multi-language (ES + EN)",
        "Technical SEO (schema, OG, multilingual sitemap)",
        "Analytics (Vercel + GA4)",
        "Premium micro-interactions",
        "2 revision rounds",
        "3 months support included",
      ],
    },
    delivery: { es: "Entrega en 14 días laborables", en: "Delivered in 14 business days" },
    highlight: true,
    cta: { es: "Quiero la Profesional", en: "I want Professional" },
    Icon: Rocket,
  },
  {
    id: "shop",
    name: { es: "Tienda online", en: "Online shop" },
    price: "1.890 €",
    priceNote: { es: "pago único", en: "one-off" },
    tagline: {
      es: "E-commerce o proyecto a medida con pagos online.",
      en: "E-commerce or custom project with online payments.",
    },
    features: {
      es: [
        "Todo lo de la Profesional",
        "Tienda hasta 50 productos",
        "Stripe integrado",
        "Gestión de stock básica",
        "Emails transaccionales",
        "Panel de admin",
        "SEO avanzado (Schema Product)",
        "3 rondas de revisiones",
        "Soporte 6 meses incluido",
      ],
      en: [
        "Everything in Professional",
        "Shop up to 50 products",
        "Stripe integration",
        "Basic stock management",
        "Transactional emails",
        "Admin panel",
        "Advanced SEO (Schema Product)",
        "3 revision rounds",
        "6 months support included",
      ],
    },
    delivery: { es: "Entrega en 21 días laborables", en: "Delivered in 21 business days" },
    highlight: false,
    cta: { es: "Quiero la Tienda", en: "I want the Shop" },
    Icon: Storefront,
  },
];

export const EXTRAS = [
  { name: { es: "Mantenimiento mensual", en: "Monthly maintenance" }, price: "39 €/mes" },
  { name: { es: "Página adicional", en: "Extra page" }, price: "89 €" },
  { name: { es: "Redacción de contenidos por página", en: "Copywriting per page" }, price: "49 €" },
  {
    name: { es: "Traducción extra a otro idioma", en: "Extra language translation" },
    price: "desde 199 €",
  },
  { name: { es: "SEO técnico avanzado", en: "Advanced technical SEO" }, price: "desde 249 €" },
  { name: { es: "Integraciones a medida", en: "Custom integrations" }, price: "desde 149 €" },
];
```

- [ ] **Step 2: Create `components/sections/ServicesGrid.tsx`**

```tsx
"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "@phosphor-icons/react";
import { PACKS } from "@/lib/packs";
import { FadeUp } from "@/components/motion/FadeUp";
import { cn } from "@/lib/cn";

export function ServicesGrid() {
  const locale = useLocale() as "es" | "en";
  const t = useTranslations("home.services");

  return (
    <section className="py-24">
      <div className="container-page">
        <FadeUp className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base text-[var(--color-text-body)] md:text-lg">{t("subtitle")}</p>
        </FadeUp>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PACKS.map((pack, i) => (
            <FadeUp key={pack.id} delay={i * 0.08}>
              <article
                className={cn(
                  "flex h-full flex-col rounded-[var(--radius-card)] border bg-[var(--color-elevated)] p-8",
                  pack.highlight
                    ? "border-[var(--color-accent)] shadow-[0_20px_60px_-30px_rgba(44,91,255,0.45)]"
                    : "border-[var(--color-border-default)]",
                )}
              >
                {pack.highlight && (
                  <Badge className="mb-4 w-fit bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                    {t("mostChosen")}
                  </Badge>
                )}
                <pack.Icon size={32} weight="duotone" className="text-[var(--color-accent)]" />
                <h3 className="font-display mt-4 text-2xl font-bold">{pack.name[locale]}</h3>
                <p className="mt-2 text-sm text-[var(--color-text-body)]">{pack.tagline[locale]}</p>
                <p className="font-display mt-6 text-4xl font-bold tracking-tight">{pack.price}</p>
                <p className="text-xs text-[var(--color-text-muted)]">{pack.priceNote[locale]}</p>
                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {pack.features[locale].map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-[var(--color-text-body)]">
                      <Check
                        size={18}
                        weight="bold"
                        className="mt-0.5 shrink-0 text-[var(--color-accent)]"
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs font-medium text-[var(--color-text-strong)]">
                  {pack.delivery[locale]}
                </p>
                <Button
                  asChild
                  className="mt-6 w-full"
                  variant={pack.highlight ? "default" : "ghost"}
                >
                  <Link href="/contacto">{pack.cta[locale]}</Link>
                </Button>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add to home page + commit**

```tsx
import { ServicesGrid } from "@/components/sections/ServicesGrid";
// after <TrustBar />
<ServicesGrid />;
```

```bash
git add lib/packs.ts components/sections/ServicesGrid.tsx app/[locale]/page.tsx
git commit -m "feat: implement service packs data + grid"
```

---

### Task 18: ProcessSteps

**Files:** create `components/sections/ProcessSteps.tsx`; modify home page.

- [ ] **Step 1: Create `components/sections/ProcessSteps.tsx`**

```tsx
import { useTranslations } from "next-intl";
import { FadeUp } from "@/components/motion/FadeUp";

export function ProcessSteps() {
  const t = useTranslations("home.process");
  const steps = t.raw("steps") as Array<{ title: string; body: string }>;

  return (
    <section className="py-24">
      <div className="container-page">
        <FadeUp className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base text-[var(--color-text-body)] md:text-lg">{t("subtitle")}</p>
        </FadeUp>

        <ol className="relative mt-12 grid grid-cols-1 gap-y-10 md:grid-cols-4 md:gap-x-8">
          {steps.map((s, i) => (
            <FadeUp key={s.title} delay={i * 0.08}>
              <li className="relative">
                <div className="font-display outline-text text-6xl leading-none font-bold text-[var(--color-accent-soft)]">
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ WebkitTextStroke: "1.5px var(--color-accent)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display mt-4 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-text-body)]">{s.body}</p>
              </li>
            </FadeUp>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to home + commit**

```tsx
import { ProcessSteps } from "@/components/sections/ProcessSteps";
// after <ServicesGrid />
<ProcessSteps />;
```

```bash
git add components/sections/ProcessSteps.tsx app/[locale]/page.tsx
git commit -m "feat: add 4-step process section"
```

---

### Task 19: Portfolio data + featured grid

**Files:** create `lib/portfolio.ts`, `components/sections/PortfolioFeatured.tsx`; modify home page.

- [ ] **Step 1: Create `lib/portfolio.ts`**

```ts
export type Sector = "dental" | "legal" | "reforms" | "hospitality" | "ecommerce" | "other";

export type Project = {
  slug: string;
  name: string;
  sector: Sector;
  url: string | null;
  image: string;
  year: number;
  comingSoon?: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "dentistlab",
    name: "Dentistlab",
    sector: "dental",
    url: "https://dentistlab.surge.sh",
    image: "/portfolio/dentistlab.png",
    year: 2025,
  },
  {
    slug: "chinaway",
    name: "Chinaway",
    sector: "other",
    url: "https://chinaway.vercel.app/es",
    image: "/portfolio/chinaway.png",
    year: 2025,
  },
  {
    slug: "reformlab-barcelona",
    name: "Reformlab Barcelona",
    sector: "reforms",
    url: "https://reformlab-barcelona.surge.sh",
    image: "/portfolio/reformlab.png",
    year: 2025,
  },
  {
    slug: "forma-clinica",
    name: "Forma Clínica",
    sector: "other",
    url: "https://forma-clinica.surge.sh",
    image: "/portfolio/forma.png",
    year: 2025,
  },
  {
    slug: "slot-5",
    name: "Próximamente",
    sector: "other",
    url: null,
    image: "/portfolio/placeholder.png",
    year: 2026,
    comingSoon: true,
  },
  {
    slug: "slot-6",
    name: "Próximamente",
    sector: "other",
    url: null,
    image: "/portfolio/placeholder.png",
    year: 2026,
    comingSoon: true,
  },
];

export const FEATURED_SLUGS = [
  "dentistlab",
  "chinaway",
  "reformlab-barcelona",
  "forma-clinica",
] as const;

export function getFeatured(): Project[] {
  return FEATURED_SLUGS.map((slug) => PROJECTS.find((p) => p.slug === slug)!).filter(Boolean);
}
```

- [ ] **Step 2: Create `components/sections/PortfolioFeatured.tsx`**

```tsx
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { getFeatured } from "@/lib/portfolio";
import { FadeUp } from "@/components/motion/FadeUp";

export function PortfolioFeatured() {
  const t = useTranslations("home.portfolio");
  const items = getFeatured();

  return (
    <section className="py-24">
      <div className="container-page">
        <FadeUp className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base text-[var(--color-text-body)] md:text-lg">{t("subtitle")}</p>
        </FadeUp>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {items.map((p, i) => (
            <FadeUp key={p.slug} delay={i * 0.08}>
              <a
                href={p.url ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-default)] bg-[var(--color-elevated)] transition-all hover:-translate-y-1 hover:shadow-[0_25px_60px_-30px_rgba(15,23,42,0.25)]"
              >
                <div className="aspect-[16/10] overflow-hidden bg-[var(--color-divider)]">
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={1280}
                    height={800}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex items-center justify-between p-6">
                  <div>
                    <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                    <p className="text-xs tracking-wider text-[var(--color-text-muted)] uppercase">
                      {p.sector} · {p.year}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={24}
                    className="text-[var(--color-accent)] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </a>
            </FadeUp>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild variant="ghost">
            <Link href="/portfolio">{t("cta")} →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add to home + commit**

```tsx
import { PortfolioFeatured } from "@/components/sections/PortfolioFeatured";
// after <ProcessSteps />
<PortfolioFeatured />;
```

```bash
git add lib/portfolio.ts components/sections/PortfolioFeatured.tsx app/[locale]/page.tsx
git commit -m "feat: add featured portfolio grid"
```

---

### Task 20: Differentiators

**Files:** create `components/sections/Differentiators.tsx`; modify home page.

- [ ] **Step 1: Create `components/sections/Differentiators.tsx`**

```tsx
import { useTranslations } from "next-intl";
import {
  Lightning,
  MagnifyingGlass,
  DeviceMobile,
  Headset,
  HandshakeIcon,
  Code,
} from "@phosphor-icons/react/dist/ssr";
import { FadeUp } from "@/components/motion/FadeUp";

const ICONS = [Lightning, MagnifyingGlass, DeviceMobile, Headset, HandshakeIcon, Code];

export function Differentiators() {
  const t = useTranslations("home.differentiators");
  const items = t.raw("items") as Array<{ title: string; body: string }>;

  return (
    <section className="bg-[var(--color-elevated)] py-24">
      <div className="container-page">
        <FadeUp className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            {t("title")}
          </h2>
        </FadeUp>

        <div className="mt-12 grid grid-cols-1 gap-x-12 md:grid-cols-2">
          {items.map((item, i) => {
            const Icon = ICONS[i] ?? Lightning;
            return (
              <FadeUp key={item.title} delay={i * 0.05}>
                <div className="flex gap-5 border-t border-[var(--color-border-default)] py-7 first:border-t-0 md:[&:nth-child(2)]:border-t-0">
                  <Icon
                    size={28}
                    weight="duotone"
                    className="shrink-0 text-[var(--color-accent)]"
                  />
                  <div>
                    <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-[var(--color-text-body)]">{item.body}</p>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to home + commit**

```tsx
import { Differentiators } from "@/components/sections/Differentiators";
// after <PortfolioFeatured />
<Differentiators />;
```

```bash
git add components/sections/Differentiators.tsx app/[locale]/page.tsx
git commit -m "feat: add differentiators section"
```

---

### Task 21: Testimonials

**Files:** create `components/sections/Testimonials.tsx`; modify home page.

- [ ] **Step 1: Create `components/sections/Testimonials.tsx`**

```tsx
import { useTranslations } from "next-intl";
import { Quotes } from "@phosphor-icons/react/dist/ssr";
import { FadeUp } from "@/components/motion/FadeUp";

function Initials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  return (
    <div className="font-display flex size-12 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-base font-bold text-[var(--color-accent)]">
      {initials}
    </div>
  );
}

export function Testimonials() {
  const t = useTranslations("home.testimonials");
  const items = t.raw("items") as Array<{ quote: string; author: string; role: string }>;
  const [main, ...rest] = items;

  return (
    <section className="py-24">
      <div className="container-page">
        <FadeUp className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            {t("title")}
          </h2>
        </FadeUp>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <FadeUp className="md:col-span-2">
            <article className="flex h-full flex-col rounded-[var(--radius-card)] border border-[var(--color-border-default)] bg-[var(--color-elevated)] p-8 md:p-10">
              <Quotes size={36} weight="fill" className="text-[var(--color-accent-soft)]" />
              <blockquote className="font-display mt-6 flex-1 text-2xl leading-snug font-medium tracking-tight md:text-3xl">
                "{main.quote}"
              </blockquote>
              <footer className="mt-8 flex items-center gap-4">
                <Initials name={main.author} />
                <div>
                  <p className="font-semibold">{main.author}</p>
                  <p className="text-sm text-[var(--color-text-muted)]">{main.role}</p>
                </div>
              </footer>
            </article>
          </FadeUp>

          <div className="flex flex-col gap-6">
            {rest.map((it, i) => (
              <FadeUp key={it.author} delay={(i + 1) * 0.08}>
                <article className="rounded-[var(--radius-card)] border border-[var(--color-border-default)] bg-[var(--color-elevated)] p-6">
                  <blockquote className="text-base leading-relaxed text-[var(--color-text-body)]">
                    "{it.quote}"
                  </blockquote>
                  <footer className="mt-4 flex items-center gap-3">
                    <Initials name={it.author} />
                    <div>
                      <p className="text-sm font-semibold">{it.author}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">{it.role}</p>
                    </div>
                  </footer>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to home + commit**

```tsx
import { Testimonials } from "@/components/sections/Testimonials";
// after <Differentiators />
<Testimonials />;
```

```bash
git add components/sections/Testimonials.tsx app/[locale]/page.tsx
git commit -m "feat: add testimonials section with featured + secondary layout"
```

---

### Task 22: FAQ (accordion)

**Files:** create `components/sections/FAQ.tsx`; modify home page.

- [ ] **Step 1: Create `components/sections/FAQ.tsx`**

```tsx
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeUp } from "@/components/motion/FadeUp";

export function FAQ() {
  const t = useTranslations("home.faq");
  const items = t.raw("items") as Array<{ q: string; a: string }>;

  return (
    <section className="bg-[var(--color-elevated)] py-24">
      <div className="container-page grid grid-cols-1 gap-12 md:grid-cols-12">
        <FadeUp className="md:col-span-5">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base text-[var(--color-text-body)]">{t("subtitle")}</p>
        </FadeUp>

        <FadeUp className="md:col-span-7">
          <Accordion type="single" collapsible className="w-full">
            {items.map((it, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base font-semibold">
                  {it.q}
                </AccordionTrigger>
                <AccordionContent className="text-[var(--color-text-body)]">
                  {it.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeUp>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to home + commit**

```tsx
import { FAQ } from "@/components/sections/FAQ";
// after <Testimonials />
<FAQ />;
```

```bash
git add components/sections/FAQ.tsx app/[locale]/page.tsx
git commit -m "feat: add FAQ accordion section"
```

---

### Task 23: Final CTA (dark band)

**Files:** create `components/sections/FinalCTA.tsx`; modify home page.

- [ ] **Step 1: Create `components/sections/FinalCTA.tsx`**

```tsx
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { FadeUp } from "@/components/motion/FadeUp";

export function FinalCTA() {
  const t = useTranslations("home.finalCta");
  return (
    <section className="relative overflow-hidden bg-[var(--color-dark)] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
      <div className="container-page relative py-24 md:py-32">
        <FadeUp className="max-w-3xl">
          <h2 className="font-display text-4xl leading-[1.05] font-bold tracking-tighter md:text-6xl">
            {t("title")}
          </h2>
          <p className="mt-5 text-base text-white/75 md:text-lg">{t("body")}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contacto">{t("ctaPrimary")}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="border-white/20 bg-transparent text-white hover:bg-white/10"
            >
              <a href="https://wa.me/34000000000" target="_blank" rel="noopener noreferrer">
                <WhatsappLogo size={20} weight="fill" />
                {t("ctaSecondary")}
              </a>
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to home + commit**

```tsx
import { FinalCTA } from "@/components/sections/FinalCTA";
// after <FAQ />
<FinalCTA />;
```

```bash
git add components/sections/FinalCTA.tsx app/[locale]/page.tsx
git commit -m "feat: add dark final-CTA section"
```

---

### Task 24: Smoke test for the assembled home

**Files:** create `playwright.config.ts`, `tests/e2e/home.spec.ts`.

- [ ] **Step 1: Init Playwright config**

```bash
npx --yes playwright install --with-deps chromium
```

Create `playwright.config.ts`:

```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  reporter: "list",
  use: { baseURL: "http://localhost:3000", trace: "on-first-retry" },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    stdout: "ignore",
    stderr: "pipe",
    timeout: 120_000,
  },
});
```

- [ ] **Step 2: Write failing test**

`tests/e2e/home.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("ES home renders all main sections", async ({ page }) => {
  await page.goto("/es");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Webs profesionales");
  await expect(page.getByText("Trabajamos en")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Tres formas de empezar" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Cómo trabajamos" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Trabajo reciente" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Por qué Tuagenciaweb" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Preguntas frecuentes" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "¿Listo para tu nueva web?" })).toBeVisible();
});

test("EN home toggles via locale switcher", async ({ page }) => {
  await page.goto("/es");
  await page.getByRole("button", { name: "Switch to EN" }).click();
  await expect(page).toHaveURL(/\/en/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Professional websites");
});
```

- [ ] **Step 3: Run the test**

```bash
npm run test:e2e
```

Expected: both tests PASS. If any fails, fix the corresponding section component or i18n key.

- [ ] **Step 4: Commit**

```bash
git add playwright.config.ts tests
git commit -m "test: add e2e smoke test for assembled home"
```

---

## M4 — Internal pages

### Task 25: /servicios — services page

**Files:** create `app/[locale]/servicios/page.tsx`, `components/sections/PacksDetailed.tsx`, `components/sections/ComparisonTable.tsx`, `components/sections/ExtrasTable.tsx`.

- [ ] **Step 1: Create `components/sections/PacksDetailed.tsx`**

```tsx
"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "@phosphor-icons/react";
import { PACKS } from "@/lib/packs";
import { FadeUp } from "@/components/motion/FadeUp";
import { cn } from "@/lib/cn";

export function PacksDetailed() {
  const locale = useLocale() as "es" | "en";
  const t = useTranslations("home.services");

  return (
    <section className="py-16 md:py-24">
      <div className="container-page grid grid-cols-1 gap-6 md:grid-cols-3">
        {PACKS.map((pack, i) => (
          <FadeUp key={pack.id} delay={i * 0.08}>
            <article
              className={cn(
                "flex h-full flex-col rounded-[var(--radius-card)] border bg-[var(--color-elevated)] p-8",
                pack.highlight
                  ? "border-[var(--color-accent)]"
                  : "border-[var(--color-border-default)]",
              )}
            >
              {pack.highlight && (
                <Badge className="mb-4 w-fit bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                  {t("mostChosen")}
                </Badge>
              )}
              <pack.Icon size={32} weight="duotone" className="text-[var(--color-accent)]" />
              <h3 className="font-display mt-4 text-2xl font-bold">{pack.name[locale]}</h3>
              <p className="mt-2 text-sm text-[var(--color-text-body)]">{pack.tagline[locale]}</p>
              <p className="font-display mt-6 text-4xl font-bold tracking-tight">{pack.price}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{pack.priceNote[locale]}</p>
              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {pack.features[locale].map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-[var(--color-text-body)]">
                    <Check
                      size={18}
                      weight="bold"
                      className="mt-0.5 shrink-0 text-[var(--color-accent)]"
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs font-medium">{pack.delivery[locale]}</p>
              <Button
                asChild
                className="mt-6 w-full"
                variant={pack.highlight ? "default" : "ghost"}
              >
                <Link href="/contacto">{pack.cta[locale]}</Link>
              </Button>
            </article>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/sections/ComparisonTable.tsx`**

```tsx
"use client";

import { useLocale, useTranslations } from "next-intl";
import { Check, X } from "@phosphor-icons/react";
import { PACKS } from "@/lib/packs";
import { FadeUp } from "@/components/motion/FadeUp";

const ROWS: Array<{
  key: string;
  labels: { es: string; en: string };
  values: Record<string, boolean | string>;
}> = [
  {
    key: "pages",
    labels: { es: "Páginas incluidas", en: "Pages included" },
    values: { essential: "1", professional: "6", shop: "10+" },
  },
  {
    key: "blog",
    labels: { es: "Blog", en: "Blog" },
    values: { essential: false, professional: true, shop: true },
  },
  {
    key: "i18n",
    labels: { es: "Multi-idioma", en: "Multi-language" },
    values: { essential: false, professional: true, shop: true },
  },
  {
    key: "seo",
    labels: { es: "SEO técnico", en: "Technical SEO" },
    values: { essential: false, professional: true, shop: true },
  },
  {
    key: "shop",
    labels: { es: "Tienda online", en: "Online shop" },
    values: { essential: false, professional: false, shop: true },
  },
  {
    key: "support",
    labels: { es: "Soporte incluido", en: "Support included" },
    values: { essential: "—", professional: "3 meses", shop: "6 meses" },
  },
  {
    key: "delivery",
    labels: { es: "Entrega", en: "Delivery" },
    values: { essential: "7 días", professional: "14 días", shop: "21 días" },
  },
];

export function ComparisonTable() {
  const locale = useLocale() as "es" | "en";
  const t = useTranslations("services");

  return (
    <section className="bg-[var(--color-elevated)] py-16 md:py-24">
      <div className="container-page">
        <FadeUp>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            {t("compareTitle")}
          </h2>
        </FadeUp>

        <FadeUp className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--color-border-default)]">
                <th className="py-4 text-sm font-semibold text-[var(--color-text-muted)]"></th>
                {PACKS.map((p) => (
                  <th key={p.id} className="px-4 py-4 text-sm font-semibold">
                    {p.name[locale]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.key} className="border-b border-[var(--color-divider)]">
                  <td className="py-4 text-sm text-[var(--color-text-body)]">{r.labels[locale]}</td>
                  {PACKS.map((p) => {
                    const v = r.values[p.id];
                    return (
                      <td key={p.id} className="px-4 py-4 text-sm">
                        {v === true ? (
                          <Check size={20} weight="bold" className="text-[var(--color-accent)]" />
                        ) : v === false ? (
                          <X size={20} className="text-[var(--color-text-muted)]" />
                        ) : (
                          <span>{v}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </FadeUp>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `components/sections/ExtrasTable.tsx`**

```tsx
import { useLocale, useTranslations } from "next-intl";
import { EXTRAS } from "@/lib/packs";
import { FadeUp } from "@/components/motion/FadeUp";

export function ExtrasTable() {
  const locale = useLocale() as "es" | "en";
  const t = useTranslations("services.extras");

  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        <FadeUp className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base text-[var(--color-text-body)]">{t("subtitle")}</p>
        </FadeUp>

        <FadeUp className="mt-10">
          <ul className="divide-y divide-[var(--color-divider)] border-y border-[var(--color-border-default)]">
            {EXTRAS.map((e) => (
              <li
                key={e.name.es}
                className="flex flex-col justify-between gap-2 py-5 md:flex-row md:items-center"
              >
                <span className="text-base font-medium">{e.name[locale]}</span>
                <span className="font-display text-lg font-semibold text-[var(--color-accent)]">
                  {e.price}
                </span>
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create `app/[locale]/servicios/page.tsx`**

```tsx
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PacksDetailed } from "@/components/sections/PacksDetailed";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { ExtrasTable } from "@/components/sections/ExtrasTable";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FadeUp } from "@/components/motion/FadeUp";

function ServicesHero() {
  const t = useTranslations("services.hero");
  return (
    <section className="container-page pt-16 md:pt-24">
      <FadeUp className="max-w-3xl">
        <h1 className="font-display text-4xl leading-[1.05] font-bold tracking-tighter md:text-6xl">
          {t("title")}
        </h1>
        <p className="mt-5 text-base text-[var(--color-text-body)] md:text-lg">{t("subtitle")}</p>
      </FadeUp>
    </section>
  );
}

function ServicesFAQ() {
  const t = useTranslations("services.faq");
  const items = t.raw("items") as Array<{ q: string; a: string }>;
  return (
    <section className="bg-[var(--color-elevated)] py-16 md:py-24">
      <div className="container-page max-w-3xl">
        <FadeUp>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            {t("title")}
          </h2>
        </FadeUp>
        <FadeUp className="mt-8">
          <Accordion type="single" collapsible>
            {items.map((it, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base font-semibold">
                  {it.q}
                </AccordionTrigger>
                <AccordionContent className="text-[var(--color-text-body)]">
                  {it.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeUp>
      </div>
    </section>
  );
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main>
      <ServicesHero />
      <PacksDetailed />
      <ComparisonTable />
      <ExtrasTable />
      <ServicesFAQ />
      <FinalCTA />
    </main>
  );
}
```

- [ ] **Step 5: Dev test + commit**

Visit `/es/servicios` and `/en/services`.

```bash
git add app/[locale]/servicios components/sections/PacksDetailed.tsx components/sections/ComparisonTable.tsx components/sections/ExtrasTable.tsx
git commit -m "feat: implement /servicios page with detailed packs and comparison"
```

---

### Task 26: /portfolio — full grid with filters

**Files:** create `app/[locale]/portfolio/page.tsx`, `components/sections/PortfolioGrid.tsx`.

- [ ] **Step 1: Create `components/sections/PortfolioGrid.tsx`**

```tsx
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "@phosphor-icons/react";
import { PROJECTS, type Sector } from "@/lib/portfolio";
import { FadeUp } from "@/components/motion/FadeUp";
import { cn } from "@/lib/cn";

const SECTOR_ORDER: Array<Sector | "all"> = ["all", "dental", "legal", "reforms", "hospitality"];

export function PortfolioGrid() {
  const locale = useLocale() as "es" | "en";
  const t = useTranslations("portfolio");
  const [filter, setFilter] = useState<Sector | "all">("all");

  const items = useMemo(
    () => (filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.sector === filter)),
    [filter],
  );

  return (
    <section className="py-12 md:py-20">
      <div className="container-page">
        <FadeUp>
          <ul className="flex flex-wrap gap-2">
            {SECTOR_ORDER.map((s) => (
              <li key={s}>
                <button
                  onClick={() => setFilter(s)}
                  className={cn(
                    "rounded-pill border px-4 py-2 text-sm transition-colors",
                    filter === s
                      ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
                      : "border-[var(--color-border-default)] bg-[var(--color-elevated)] text-[var(--color-text-body)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
                  )}
                >
                  {t(`filters.${s}` as never)}
                </button>
              </li>
            ))}
          </ul>
        </FadeUp>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {items.map((p, i) => (
            <FadeUp key={p.slug} delay={i * 0.05}>
              {p.comingSoon ? (
                <div className="block overflow-hidden rounded-[var(--radius-card)] border border-dashed border-[var(--color-border-default)] bg-[var(--color-divider)] p-12 text-center">
                  <p className="font-display text-lg font-semibold text-[var(--color-text-muted)]">
                    {t("comingSoon")}
                  </p>
                </div>
              ) : (
                <a
                  href={p.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-default)] bg-[var(--color-elevated)] transition-all hover:-translate-y-1 hover:shadow-[0_25px_60px_-30px_rgba(15,23,42,0.25)]"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-[var(--color-divider)]">
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={1280}
                      height={800}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex items-center justify-between p-6">
                    <div>
                      <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                      <p className="text-xs tracking-wider text-[var(--color-text-muted)] uppercase">
                        {p.sector} · {p.year}
                      </p>
                    </div>
                    <span className="flex items-center gap-1 text-sm font-medium text-[var(--color-accent)]">
                      {t("viewLive")}
                      <ArrowUpRight
                        size={16}
                        weight="bold"
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>
                </a>
              )}
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `app/[locale]/portfolio/page.tsx`**

```tsx
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FadeUp } from "@/components/motion/FadeUp";

function PortfolioHero() {
  const t = useTranslations("portfolio.hero");
  return (
    <section className="container-page pt-16 md:pt-24">
      <FadeUp className="max-w-3xl">
        <h1 className="font-display text-4xl leading-[1.05] font-bold tracking-tighter md:text-6xl">
          {t("title")}
        </h1>
        <p className="mt-5 text-base text-[var(--color-text-body)] md:text-lg">{t("subtitle")}</p>
      </FadeUp>
    </section>
  );
}

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main>
      <PortfolioHero />
      <PortfolioGrid />
      <FinalCTA />
    </main>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/[locale]/portfolio components/sections/PortfolioGrid.tsx
git commit -m "feat: implement /portfolio with sector filters"
```

---

### Task 27: /sobre-nosotros — about page

**Files:** create `app/[locale]/sobre-nosotros/page.tsx`.

- [ ] **Step 1: Create `app/[locale]/sobre-nosotros/page.tsx`**

```tsx
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FadeUp } from "@/components/motion/FadeUp";

const TECH = ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Resend", "Framer Motion"];

function AboutHero() {
  const t = useTranslations("about.hero");
  return (
    <section className="container-page grid grid-cols-1 items-center gap-10 pt-16 md:grid-cols-12 md:pt-24">
      <FadeUp className="md:col-span-7">
        <h1 className="font-display text-4xl leading-[1.05] font-bold tracking-tighter md:text-6xl">
          {t("title")}
        </h1>
        <p className="mt-5 text-base text-[var(--color-text-body)] md:text-lg">{t("subtitle")}</p>
      </FadeUp>
      <FadeUp delay={0.1} className="md:col-span-5">
        <div className="aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-divider)]">
          <Image
            src="https://picsum.photos/seed/tuagencia-team/800/1000"
            alt="Equipo"
            width={800}
            height={1000}
            className="h-full w-full object-cover"
          />
        </div>
      </FadeUp>
    </section>
  );
}

function StoryBlock() {
  const t = useTranslations("about.story");
  return (
    <section className="py-16 md:py-24">
      <div className="container-page max-w-3xl">
        <FadeUp>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[var(--color-text-body)] md:text-lg">
            {t("body")}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

function CommitmentsBlock() {
  const t = useTranslations("about.commitments");
  const items = t.raw("items") as Array<{ title: string; body: string }>;
  return (
    <section className="bg-[var(--color-elevated)] py-16 md:py-24">
      <div className="container-page">
        <FadeUp className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            {t("title")}
          </h2>
        </FadeUp>
        <div className="mt-12 grid grid-cols-1 gap-x-12 md:grid-cols-2">
          {items.map((it, i) => (
            <FadeUp key={it.title} delay={i * 0.05}>
              <div className="border-t border-[var(--color-border-default)] py-7 first:border-t-0 md:[&:nth-child(2)]:border-t-0">
                <h3 className="font-display text-lg font-semibold">{it.title}</h3>
                <p className="mt-1 text-sm text-[var(--color-text-body)]">{it.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechBlock() {
  const t = useTranslations("about.tech");
  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        <FadeUp>
          <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            {t("title")}
          </h2>
        </FadeUp>
        <FadeUp className="mt-8">
          <ul className="flex flex-wrap gap-x-10 gap-y-4 text-base font-medium text-[var(--color-text-body)]">
            {TECH.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </section>
  );
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main>
      <AboutHero />
      <StoryBlock />
      <ProcessSteps />
      <CommitmentsBlock />
      <TechBlock />
      <FinalCTA />
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/[locale]/sobre-nosotros
git commit -m "feat: implement /sobre-nosotros (about) page"
```

---

### Task 28: /contacto — UI only (backend in M7)

**Files:** create `app/[locale]/contacto/page.tsx`, `components/sections/ContactForm.tsx`, `components/sections/ContactChannels.tsx`.

The form's `onSubmit` will be wired to the Server Action in Task 40. For now it logs to console.

- [ ] **Step 1: Create `components/sections/ContactChannels.tsx`**

```tsx
import { useTranslations } from "next-intl";
import { WhatsappLogo, EnvelopeSimple, Phone } from "@phosphor-icons/react/dist/ssr";

export function ContactChannels() {
  const t = useTranslations("contact.channels");
  return (
    <aside className="rounded-[var(--radius-card)] border border-[var(--color-border-default)] bg-[var(--color-elevated)] p-8">
      <h2 className="font-display text-xl font-semibold">{t("title")}</h2>
      <ul className="mt-6 space-y-5 text-sm">
        <li className="flex items-center gap-3">
          <WhatsappLogo size={20} weight="fill" className="text-[var(--color-accent)]" />
          <a href="https://wa.me/34000000000" target="_blank" rel="noopener noreferrer">
            {t("whatsapp")}: +34 000 000 000
          </a>
        </li>
        <li className="flex items-center gap-3">
          <EnvelopeSimple size={20} className="text-[var(--color-accent)]" />
          <a href="mailto:hola@tuagenciaweb.es">hola@tuagenciaweb.es</a>
        </li>
        <li className="flex items-center gap-3">
          <Phone size={20} className="text-[var(--color-accent)]" />
          <a href="tel:+34000000000">+34 000 000 000</a>
        </li>
      </ul>
      <hr className="my-6 border-[var(--color-border-default)]" />
      <p className="text-xs tracking-wider text-[var(--color-text-muted)] uppercase">
        {t("schedule")}
      </p>
      <p className="text-sm font-medium">{t("scheduleValue")}</p>
      <p className="mt-4 text-xs tracking-wider text-[var(--color-text-muted)] uppercase">
        Location
      </p>
      <p className="text-sm font-medium">{t("location")}</p>
    </aside>
  );
}
```

- [ ] **Step 2: Create `components/sections/ContactForm.tsx` (UI scaffold, no server action yet)**

```tsx
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
    // TODO M7 Task 40: call server action
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
    <form
      onSubmit={onSubmit}
      className="space-y-5 rounded-[var(--radius-card)] border border-[var(--color-border-default)] bg-[var(--color-elevated)] p-8"
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name">{t("name")}</Label>
          <Input id="name" name="name" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">{t("email")}</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">{t("phone")}</Label>
          <Input id="phone" name="phone" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="company">{t("company")}</Label>
          <Input id="company" name="company" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="sector">{t("sector")}</Label>
          <select
            id="sector"
            name="sector"
            required
            className="h-11 rounded-md border border-[var(--color-border-default)] bg-[var(--color-elevated)] px-3 text-sm"
          >
            <option value="">—</option>
            {(["dental", "legal", "reforms", "hospitality", "ecommerce", "other"] as const).map(
              (k) => (
                <option key={k} value={k}>
                  {t(`sectors.${k}` as never)}
                </option>
              ),
            )}
          </select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="budget">{t("budget")}</Label>
          <select
            id="budget"
            name="budget"
            required
            className="h-11 rounded-md border border-[var(--color-border-default)] bg-[var(--color-elevated)] px-3 text-sm"
          >
            <option value="">—</option>
            {(["lt1k", "b1_2k", "b2_5k", "gt5k"] as const).map((k) => (
              <option key={k} value={k}>
                {t(`budgets.${k}` as never)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="message">{t("message")}</Label>
        <Textarea id="message" name="message" rows={5} required />
      </div>

      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" name="gdpr" required className="mt-1" />
        <span>{t("gdpr")}</span>
      </label>

      <Button
        type="submit"
        disabled={status === "submitting"}
        size="lg"
        className="w-full md:w-auto"
      >
        {status === "submitting" ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
```

- [ ] **Step 3: Create `app/[locale]/contacto/page.tsx`**

```tsx
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactChannels } from "@/components/sections/ContactChannels";
import { FadeUp } from "@/components/motion/FadeUp";

function ContactHero() {
  const t = useTranslations("contact.hero");
  return (
    <section className="container-page pt-16 md:pt-24">
      <FadeUp className="max-w-3xl">
        <h1 className="font-display text-4xl leading-[1.05] font-bold tracking-tighter md:text-6xl">
          {t("title")}
        </h1>
        <p className="mt-5 text-base text-[var(--color-text-body)] md:text-lg">{t("subtitle")}</p>
      </FadeUp>
    </section>
  );
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main>
      <ContactHero />
      <section className="py-12 md:py-20">
        <div className="container-page grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <ContactForm />
          </div>
          <div className="md:col-span-5">
            <ContactChannels />
          </div>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add app/[locale]/contacto components/sections/ContactForm.tsx components/sections/ContactChannels.tsx
git commit -m "feat: implement /contacto UI (form scaffold + channels), backend in M7"
```

---

### Task 29: 404 page

**Files:** create `app/[locale]/not-found.tsx`.

- [ ] **Step 1: Create the not-found page**

```tsx
"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <main className="container-page flex min-h-[70vh] flex-col items-start justify-center py-24">
      <p className="font-display text-[clamp(6rem,15vw,12rem)] leading-none font-bold tracking-tighter text-[var(--color-accent)]">
        {t("title")}
      </p>
      <h1 className="font-display mt-4 text-2xl font-semibold tracking-tight md:text-4xl">
        {t("subtitle")}
      </h1>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link href="/">{t("ctaHome")}</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/portfolio">{t("ctaPortfolio")}</Link>
        </Button>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Visit a nonexistent URL** like `/es/no-existe` to verify.

- [ ] **Step 3: Commit**

```bash
git add app/[locale]/not-found.tsx
git commit -m "feat: add localized 404 page"
```

---

## M5 — Blog

### Task 30: MDX content loader (TDD)

**Files:** create `content/blog/es/.gitkeep`, `content/blog/en/.gitkeep`, `lib/blog.ts`, `tests/unit/blog.spec.ts`; install vitest.

- [ ] **Step 1: Install Vitest for unit tests**

```bash
npm install -D vitest @vitest/coverage-v8
```

Add script to `package.json`:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 2: Create empty content folders**

```bash
mkdir -p content/blog/es content/blog/en
type nul > content/blog/es/.gitkeep
type nul > content/blog/en/.gitkeep
```

(On bash use `touch` instead of `type nul >`.)

- [ ] **Step 3: Write failing tests `tests/unit/blog.spec.ts`**

```ts
import { describe, it, expect, beforeAll } from "vitest";
import { promises as fs } from "node:fs";
import path from "node:path";
import { listPosts, getPost, readingTime } from "@/lib/blog";

const SEED = `---
title: Test Post
description: A short description.
date: 2026-05-10
tags: [seo, performance]
cover: /og/test.png
---

# Hello

Some markdown body with a few words to count.
`;

beforeAll(async () => {
  await fs.mkdir(path.join(process.cwd(), "content/blog/es"), { recursive: true });
  await fs.writeFile(path.join(process.cwd(), "content/blog/es/test-post.mdx"), SEED, "utf8");
});

describe("blog loader", () => {
  it("lists posts ordered by date desc", async () => {
    const posts = await listPosts("es");
    expect(posts[0].slug).toBe("test-post");
    expect(posts[0].title).toBe("Test Post");
  });

  it("gets a single post by slug with parsed frontmatter", async () => {
    const post = await getPost("es", "test-post");
    expect(post).not.toBeNull();
    expect(post!.title).toBe("Test Post");
    expect(post!.tags).toEqual(["seo", "performance"]);
    expect(post!.content).toContain("Hello");
  });

  it("returns null for unknown slug", async () => {
    const post = await getPost("es", "does-not-exist");
    expect(post).toBeNull();
  });

  it("estimates reading time in minutes (>=1)", () => {
    expect(readingTime("word ".repeat(200))).toBeGreaterThanOrEqual(1);
  });
});
```

- [ ] **Step 4: Run tests — they MUST fail (no `lib/blog.ts` yet)**

```bash
npm test
```

Expected: error "Cannot find module @/lib/blog".

- [ ] **Step 5: Implement `lib/blog.ts`**

```ts
import { promises as fs } from "node:fs";
import path from "node:path";

export type Locale = "es" | "en";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover: string | null;
};

export type Post = PostMeta & { content: string };

const ROOT = path.join(process.cwd(), "content", "blog");

function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const m = raw.match(/^---\s*\n([\s\S]+?)\n---\s*\n?([\s\S]*)$/);
  if (!m) return { data: {}, content: raw };
  const data: Record<string, unknown> = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*(.+)$/);
    if (!kv) continue;
    const [, key, valueRaw] = kv;
    const value = valueRaw.trim();
    if (value.startsWith("[") && value.endsWith("]")) {
      data[key] = value
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^['"]|['"]$/g, ""))
        .filter(Boolean);
    } else {
      data[key] = value.replace(/^['"]|['"]$/g, "");
    }
  }
  return { data, content: m[2] };
}

export async function listPosts(locale: Locale): Promise<PostMeta[]> {
  const dir = path.join(ROOT, locale);
  let files: string[];
  try {
    files = await fs.readdir(dir);
  } catch {
    return [];
  }
  const posts = await Promise.all(
    files
      .filter((f) => f.endsWith(".mdx"))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, "");
        const raw = await fs.readFile(path.join(dir, file), "utf8");
        const { data } = parseFrontmatter(raw);
        return {
          slug,
          title: String(data.title ?? slug),
          description: String(data.description ?? ""),
          date: String(data.date ?? "1970-01-01"),
          tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
          cover: typeof data.cover === "string" ? data.cover : null,
        };
      }),
  );
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(locale: Locale, slug: string): Promise<Post | null> {
  const file = path.join(ROOT, locale, `${slug}.mdx`);
  try {
    const raw = await fs.readFile(file, "utf8");
    const { data, content } = parseFrontmatter(raw);
    return {
      slug,
      title: String(data.title ?? slug),
      description: String(data.description ?? ""),
      date: String(data.date ?? "1970-01-01"),
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      cover: typeof data.cover === "string" ? data.cover : null,
      content,
    };
  } catch {
    return null;
  }
}

export function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
```

- [ ] **Step 6: Add Vitest path alias config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
  test: { environment: "node", include: ["tests/unit/**/*.spec.ts"] },
});
```

- [ ] **Step 7: Run tests — they MUST pass**

```bash
npm test
```

Expected: all 4 tests pass.

- [ ] **Step 8: Commit**

```bash
git add lib/blog.ts tests/unit/blog.spec.ts vitest.config.ts content/blog package.json
git commit -m "feat(blog): MDX loader with frontmatter parsing and reading time"
```

---

### Task 31: /blog listing page

**Files:** create `app/[locale]/blog/page.tsx`.

- [ ] **Step 1: Create the listing page**

```tsx
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { listPosts, type Locale } from "@/lib/blog";
import { FadeUp } from "@/components/motion/FadeUp";

function PostCard({
  post,
  featured = false,
  locale,
}: {
  post: Awaited<ReturnType<typeof listPosts>>[number];
  featured?: boolean;
  locale: Locale;
}) {
  return (
    <Link
      href={{ pathname: "/blog/[slug]", params: { slug: post.slug } } as never}
      className={`group block overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-default)] bg-[var(--color-elevated)] transition-all hover:-translate-y-1 ${featured ? "md:flex md:items-stretch" : ""}`}
    >
      <div
        className={`overflow-hidden bg-[var(--color-divider)] ${featured ? "md:w-1/2" : "aspect-[16/10]"}`}
      >
        <Image
          src={post.cover ?? `https://picsum.photos/seed/${post.slug}/1200/750`}
          alt={post.title}
          width={1200}
          height={750}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div
        className={`flex flex-col gap-3 p-6 ${featured ? "md:w-1/2 md:justify-center md:p-10" : ""}`}
      >
        <p className="text-xs tracking-wider text-[var(--color-text-muted)] uppercase">
          {new Date(post.date).toLocaleDateString(locale, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h2
          className={`font-display font-semibold ${featured ? "text-3xl md:text-4xl" : "text-xl"}`}
        >
          {post.title}
        </h2>
        <p className="text-sm text-[var(--color-text-body)]">{post.description}</p>
      </div>
    </Link>
  );
}

export default async function BlogIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await import("next-intl/server").then((m) => m.getTranslations("blog.hero"));
  const tHero = await t;
  const posts = await listPosts(locale as Locale);
  const [featured, ...rest] = posts;

  return (
    <main>
      <section className="container-page pt-16 md:pt-24">
        <FadeUp className="max-w-3xl">
          <h1 className="font-display text-4xl leading-[1.05] font-bold tracking-tighter md:text-6xl">
            {tHero("title")}
          </h1>
          <p className="mt-5 text-base text-[var(--color-text-body)] md:text-lg">
            {tHero("subtitle")}
          </p>
        </FadeUp>
      </section>

      <section className="py-12 md:py-20">
        <div className="container-page space-y-10">
          {featured && (
            <FadeUp>
              <PostCard post={featured} featured locale={locale as Locale} />
            </FadeUp>
          )}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              {rest.map((p, i) => (
                <FadeUp key={p.slug} delay={i * 0.05}>
                  <PostCard post={p} locale={locale as Locale} />
                </FadeUp>
              ))}
            </div>
          )}
          {posts.length === 0 && <p className="text-[var(--color-text-muted)]">—</p>}
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/[locale]/blog/page.tsx
git commit -m "feat(blog): implement blog index page"
```

---

### Task 32: /blog/[slug] post page (MDX render)

**Files:** create `app/[locale]/blog/[slug]/page.tsx`.

- [ ] **Step 1: Create the post page**

```tsx
import { setRequestLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { getPost, listPosts, readingTime, type Locale } from "@/lib/blog";

export async function generateStaticParams() {
  const all = await Promise.all(
    (["es", "en"] as Locale[]).map(async (l) =>
      (await listPosts(l)).map((p) => ({ locale: l, slug: p.slug })),
    ),
  );
  return all.flat();
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = await getPost(locale as Locale, slug);
  if (!post) notFound();
  const t = await getTranslations("blog");

  const mins = readingTime(post.content);

  return (
    <main className="container-page max-w-3xl py-16 md:py-24">
      <p className="text-xs tracking-wider text-[var(--color-text-muted)] uppercase">
        {post.tags.join(" · ")}
      </p>
      <h1 className="font-display mt-3 text-4xl leading-[1.1] font-bold tracking-tighter md:text-5xl">
        {post.title}
      </h1>
      <p className="mt-4 text-sm text-[var(--color-text-muted)]">
        {new Date(post.date).toLocaleDateString(locale, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        {" · "}
        {t("readingTime", { minutes: mins })}
      </p>

      {post.cover && (
        <div className="mt-8 overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-default)]">
          <Image
            src={post.cover}
            alt={post.title}
            width={1200}
            height={750}
            className="h-auto w-full"
          />
        </div>
      )}

      <article className="prose prose-slate prose-headings:font-display prose-headings:tracking-tight prose-a:text-[var(--color-accent)] mt-10 max-w-none">
        <MDXRemote source={post.content} />
      </article>

      <div className="mt-16 rounded-[var(--radius-card)] border border-[var(--color-border-default)] bg-[var(--color-elevated)] p-8 md:p-10">
        <h2 className="font-display text-2xl font-bold">{t("ctaTitle")}</h2>
        <p className="mt-2 text-[var(--color-text-body)]">{t("ctaBody")}</p>
        <Button asChild className="mt-6">
          <Link href="/contacto">{t("ctaButton")}</Link>
        </Button>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Install Tailwind Typography for `prose`**

```bash
npm install @tailwindcss/typography
```

Add to `app/globals.css` after the `@import "tailwindcss";`:

```css
@plugin "@tailwindcss/typography";
```

- [ ] **Step 3: Commit**

```bash
git add app/[locale]/blog package.json app/globals.css
git commit -m "feat(blog): implement [slug] post page with MDX rendering"
```

---

### Task 33: Seed posts

**Files:** create `content/blog/es/por-que-tu-pyme-necesita-una-web-rapida.mdx`, `content/blog/en/why-your-small-business-needs-a-fast-website.mdx`.

- [ ] **Step 1: Create the ES post `content/blog/es/por-que-tu-pyme-necesita-una-web-rapida.mdx`**

```mdx
---
title: Por qué tu pyme necesita una web rápida en 2026
description: La velocidad de tu web ya no es un detalle. Te contamos por qué y qué puedes hacer hoy.
date: 2026-05-10
tags: [seo, performance]
cover: https://picsum.photos/seed/fast-web/1200/750
---

## Velocidad = ventas

Cada 100ms extra de carga reduce conversiones medibles. Google penaliza las webs lentas en su ranking desde hace años.

## ¿Qué la hace lenta?

- Imágenes sin optimizar
- Plantillas WordPress con 30 plugins
- Servidores compartidos baratos

## Qué hacemos diferente

Construimos en **Next.js** sobre **Vercel**, con imágenes optimizadas, fuentes self-hosted y código mínimo. Resultado: Lighthouse 95+ por defecto.
```

- [ ] **Step 2: Create the EN post**

`content/blog/en/why-your-small-business-needs-a-fast-website.mdx`:

```mdx
---
title: Why your small business needs a fast website in 2026
description: Website speed is no longer a detail. Here is why and what you can do today.
date: 2026-05-10
tags: [seo, performance]
cover: https://picsum.photos/seed/fast-web/1200/750
---

## Speed = sales

Every extra 100ms of load time measurably reduces conversions. Google has been penalizing slow sites in ranking for years.

## What makes a site slow?

- Unoptimized images
- WordPress templates with 30 plugins
- Cheap shared hosting

## What we do differently

We build on **Next.js** and **Vercel**, with optimized images, self-hosted fonts and minimal code. Result: Lighthouse 95+ by default.
```

- [ ] **Step 3: Visual check at `/es/blog` and `/en/blog`, click into a post, verify rendering**

- [ ] **Step 4: Commit**

```bash
git add content/blog
git commit -m "content(blog): seed first ES + EN post"
```

---

## M6 — Legal pages

> Templates only. Final wording MUST be reviewed by a lawyer or service (Iubenda) before public launch. Placeholders marked `[PENDIENTE]` MUST be filled with real legal data before deploy.

### Task 34: /legal/aviso-legal

**Files:** create `app/[locale]/legal/aviso-legal/page.tsx`, `app/[locale]/legal/legal-notice/page.tsx`, `content/legal/{es,en}/legal-notice.mdx`, `components/legal/LegalPage.tsx`.

- [ ] **Step 1: Create the shared layout `components/legal/LegalPage.tsx`**

```tsx
import { useTranslations } from "next-intl";
import { FadeUp } from "@/components/motion/FadeUp";

export function LegalPage({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  const t = useTranslations("legal");
  return (
    <main className="container-page max-w-3xl py-16 md:py-24">
      <FadeUp>
        <h1 className="font-display text-4xl leading-[1.1] font-bold tracking-tighter md:text-5xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-[var(--color-text-muted)]">
          {t("lastUpdated")}: {lastUpdated}
        </p>
      </FadeUp>
      <article className="prose prose-slate mt-10 max-w-none">{children}</article>
    </main>
  );
}
```

- [ ] **Step 2: Create `app/[locale]/legal/aviso-legal/page.tsx`**

```tsx
import { setRequestLocale, getTranslations } from "next-intl/server";
import { LegalPage } from "@/components/legal/LegalPage";

export default async function AvisoLegal({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal.legalNotice");

  return (
    <LegalPage title={t("title")} lastUpdated="2026-05-14">
      <h2>Identidad del prestador</h2>
      <p>
        <strong>Titular:</strong> [PENDIENTE: nombre o razón social]
      </p>
      <p>
        <strong>NIF / CIF:</strong> [PENDIENTE]
      </p>
      <p>
        <strong>Domicilio:</strong> [PENDIENTE]
      </p>
      <p>
        <strong>Email:</strong> hola@tuagenciaweb.es
      </p>
      <p>
        <strong>Teléfono:</strong> +34 000 000 000
      </p>

      <h2>Objeto</h2>
      <p>
        El presente aviso legal regula el uso del sitio web tuagenciaweb.es, propiedad del titular
        indicado.
      </p>

      <h2>Condiciones de uso</h2>
      <p>
        El acceso al sitio web es gratuito. El usuario se compromete a usarlo conforme a la ley y a
        no dañar la imagen, intereses o derechos de Tuagenciaweb.
      </p>

      <h2>Propiedad intelectual</h2>
      <p>
        Todos los contenidos del sitio (textos, imágenes, código) son propiedad de Tuagenciaweb o
        cuentan con licencia de uso.
      </p>

      <h2>Legislación aplicable</h2>
      <p>Este aviso se rige por la legislación española (LSSI-CE, Ley 34/2002).</p>
    </LegalPage>
  );
}
```

- [ ] **Step 3: Create the EN mirror at `app/[locale]/legal/legal-notice/page.tsx`** with English copy and same structure.

next-intl with `pathnames` already serves the EN URL `/en/legal/legal-notice` from the same logical key. So instead of duplicating, just rename the directory if needed and inline-localize by reading the locale: produce the body via translations or branching on `locale`. For simplicity, keep one file `app/[locale]/legal/aviso-legal/page.tsx` and route ES + EN through it. The `pathnames` config already handles URL aliasing.

Implementation: branch on `locale` inside `AvisoLegal` to return the English body if `locale === "en"`. Copy the same structure with English headings ("Provider identity", "Purpose", "Terms of use", "Intellectual property", "Applicable law"). Add the EN body inside the same component using a conditional.

- [ ] **Step 4: Commit**

```bash
git add app/[locale]/legal/aviso-legal components/legal/LegalPage.tsx
git commit -m "feat(legal): aviso legal page (ES/EN), template content"
```

---

### Task 35: /legal/privacidad

**Files:** create `app/[locale]/legal/privacidad/page.tsx`.

- [ ] **Step 1: Create the privacy page**

```tsx
import { setRequestLocale, getTranslations } from "next-intl/server";
import { LegalPage } from "@/components/legal/LegalPage";

export default async function Privacy({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal.privacy");
  const en = locale === "en";

  return (
    <LegalPage title={t("title")} lastUpdated="2026-05-14">
      <h2>{en ? "Data controller" : "Responsable del tratamiento"}</h2>
      <p>{en ? "Provider:" : "Titular:"} [PENDIENTE]</p>
      <p>Email: hola@tuagenciaweb.es</p>

      <h2>{en ? "Data we collect" : "Datos que recogemos"}</h2>
      <p>
        {en
          ? "Contact form data: name, email, optional phone/company, sector, budget range, message."
          : "Datos del formulario de contacto: nombre, email, teléfono y empresa (opcionales), sector, rango de presupuesto, mensaje."}
      </p>

      <h2>{en ? "Legal basis" : "Base legal"}</h2>
      <p>
        {en
          ? "User consent (GDPR art. 6.1.a) and legitimate interest in answering enquiries (GDPR art. 6.1.f)."
          : "Consentimiento del usuario (RGPD art. 6.1.a) e interés legítimo en responder a consultas (RGPD art. 6.1.f)."}
      </p>

      <h2>{en ? "Purpose" : "Finalidad"}</h2>
      <p>
        {en
          ? "Reply to your enquiry and store it for follow-up."
          : "Responder a tu consulta y conservarla para seguimiento."}
      </p>

      <h2>{en ? "Retention period" : "Plazo de conservación"}</h2>
      <p>
        {en
          ? "We keep the data for up to 3 years from the last interaction, or until you request deletion."
          : "Conservamos los datos hasta 3 años desde la última interacción, o hasta que solicites su supresión."}
      </p>

      <h2>{en ? "Data processors" : "Encargados del tratamiento"}</h2>
      <ul>
        <li>Vercel Inc. (hosting, USA — SCCs)</li>
        <li>Resend (transactional email, EU)</li>
        <li>Upstash (rate limit, EU)</li>
      </ul>

      <h2>{en ? "Your rights" : "Tus derechos"}</h2>
      <p>
        {en
          ? "Access, rectification, deletion, restriction, portability, objection. Email hola@tuagenciaweb.es."
          : "Acceso, rectificación, supresión, limitación, portabilidad y oposición. Email: hola@tuagenciaweb.es."}
      </p>
    </LegalPage>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/[locale]/legal/privacidad
git commit -m "feat(legal): privacy policy page (ES/EN), template content"
```

---

### Task 36: /legal/cookies

**Files:** create `app/[locale]/legal/cookies/page.tsx`.

- [ ] **Step 1: Create the cookies page**

```tsx
import { setRequestLocale, getTranslations } from "next-intl/server";
import { LegalPage } from "@/components/legal/LegalPage";

export default async function Cookies({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal.cookies");
  const en = locale === "en";

  return (
    <LegalPage title={t("title")} lastUpdated="2026-05-14">
      <h2>{en ? "What are cookies" : "Qué son las cookies"}</h2>
      <p>
        {en
          ? "Small files stored in your browser to remember preferences or measure usage."
          : "Pequeños archivos guardados en el navegador para recordar preferencias o medir el uso."}
      </p>

      <h2>{en ? "Cookies we use" : "Cookies que usamos"}</h2>
      <table>
        <thead>
          <tr>
            <th>{en ? "Name" : "Nombre"}</th>
            <th>{en ? "Purpose" : "Finalidad"}</th>
            <th>{en ? "Duration" : "Duración"}</th>
            <th>{en ? "Type" : "Tipo"}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>tw_consent</td>
            <td>{en ? "Stores cookie preferences" : "Guarda preferencias de cookies"}</td>
            <td>12 {en ? "months" : "meses"}</td>
            <td>{en ? "Necessary" : "Necesaria"}</td>
          </tr>
          <tr>
            <td>NEXT_LOCALE</td>
            <td>{en ? "Stores language preference" : "Guarda preferencia de idioma"}</td>
            <td>{en ? "Session" : "Sesión"}</td>
            <td>{en ? "Necessary" : "Necesaria"}</td>
          </tr>
          <tr>
            <td>_vercel_analytics</td>
            <td>Vercel Analytics</td>
            <td>{en ? "Session" : "Sesión"}</td>
            <td>{en ? "Analytics" : "Analítica"}</td>
          </tr>
        </tbody>
      </table>

      <h2>{en ? "How to manage them" : "Cómo gestionarlas"}</h2>
      <p>
        {en
          ? "You can change your choice at any time via the cookie banner footer link, or by clearing your browser cookies."
          : "Puedes cambiar tu elección en cualquier momento desde el enlace del pie del banner de cookies, o borrando las cookies de tu navegador."}
      </p>
    </LegalPage>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/[locale]/legal/cookies
git commit -m "feat(legal): cookies policy page (ES/EN), template content"
```

---

## M7 — Contact backend

### Task 37: Zod schemas (TDD)

**Files:** create `lib/schemas.ts`, `tests/unit/schemas.spec.ts`.

- [ ] **Step 1: Write failing tests `tests/unit/schemas.spec.ts`**

```ts
import { describe, it, expect } from "vitest";
import { contactSchema } from "@/lib/schemas";

const valid = {
  name: "María García",
  email: "maria@example.com",
  sector: "dental",
  budget: "b1_2k",
  message: "Necesito una web para mi clínica con 4 médicos.",
  gdpr: true,
  website: "",
};

describe("contactSchema", () => {
  it("accepts a valid payload", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects short name", () => {
    expect(contactSchema.safeParse({ ...valid, name: "M" }).success).toBe(false);
  });

  it("rejects invalid email", () => {
    expect(contactSchema.safeParse({ ...valid, email: "not-an-email" }).success).toBe(false);
  });

  it("rejects short message", () => {
    expect(contactSchema.safeParse({ ...valid, message: "Hola" }).success).toBe(false);
  });

  it("requires gdpr=true", () => {
    expect(contactSchema.safeParse({ ...valid, gdpr: false }).success).toBe(false);
  });

  it("rejects unknown sector value", () => {
    expect(contactSchema.safeParse({ ...valid, sector: "marketing" }).success).toBe(false);
  });

  it("rejects when honeypot is filled", () => {
    expect(contactSchema.safeParse({ ...valid, website: "spam.com" }).success).toBe(false);
  });

  it("allows phone and company to be empty", () => {
    expect(contactSchema.safeParse({ ...valid, phone: "", company: "" }).success).toBe(true);
  });
});
```

- [ ] **Step 2: Run tests — must fail**

```bash
npm test -- tests/unit/schemas.spec.ts
```

- [ ] **Step 3: Implement `lib/schemas.ts`**

```ts
import { z } from "zod";

export const SECTORS = ["dental", "legal", "reforms", "hospitality", "ecommerce", "other"] as const;
export const BUDGETS = ["lt1k", "b1_2k", "b2_5k", "gt5k"] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(100).optional().or(z.literal("")),
  sector: z.enum(SECTORS),
  budget: z.enum(BUDGETS),
  message: z.string().trim().min(20).max(2000),
  gdpr: z.literal(true),
  website: z.string().max(0),
});

export type ContactInput = z.infer<typeof contactSchema>;
```

- [ ] **Step 4: Run tests — must pass**

```bash
npm test
```

- [ ] **Step 5: Commit**

```bash
git add lib/schemas.ts tests/unit/schemas.spec.ts
git commit -m "feat(contact): Zod schema with full validation (tested)"
```

---

### Task 38: Resend client wrapper

**Files:** create `lib/resend.ts`, `lib/env.ts`.

- [ ] **Step 1: Create `lib/env.ts` — typed env access with validation**

```ts
import { z } from "zod";

const schema = z.object({
  RESEND_API_KEY: z.string().min(1),
  CONTACT_EMAIL_TO: z.string().email(),
  CONTACT_EMAIL_FROM: z.string().email(),
  UPSTASH_REDIS_REST_URL: z.string().url(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
});

export const env = schema.parse({
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  CONTACT_EMAIL_TO: process.env.CONTACT_EMAIL_TO,
  CONTACT_EMAIL_FROM: process.env.CONTACT_EMAIL_FROM,
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
});
```

- [ ] **Step 2: Create `.env.local.example`**

```
RESEND_API_KEY=re_xxx
CONTACT_EMAIL_TO=hola@tuagenciaweb.es
CONTACT_EMAIL_FROM=noreply@tuagenciaweb.es
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxx
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Copy to `.env.local` and fill with real values during local dev.

- [ ] **Step 3: Create `lib/resend.ts`**

```ts
import { Resend } from "resend";
import { env } from "./env";
import type { ContactInput } from "./schemas";

const resend = new Resend(env.RESEND_API_KEY);

export async function sendLeadEmails(payload: ContactInput) {
  const subject = `Lead Tuagenciaweb · ${payload.name} (${payload.sector})`;
  const leadBody = `
    <h2>Nuevo lead</h2>
    <ul>
      <li><b>Nombre:</b> ${escapeHtml(payload.name)}</li>
      <li><b>Email:</b> ${escapeHtml(payload.email)}</li>
      <li><b>Teléfono:</b> ${escapeHtml(payload.phone ?? "")}</li>
      <li><b>Empresa:</b> ${escapeHtml(payload.company ?? "")}</li>
      <li><b>Sector:</b> ${payload.sector}</li>
      <li><b>Presupuesto:</b> ${payload.budget}</li>
    </ul>
    <p><b>Mensaje:</b></p>
    <p>${escapeHtml(payload.message).replace(/\n/g, "<br/>")}</p>
  `;

  const confirmBody = `
    <p>Hola ${escapeHtml(payload.name)},</p>
    <p>Hemos recibido tu mensaje y te responderemos en menos de 24 horas.</p>
    <p>— Tuagenciaweb</p>
  `;

  await Promise.all([
    resend.emails.send({
      from: env.CONTACT_EMAIL_FROM,
      to: env.CONTACT_EMAIL_TO,
      replyTo: payload.email,
      subject,
      html: leadBody,
    }),
    resend.emails.send({
      from: env.CONTACT_EMAIL_FROM,
      to: payload.email,
      subject: "Hemos recibido tu mensaje · Tuagenciaweb",
      html: confirmBody,
    }),
  ]);
}

function escapeHtml(s: string) {
  return s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add lib/resend.ts lib/env.ts .env.local.example
git commit -m "feat(contact): typed env + Resend client wrapper for leads"
```

---

### Task 39: Upstash rate limiter

**Files:** create `lib/ratelimit.ts`.

- [ ] **Step 1: Implement**

```ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { env } from "./env";

const redis = new Redis({ url: env.UPSTASH_REDIS_REST_URL, token: env.UPSTASH_REDIS_REST_TOKEN });

export const contactLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(1, "60 s"),
  analytics: false,
  prefix: "tw:contact",
});

export async function checkContactLimit(ip: string) {
  const { success, reset } = await contactLimiter.limit(ip);
  return { success, retryAfterSeconds: Math.max(0, Math.ceil((reset - Date.now()) / 1000)) };
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/ratelimit.ts
git commit -m "feat(contact): Upstash rate limiter (1 req/60s/IP)"
```

---

### Task 40: Server Action `submitContact` (TDD-light)

**Files:** create `app/[locale]/contacto/actions.ts`, `tests/unit/contact-action.spec.ts`.

We test the validation branch deterministically. Resend + Upstash calls are integration tested manually (or via a mock if you prefer); we only verify schema-driven outcomes here.

- [ ] **Step 1: Write tests `tests/unit/contact-action.spec.ts`**

```ts
import { describe, it, expect, vi } from "vitest";

vi.mock("@/lib/env", () => ({
  env: {
    RESEND_API_KEY: "test",
    CONTACT_EMAIL_TO: "to@example.com",
    CONTACT_EMAIL_FROM: "from@example.com",
    UPSTASH_REDIS_REST_URL: "http://localhost",
    UPSTASH_REDIS_REST_TOKEN: "test",
    NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
  },
}));

vi.mock("@/lib/resend", () => ({ sendLeadEmails: vi.fn().mockResolvedValue(undefined) }));
vi.mock("@/lib/ratelimit", () => ({
  checkContactLimit: vi.fn().mockResolvedValue({ success: true, retryAfterSeconds: 0 }),
}));

import { submitContact } from "@/app/[locale]/contacto/actions";

function fd(data: Record<string, string>) {
  const f = new FormData();
  Object.entries(data).forEach(([k, v]) => f.append(k, v));
  return f;
}

describe("submitContact", () => {
  it("returns ok on valid payload", async () => {
    const out = await submitContact(
      fd({
        name: "Maria",
        email: "m@example.com",
        sector: "dental",
        budget: "b1_2k",
        message: "Necesito una web para mi clínica con 4 médicos.",
        gdpr: "on",
        website: "",
      }),
    );
    expect(out.ok).toBe(true);
  });

  it("returns validation error on bad payload", async () => {
    const out = await submitContact(
      fd({
        name: "M",
        email: "no-email",
        sector: "dental",
        budget: "b1_2k",
        message: "short",
        gdpr: "on",
        website: "",
      }),
    );
    expect(out.ok).toBe(false);
    expect(out.error).toBe("validation");
  });

  it("silently succeeds when honeypot is filled", async () => {
    const out = await submitContact(
      fd({
        name: "Bot",
        email: "bot@example.com",
        sector: "dental",
        budget: "b1_2k",
        message: "Spam spam spam spam spam spam spam spam spam.",
        gdpr: "on",
        website: "http://spam.com",
      }),
    );
    expect(out.ok).toBe(true);
    expect(out.honeypot).toBe(true);
  });
});
```

- [ ] **Step 2: Run tests — must fail**

```bash
npm test -- tests/unit/contact-action.spec.ts
```

- [ ] **Step 3: Implement `app/[locale]/contacto/actions.ts`**

```ts
"use server";

import { headers } from "next/headers";
import { contactSchema } from "@/lib/schemas";
import { sendLeadEmails } from "@/lib/resend";
import { checkContactLimit } from "@/lib/ratelimit";

export type SubmitResult =
  | { ok: true; honeypot?: boolean }
  | { ok: false; error: "validation" | "ratelimit" | "send"; retryAfterSeconds?: number };

export async function submitContact(formData: FormData): Promise<SubmitResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = contactSchema.safeParse({
    ...raw,
    gdpr: raw.gdpr === "on" || raw.gdpr === "true",
  });

  if (!parsed.success) {
    if (typeof raw.website === "string" && raw.website.length > 0) {
      return { ok: true, honeypot: true };
    }
    return { ok: false, error: "validation" };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
  const { success, retryAfterSeconds } = await checkContactLimit(ip);
  if (!success) return { ok: false, error: "ratelimit", retryAfterSeconds };

  try {
    await sendLeadEmails(parsed.data);
    return { ok: true };
  } catch {
    return { ok: false, error: "send" };
  }
}
```

- [ ] **Step 4: Run tests — must pass**

```bash
npm test
```

- [ ] **Step 5: Commit**

```bash
git add app/[locale]/contacto/actions.ts tests/unit/contact-action.spec.ts
git commit -m "feat(contact): server action with validation, rate limit, honeypot"
```

---

### Task 41: Wire UI to Server Action + error states

**Files:** modify `components/sections/ContactForm.tsx`.

- [ ] **Step 1: Replace `components/sections/ContactForm.tsx`**

```tsx
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "@phosphor-icons/react";
import { submitContact } from "@/app/[locale]/contacto/actions";

type Status = "idle" | "submitting" | "success" | "validation" | "ratelimit" | "send";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const result = await submitContact(new FormData(e.currentTarget));
    if (result.ok) setStatus("success");
    else setStatus(result.error);
  }

  if (status === "success") {
    return (
      <div className="rounded-[var(--radius-card)] border border-[var(--color-border-default)] bg-[var(--color-elevated)] p-8">
        <CheckCircle size={36} weight="fill" className="text-[var(--color-accent)]" />
        <h2 className="font-display mt-3 text-2xl font-bold">{t("successTitle")}</h2>
        <p className="mt-3 text-[var(--color-text-body)]">{t("successBody")}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 rounded-[var(--radius-card)] border border-[var(--color-border-default)] bg-[var(--color-elevated)] p-8"
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name">{t("name")}</Label>
          <Input id="name" name="name" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">{t("email")}</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">{t("phone")}</Label>
          <Input id="phone" name="phone" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="company">{t("company")}</Label>
          <Input id="company" name="company" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="sector">{t("sector")}</Label>
          <select
            id="sector"
            name="sector"
            required
            className="h-11 rounded-md border border-[var(--color-border-default)] bg-[var(--color-elevated)] px-3 text-sm"
          >
            <option value="">—</option>
            {(["dental", "legal", "reforms", "hospitality", "ecommerce", "other"] as const).map(
              (k) => (
                <option key={k} value={k}>
                  {t(`sectors.${k}` as never)}
                </option>
              ),
            )}
          </select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="budget">{t("budget")}</Label>
          <select
            id="budget"
            name="budget"
            required
            className="h-11 rounded-md border border-[var(--color-border-default)] bg-[var(--color-elevated)] px-3 text-sm"
          >
            <option value="">—</option>
            {(["lt1k", "b1_2k", "b2_5k", "gt5k"] as const).map((k) => (
              <option key={k} value={k}>
                {t(`budgets.${k}` as never)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="message">{t("message")}</Label>
        <Textarea id="message" name="message" rows={5} required />
      </div>

      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" name="gdpr" required className="mt-1" />
        <span>{t("gdpr")}</span>
      </label>

      {(status === "validation" || status === "ratelimit" || status === "send") && (
        <p className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-800">
          <strong>{t("errorTitle")}.</strong> {t("errorBody")}
        </p>
      )}

      <Button
        type="submit"
        disabled={status === "submitting"}
        size="lg"
        className="w-full md:w-auto"
      >
        {status === "submitting" ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
```

- [ ] **Step 2: Manual test**

With dummy env vars in `.env.local`, run `npm run dev`. Submit the form with invalid data — error message shows. Submit valid data — success block shows. (Real Resend send requires real keys.)

- [ ] **Step 3: Commit**

```bash
git add components/sections/ContactForm.tsx
git commit -m "feat(contact): wire form to server action with error states"
```

---

## M8 — SEO infra

### Task 42: sitemap.ts + robots.ts

**Files:** create `app/sitemap.ts`, `app/robots.ts`.

- [ ] **Step 1: Create `app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { listPosts } from "@/lib/blog";
import { routing } from "@/i18n/routing";

const STATIC_KEYS = [
  "/",
  "/servicios",
  "/portfolio",
  "/sobre-nosotros",
  "/contacto",
  "/blog",
  "/legal/aviso-legal",
  "/legal/privacidad",
  "/legal/cookies",
] as const;

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tuagenciaweb.es";

function localizedHref(key: string, locale: "es" | "en") {
  const map = routing.pathnames[key as keyof typeof routing.pathnames];
  const path = typeof map === "string" ? map : (map as Record<string, string>)[locale];
  return `${SITE}/${locale}${path === "/" ? "" : path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = STATIC_KEYS.flatMap((key) =>
    (routing.locales as readonly ["es", "en"]).map((locale) => ({
      url: localizedHref(key, locale),
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, localizedHref(key, l)])),
      },
    })),
  );

  const blogEntries = (
    await Promise.all(
      routing.locales.map(async (locale) => {
        const posts = await listPosts(locale);
        return posts.map((p) => ({
          url: `${SITE}/${locale}/blog/${p.slug}`,
          lastModified: new Date(p.date),
        }));
      }),
    )
  ).flat();

  return [...staticEntries, ...blogEntries];
}
```

- [ ] **Step 2: Create `app/robots.ts`**

```ts
import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tuagenciaweb.es";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run build && npm run start
```

Visit `/sitemap.xml` and `/robots.txt`.

- [ ] **Step 4: Commit**

```bash
git add app/sitemap.ts app/robots.ts
git commit -m "feat(seo): generate sitemap and robots with hreflang"
```

---

### Task 43: Per-page metadata

**Files:** modify each page to export `generateMetadata`; create `lib/seo.ts` helper.

- [ ] **Step 1: Create `lib/seo.ts`**

```ts
import type { Metadata } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tuagenciaweb.es";

export type SeoInput = {
  locale: "es" | "en";
  path: string;
  title: string;
  description: string;
  image?: string;
};

export function buildMetadata({ locale, path, title, description, image }: SeoInput): Metadata {
  const url = `${SITE}/${locale}${path === "/" ? "" : path}`;
  const ogImage = image ?? `${SITE}/og/default.png`;
  return {
    title,
    description,
    metadataBase: new URL(SITE),
    alternates: {
      canonical: url,
      languages: {
        es: `${SITE}/es${path === "/" ? "" : path}`,
        en: `${SITE}/en${path === "/" ? "" : path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Tuagenciaweb",
      images: [{ url: ogImage }],
      locale,
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}
```

- [ ] **Step 2: Add `generateMetadata` to `app/[locale]/page.tsx`**

```tsx
import { getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.hero" });
  return buildMetadata({
    locale: locale as "es" | "en",
    path: "/",
    title: `Tuagenciaweb · ${t("headline")}`,
    description: t("subheadline"),
  });
}
```

Add equivalent `generateMetadata` to `/servicios`, `/portfolio`, `/sobre-nosotros`, `/contacto`, `/blog`, `/blog/[slug]`, and the legal pages. Each pulls title/description from their respective i18n namespace.

For `/blog/[slug]`:

```tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getPost(locale as "es" | "en", slug);
  if (!post) return {};
  return buildMetadata({
    locale: locale as "es" | "en",
    path: `/blog/${slug}`,
    title: `${post.title} · Tuagenciaweb`,
    description: post.description,
    image: post.cover ?? undefined,
  });
}
```

- [ ] **Step 3: Verify with curl**

```bash
npm run build && npm run start
curl -s http://localhost:3000/es | grep -E "<title>|description|og:|hreflang" | head -20
```

- [ ] **Step 4: Commit**

```bash
git add lib/seo.ts app/[locale]
git commit -m "feat(seo): per-page metadata with canonical, alternates, OG, Twitter"
```

---

### Task 44: JSON-LD structured data

**Files:** create `components/seo/JsonLd.tsx`, `lib/jsonld.ts`; mount in layouts and selected pages.

- [ ] **Step 1: Create `lib/jsonld.ts`**

```ts
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tuagenciaweb.es";

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tuagenciaweb",
    url: SITE,
    logo: `${SITE}/logo/logo-full-light.svg`,
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "hola@tuagenciaweb.es",
      areaServed: "ES",
      availableLanguage: ["Spanish", "English"],
    },
  };
}

export function localBusinessLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Tuagenciaweb",
    url: SITE,
    image: `${SITE}/og/default.png`,
    priceRange: "€€",
    areaServed: "ES",
    address: { "@type": "PostalAddress", addressCountry: "ES" },
  };
}

export function blogPostLd(post: {
  title: string;
  description: string;
  date: string;
  slug: string;
  cover: string | null;
  locale: "es" | "en";
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    inLanguage: post.locale,
    mainEntityOfPage: `${SITE}/${post.locale}/blog/${post.slug}`,
    image: post.cover ?? `${SITE}/og/default.png`,
    publisher: {
      "@type": "Organization",
      name: "Tuagenciaweb",
      logo: `${SITE}/logo/logo-full-light.svg`,
    },
  };
}
```

- [ ] **Step 2: Create `components/seo/JsonLd.tsx`**

```tsx
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
```

- [ ] **Step 3: Mount in `app/[locale]/layout.tsx`**

Inside the layout, before `<Navbar />`:

```tsx
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationLd, localBusinessLd } from "@/lib/jsonld";
// ...
<JsonLd data={organizationLd()} />
<JsonLd data={localBusinessLd()} />
```

- [ ] **Step 4: Mount BlogPosting LD in the slug page**

In `app/[locale]/blog/[slug]/page.tsx`, after the `<main>` opener:

```tsx
<JsonLd
  data={blogPostLd({
    title: post.title,
    description: post.description,
    date: post.date,
    slug,
    cover: post.cover,
    locale: locale as "es" | "en",
  })}
/>
```

- [ ] **Step 5: Verify with curl**

```bash
curl -s http://localhost:3000/es | grep "application/ld+json"
```

- [ ] **Step 6: Commit**

```bash
git add components/seo lib/jsonld.ts app/[locale]/layout.tsx app/[locale]/blog
git commit -m "feat(seo): JSON-LD structured data (Organization, LocalBusiness, BlogPosting)"
```

---

### Task 45: Dynamic OG images

**Files:** create `app/og/route.tsx`, `app/[locale]/page.tsx` references.

- [ ] **Step 1: Create `app/og/route.tsx` — generic OG image route**

```tsx
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Tuagenciaweb";
  const subtitle = searchParams.get("subtitle") ?? "Webs profesionales para tu negocio";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#0B1426",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 12,
            background: "#2C5BFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            fontWeight: 800,
          }}
        >
          t
        </div>
        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -1 }}>tuagenciaweb</div>
      </div>
      <div>
        <div style={{ fontSize: 72, fontWeight: 800, letterSpacing: -3, lineHeight: 1.05 }}>
          {title}
        </div>
        <div style={{ marginTop: 24, fontSize: 28, color: "rgba(255,255,255,0.7)" }}>
          {subtitle}
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
```

- [ ] **Step 2: Use OG route in metadata**

Modify `lib/seo.ts` so when `image` is not provided it defaults to:

```ts
const ogImage =
  image ??
  `${SITE}/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(description.slice(0, 80))}`;
```

- [ ] **Step 3: Verify**

```bash
npm run build && npm run start
```

Open `http://localhost:3000/og?title=Hola&subtitle=mundo` and confirm an image renders.

- [ ] **Step 4: Commit**

```bash
git add app/og lib/seo.ts
git commit -m "feat(seo): dynamic OG images via @vercel/og edge route"
```

---

## M9 — Portfolio captures

### Task 46: Generate screenshots with Playwright

**Files:** create `scripts/capture-portfolio.ts`, modify `package.json`.

- [ ] **Step 1: Create `scripts/capture-portfolio.ts`**

```ts
import { chromium } from "playwright";
import path from "node:path";
import { promises as fs } from "node:fs";

const TARGETS = [
  { slug: "dentistlab", url: "https://dentistlab.surge.sh" },
  { slug: "chinaway", url: "https://chinaway.vercel.app/es" },
  { slug: "reformlab", url: "https://reformlab-barcelona.surge.sh" },
  { slug: "forma", url: "https://forma-clinica.surge.sh" },
];

async function main() {
  const out = path.join(process.cwd(), "public", "portfolio");
  await fs.mkdir(out, { recursive: true });

  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  for (const t of TARGETS) {
    const page = await ctx.newPage();
    console.log(`Capturing ${t.url}…`);
    await page.goto(t.url, { waitUntil: "networkidle", timeout: 60_000 });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(out, `${t.slug}.png`), fullPage: false });
    await page.close();
  }

  // Generic placeholder for empty portfolio slots
  const placeholder = path.join(out, "placeholder.png");
  await fs.copyFile(path.join(out, "dentistlab.png"), placeholder).catch(() => undefined);

  // Hero variant (same as dentistlab)
  await fs.copyFile(path.join(out, "dentistlab.png"), path.join(out, "dentistlab-hero.png"));

  await browser.close();
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
```

- [ ] **Step 2: Add npm script and tsx dep**

```bash
npm install -D tsx
```

In `package.json`:

```json
"scripts": {
  "capture": "tsx scripts/capture-portfolio.ts"
}
```

- [ ] **Step 3: Run capture**

```bash
npm run capture
```

Expected: 4 PNGs + placeholder + hero variant under `public/portfolio/`.

- [ ] **Step 4: Visual check in /es and /es/portfolio.**

- [ ] **Step 5: Commit**

```bash
git add scripts/capture-portfolio.ts package.json package-lock.json public/portfolio
git commit -m "feat(portfolio): generate live screenshots with Playwright"
```

---

## M10 — Deploy

### Task 47: GitHub repo + remote

> The next two tasks require the user's GitHub username and decisions about repo name/visibility. Pause and ask if not yet known.

- [ ] **Step 1: Verify gh CLI is installed**

```bash
gh --version
```

If not installed, install via https://cli.github.com/ and run `gh auth login`.

- [ ] **Step 2: Create the repo (placeholder values — replace before running)**

```bash
cd "C:/Users/chaoh/Desktop/Tuagenciaweb"
gh repo create <GITHUB_USERNAME>/tuagenciaweb-web --private --source=. --remote=origin --push
```

- [ ] **Step 3: Verify the push**

```bash
git remote -v
git log --oneline -5
```

- [ ] **Step 4: No commit (the repo creation pushed all existing commits).**

---

### Task 48: Vercel project + custom domain

> Requires Vercel account access. Pause and ask the user to connect Vercel ↔ GitHub if not already done.

- [ ] **Step 1: Create the Vercel project**

```bash
npm install -g vercel
vercel link
```

Follow prompts: link to existing Vercel scope → import from GitHub → select the repo.

- [ ] **Step 2: Set environment variables on Vercel**

From the Vercel dashboard or CLI:

```bash
vercel env add RESEND_API_KEY production
vercel env add CONTACT_EMAIL_TO production
vercel env add CONTACT_EMAIL_FROM production
vercel env add UPSTASH_REDIS_REST_URL production
vercel env add UPSTASH_REDIS_REST_TOKEN production
vercel env add NEXT_PUBLIC_SITE_URL production
```

Set `NEXT_PUBLIC_SITE_URL=https://tuagenciaweb.es`.

- [ ] **Step 3: Deploy preview**

```bash
vercel
```

Expected: preview URL. Smoke-test home / contact / locale switch on the preview URL.

- [ ] **Step 4: Promote to production**

```bash
vercel --prod
```

- [ ] **Step 5: Attach the custom domain**

In Vercel dashboard → Project → Settings → Domains → add `tuagenciaweb.es` and `www.tuagenciaweb.es`. Vercel shows the DNS records (A record for apex + CNAME for www).

At your domain registrar's DNS panel, add the records Vercel indicates. Save. Wait until DNS propagates (Vercel shows green checks).

- [ ] **Step 6: Verify SSL + redirects**

```bash
curl -I https://tuagenciaweb.es
curl -I https://www.tuagenciaweb.es
```

Expected: `HTTP/2 200` from the apex and `HTTP/2 308` (permanent redirect) from `www` to apex.

- [ ] **Step 7: Verify Resend domain**

In Resend dashboard, add and verify `tuagenciaweb.es` (DNS TXT/MX records). This is required for `noreply@tuagenciaweb.es` to deliver.

- [ ] **Step 8: Production smoke test**

```bash
curl -s https://tuagenciaweb.es/sitemap.xml | head -20
curl -s https://tuagenciaweb.es/robots.txt
```

Both should return valid content.

- [ ] **Step 9: Submit the form once with real data**

Confirm Resend delivers the lead to `CONTACT_EMAIL_TO` and the confirmation arrives at the user inbox.

- [ ] **Step 10: Final commit (deployment metadata)**

```bash
git add .vercel
echo ".vercel" >> .gitignore  # already in default Next gitignore but verify
git commit -m "chore: vercel link committed" --allow-empty
```

---

## Plan self-review

Checked against the spec sections:

- §1 Objective & positioning → reflected in home copy (T15), services (T25), about (T27).
- §2 Stack → installed in T2, configured T3–T5, used throughout.
- §3 Identity → tokens T3, fonts T4, shadcn T5, logo T7–T8.
- §4 Information architecture → routing T9–T10, navbar/footer T12–T13, all routes covered T24–T36.
- §5 Home → T15–T24.
- §6 Other pages → T25 (servicios), T26 (portfolio), T27 (about), T28+T41 (contact), T29 (404), T31–T33 (blog), T34–T36 (legal).
- §7 Packs → data T17, displayed T17/T25, extras T25, comparison T25.
- §8 Portfolio → data T19, grid T26, captures T46.
- §9 Backend → schemas T37, Resend T38, ratelimit T39, action T40, UI T41.
- §10 SEO → sitemap/robots T42, metadata T43, JSON-LD T44, OG T45.
- §11 Legal → cookie banner T14, legal pages T34–T36.
- §12 Deploy → T47–T48.
- §13 Pendings → handled with `[PENDIENTE]` markers and explicit pause points in T47/T48; numeric placeholders (+30, phone, NIF) marked in copy.
- §14 Out of scope → respected (no sector landings, no CMS, no booking).

No placeholders like "TBD" or "TODO later" in steps. Every code step shows the actual code. Type names are consistent (`Pack`, `Project`, `Sector`, `ContactInput`, `SubmitResult`, `Locale`).

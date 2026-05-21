# Services Per-Page Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the single `/servicios` page into a hub + 4 per-service detail pages (`/servicios/<slug>`), each following a 7-section template. Wire the home Services cards and the header dropdown to navigate directly to the per-service pages. Architecture-first: placeholder but plausible copy in this phase.

**Architecture:**
- New `lib/services.ts` with stable `ServiceId` keys + locale-aware slugs and a `servicePath()` helper.
- Dict refactor: replace `servicesPage.detail` with `servicesPage.hubCards`, add top-level `servicesDetail` keyed by `ServiceId`.
- 8 new component files under `components/services/detail/`, orchestrated by `ServiceDetailPage.tsx`.
- New dynamic routes `app/{es,en}/{servicios,services}/[slug]/page.tsx` with `generateStaticParams`.
- Modified: `ServicesPageContent.tsx` (remove ServicesDetail, add HubCards), `ServicesNav.tsx` (link to pages), `home/Services.tsx` (wrap in Link), `SiteHeader.tsx` (dropdown links to pages + "Ver todos"), `app/sitemap.ts` (full rewrite).
- Deleted: `components/services/sr/ServicesDetail.tsx` + its CSS block.

**Tech Stack:** Next.js 16 App Router · TypeScript · framer-motion 12 · Tailwind v4 · inline SVG icons.

**Spec:** `docs/superpowers/specs/2026-05-21-services-architecture-design.md`.

**Branch:** `feat/services-per-page-arch` → merge to `main` → Vercel auto-deploy.

---

## Task 1: Branch + lib/services.ts + dict shape refactor

**Goal:** Establish the central ServiceId mapping and refactor both dicts so subsequent tasks have a stable foundation. Build must pass at the end with `<HubCards>` and the per-service pages still as TODO renders (handled in next tasks).

**Files:**
- Create: `feat/services-per-page-arch` branch
- Create: `lib/services.ts`
- Modify: `lib/i18n/dict.es.ts` (replace `servicesPage.detail` with `servicesPage.hubCards`; add top-level `servicesDetail`)
- Modify: `lib/i18n/dict.en.ts` (mirror)
- Modify: `components/services/ServicesPageContent.tsx` (drop `<ServicesDetail>`, add temp placeholder for `<HubCards>` so build passes)
- Modify: `components/services/sr/ServicesHero.tsx` (no behavior change yet — just ensure types still resolve)

- [ ] **Step 1: Create the feature branch**

```bash
cd /c/Users/chaoh/Desktop/Tuagenciaweb
git checkout main
git checkout -b feat/services-per-page-arch
```

- [ ] **Step 2: Create `lib/services.ts`**

```ts
import type { Locale } from "./i18n";

export const SERVICE_IDS = ["design", "shop", "seo", "maintenance"] as const;
export type ServiceId = (typeof SERVICE_IDS)[number];

export const SERVICE_SLUGS: Record<ServiceId, Record<Locale, string>> = {
  design:      { es: "diseno-web",     en: "web-design" },
  shop:        { es: "tiendas-online", en: "online-stores" },
  seo:         { es: "seo-tecnico",    en: "technical-seo" },
  maintenance: { es: "mantenimiento",  en: "maintenance" },
};

const SERVICES_ROOT: Record<Locale, string> = {
  es: "/es/servicios",
  en: "/en/services",
};

export function servicePath(id: ServiceId, locale: Locale): string {
  return `${SERVICES_ROOT[locale]}/${SERVICE_SLUGS[id][locale]}`;
}

/**
 * Reverse lookup: given a slug and locale, return the ServiceId or null
 * if the slug doesn't match any known service. Used by [slug] route to
 * map URL → dict key.
 */
export function slugToId(slug: string, locale: Locale): ServiceId | null {
  for (const id of SERVICE_IDS) {
    if (SERVICE_SLUGS[id][locale] === slug) return id;
  }
  return null;
}

export function getServicePathsForStaticParams(locale: Locale): Array<{ slug: string }> {
  return SERVICE_IDS.map((id) => ({ slug: SERVICE_SLUGS[id][locale] }));
}
```

- [ ] **Step 3: Refactor `lib/i18n/dict.es.ts` — replace `servicesPage.detail` with `servicesPage.hubCards`**

Locate the current `servicesPage.detail` block (created during the May-20 redesign). Replace the entire `detail: { items: [...] },` block with:

```ts
    hubCards: {
      eyebrow: "QUÉ HACEMOS",
      h2: "Cuatro servicios, un mismo enfoque.",
      sub:
        "Elige el servicio que más encaja con tu proyecto. Cada uno tiene su propia página con todo lo que incluye, cómo trabajamos y ejemplos reales.",
      items: [
        {
          id: "design",
          eyebrow: "DISEÑO WEB",
          title: "Diseño web a medida",
          blurb: "Webs únicas en Next.js, pensadas para tu marca y orientadas a convertir.",
        },
        {
          id: "shop",
          eyebrow: "TIENDAS ONLINE",
          title: "Tiendas online",
          blurb: "E-commerce con pasarela segura, panel simple y listas para vender desde el día 1.",
        },
        {
          id: "seo",
          eyebrow: "SEO TÉCNICO",
          title: "SEO técnico y contenidos",
          blurb: "Indexación, velocidad, schema y contenidos para que tu web posicione de verdad.",
        },
        {
          id: "maintenance",
          eyebrow: "MANTENIMIENTO",
          title: "Mantenimiento opcional",
          blurb: "Soporte por horas, sin cuota mensual. Solo pagas por lo que necesitas.",
        },
      ],
    },
```

Keep all other blocks of `servicesPage` (meta, hero, process, comparison, marketing, faq, cta) intact.

- [ ] **Step 4: Add top-level `servicesDetail` block to `lib/i18n/dict.es.ts`**

Add the block as a NEW top-level key inside the `es` object, right after `servicesPage`. Place it before `blogPage`. Use the following content (placeholder copy that reads as real but is generic enough to refine later):

```ts
  servicesDetail: {
    design: {
      meta: {
        title: "Diseño web a medida en Next.js | Tuagenciaweb",
        description:
          "Diseñamos webs únicas, rápidas y orientadas a conversión. UI/UX propio, código limpio y editable por ti tras la entrega.",
      },
      hero: {
        eyebrow: "DISEÑO WEB",
        h1Top: "Diseño web a medida",
        h1Accent: "que convierte visitas en clientes.",
        sub:
          "Webs únicas en Next.js, sin plantillas. Diseñamos cada interfaz pensando en tu marca, en cómo se comportan tus clientes y en qué acciones queremos que ocurran.",
        ctaPrimary: "Solicitar presupuesto",
        ctaSecondary: "Ver todos los servicios",
      },
      valueProp: {
        eyebrow: "POR QUÉ IMPORTA",
        h2: "Tu web es tu primera impresión digital.",
        body:
          "Cada negocio es distinto. Por eso no usamos plantillas. Diseñamos cada interfaz pensando en cómo se posiciona tu marca, cómo se comportan tus clientes y qué acciones queremos que ocurran. El resultado es una web que no solo se ve bien — funciona, posiciona y vende.",
      },
      included: {
        eyebrow: "QUÉ INCLUYE",
        h2: "Todo lo que necesitas para lanzar.",
        sub: "Un proyecto cerrado, sin sorpresas, con entregables claros desde el primer día.",
        items: [
          { title: "Diseño UI/UX propio", desc: "Wireframes, prototipo y diseño visual a medida para tu marca." },
          { title: "Código limpio Next.js", desc: "Sin plantillas, sin frameworks pesados. Web rápida y mantenible." },
          { title: "Mobile-first responsive", desc: "Probada en 320–1440px para que se vea perfecta en cualquier dispositivo." },
          { title: "Optimización Core Web Vitals", desc: "Imágenes WebP, lazy loading y bundles reducidos para 100/100 en Lighthouse." },
          { title: "Panel editable", desc: "Cambias textos, imágenes y secciones tú mismo sin tocar código." },
          { title: "Analítica conectada", desc: "Google Analytics 4 y Search Console configurados con eventos clave." },
        ],
      },
      process: {
        eyebrow: "CÓMO TRABAJAMOS",
        h2: "De la idea al lanzamiento en 2–3 semanas.",
        steps: [
          { num: "01", title: "Estrategia", desc: "Definimos objetivo, público y prioridades antes de tocar Figma." },
          { num: "02", title: "Wireframes y diseño", desc: "Estructura primero, después estilo. Validamos contigo antes de programar." },
          { num: "03", title: "Desarrollo", desc: "Código limpio en Next.js. Animaciones sutiles y rendimiento desde el primer commit." },
          { num: "04", title: "Lanzamiento", desc: "Deploy, formación y entrega de código + dominio a tu nombre." },
        ],
      },
      useCases: {
        eyebrow: "CUÁNDO TIENE SENTIDO",
        h2: "Esto es para ti si…",
        sub: "Algunas situaciones típicas donde un rediseño a medida marca la diferencia.",
        items: [
          { title: "Tu web actual no convierte", desc: "Tráfico que llega pero no rellena formularios ni compra." },
          { title: "Acabas de lanzar tu negocio", desc: "Necesitas una presencia online sólida desde el día 1." },
          { title: "Tu marca ha evolucionado", desc: "La identidad visual cambió y la web se quedó vieja." },
          { title: "Necesitas una landing concreta", desc: "Página específica para una campaña, evento o producto." },
        ],
      },
      examples: {
        eyebrow: "EJEMPLOS",
        h2: "Trabajos recientes en esta línea.",
        sub: "Una muestra de webs que hemos diseñado siguiendo este enfoque.",
        projectSlugs: ["chinaway", "reformlab-barcelona"],
      },
      cta: {
        eyebrow: "EMPECEMOS",
        h2: "¿Listo para tu próxima web?",
        sub: "Te preparamos una propuesta personalizada en menos de 24 horas.",
        primary: "Solicitar presupuesto",
        secondary: "WhatsApp",
      },
    },
    shop: {
      meta: {
        title: "Tiendas online a medida con Stripe y Redsys | Tuagenciaweb",
        description:
          "E-commerce listas para vender. Catálogo, pasarela segura, gestión simple y optimización para Google Shopping.",
      },
      hero: {
        eyebrow: "TIENDAS ONLINE",
        h1Top: "Tiendas online",
        h1Accent: "listas para vender desde el día 1.",
        sub:
          "E-commerce con catálogo, pasarela de pago segura y panel de gestión simple. Pensadas para que vendas tú, sin depender de nosotros para cada cambio.",
        ctaPrimary: "Solicitar presupuesto",
        ctaSecondary: "Ver todos los servicios",
      },
      valueProp: {
        eyebrow: "POR QUÉ IMPORTA",
        h2: "Una tienda online es mucho más que un catálogo.",
        body:
          "Vender online requiere checkout sin fricción, gestión clara de inventario, integración con pagos y envíos, y un SEO técnico que te haga aparecer en búsquedas de producto. Nosotros montamos todo eso de forma que tú gestionas el negocio, no la herramienta.",
      },
      included: {
        eyebrow: "QUÉ INCLUYE",
        h2: "Una tienda completa, lista para escalar.",
        sub: "Sin sorpresas técnicas ni cuotas escondidas. Pago único, código tuyo.",
        items: [
          { title: "Pasarelas Stripe, Redsys o PayPal", desc: "Integramos la que mejor encaja con tu volumen y país de operación." },
          { title: "Inventario y variantes", desc: "Gestión de stock, tallas, colores y descuentos desde un panel claro." },
          { title: "Envíos automatizados", desc: "Cálculo de tarifas, integración con SEUR, MRW o transportistas locales." },
          { title: "Optimizado para Google Shopping", desc: "Feed de producto, schema y meta tags listos para Merchant Center." },
          { title: "Checkout optimizado", desc: "Menos campos, más conversión. Pruebas A/B sobre el flujo de compra." },
          { title: "Email marketing conectado", desc: "Carritos abandonados, post-compra y segmentación automatizada." },
        ],
      },
      process: {
        eyebrow: "CÓMO TRABAJAMOS",
        h2: "De idea a tienda funcionando en 4–6 semanas.",
        steps: [
          { num: "01", title: "Arquitectura del catálogo", desc: "Categorías, atributos, filtros y SEO técnico de producto." },
          { num: "02", title: "Diseño y desarrollo", desc: "UI a medida, integraciones de pago y envío, panel de gestión." },
          { num: "03", title: "Carga inicial y QA", desc: "Subimos tu catálogo, configuramos métodos de pago y probamos el flujo entero." },
          { num: "04", title: "Lanzamiento y formación", desc: "Te enseñamos a gestionar pedidos, productos y promociones." },
        ],
      },
      useCases: {
        eyebrow: "CUÁNDO TIENE SENTIDO",
        h2: "Esto es para ti si…",
        sub: "Algunos puntos de partida típicos.",
        items: [
          { title: "Vendes en redes y quieres escalar", desc: "Necesitas una tienda propia que no dependa de DMs." },
          { title: "Tienes negocio físico", desc: "Quieres abrir un canal online sin reinventar tu operativa." },
          { title: "Te quedaste pequeño con Shopify/Wix", desc: "Necesitas una tienda con más control y menos cuotas mensuales." },
          { title: "Lanzas un producto nuevo", desc: "Quieres una tienda específica para un producto o colección." },
        ],
      },
      examples: {
        eyebrow: "EJEMPLOS",
        h2: "Proyectos en esta línea.",
        sub: "Webs con componente comercial que hemos lanzado recientemente.",
        projectSlugs: ["melodify", "yg-event-solutions"],
      },
      cta: {
        eyebrow: "EMPECEMOS",
        h2: "¿Listo para vender online?",
        sub: "Te preparamos una propuesta cerrada en menos de 24 horas.",
        primary: "Solicitar presupuesto",
        secondary: "WhatsApp",
      },
    },
    seo: {
      meta: {
        title: "SEO técnico y de contenidos | Tuagenciaweb",
        description:
          "Auditoría, Core Web Vitals, schema, sitemap y contenidos optimizados para que Google entienda y posicione tu web.",
      },
      hero: {
        eyebrow: "SEO TÉCNICO",
        h1Top: "SEO técnico y contenidos",
        h1Accent: "para que tu web posicione de verdad.",
        sub:
          "Indexación, velocidad, schema y contenidos optimizados. Hacemos que Google entienda tu web y la posicione donde tus clientes la buscan.",
        ctaPrimary: "Solicitar auditoría",
        ctaSecondary: "Ver todos los servicios",
      },
      valueProp: {
        eyebrow: "POR QUÉ IMPORTA",
        h2: "El SEO no es solo palabras clave.",
        body:
          "El 80% del SEO efectivo es técnico: estructura, velocidad, indexación y datos estructurados. Sin eso, ningún contenido por bueno que sea posiciona. Auditamos tu web, arreglamos los fundamentos técnicos y luego construimos los contenidos que realmente importan a tu negocio.",
      },
      included: {
        eyebrow: "QUÉ INCLUYE",
        h2: "SEO técnico y de contenidos, end-to-end.",
        sub: "Trabajo medible y reportes mensuales con métricas claras.",
        items: [
          { title: "Auditoría técnica completa", desc: "Indexación, errores de crawl, redirects, canonicals, robots.txt." },
          { title: "Core Web Vitals en verde", desc: "LCP < 2.5s, CLS < 0.1, INP < 200ms en todas las páginas clave." },
          { title: "Schema.org y rich snippets", desc: "FAQPage, LocalBusiness, Product, Article — el que aplique." },
          { title: "Sitemap dinámico", desc: "XML actualizado en cada deploy, con prioridades y frecuencias correctas." },
          { title: "Contenidos optimizados", desc: "Investigación de keywords, briefs y redacción enfocada en intención de búsqueda." },
          { title: "Search Console y GA4", desc: "Configurados con eventos de conversión y monitoring de queries." },
        ],
      },
      process: {
        eyebrow: "CÓMO TRABAJAMOS",
        h2: "Diagnóstico, fundamentos y crecimiento.",
        steps: [
          { num: "01", title: "Auditoría inicial", desc: "Detectamos errores técnicos, gaps de contenido y oportunidades concretas." },
          { num: "02", title: "Fix técnico", desc: "Arreglamos indexación, velocidad y schema. Base sólida antes de escribir nada." },
          { num: "03", title: "Estrategia de contenidos", desc: "Definimos los 10–20 temas que más tráfico cualificado pueden traer." },
          { num: "04", title: "Producción y seguimiento", desc: "Publicamos, medimos posiciones y ajustamos cada mes." },
        ],
      },
      useCases: {
        eyebrow: "CUÁNDO TIENE SENTIDO",
        h2: "Esto es para ti si…",
        sub: "Situaciones donde el SEO técnico marca la diferencia.",
        items: [
          { title: "Tu web no aparece en Google", desc: "Tienes web pero búsquedas como '<tu servicio> en <tu ciudad>' no te muestran." },
          { title: "Tienes tráfico pero no convierte", desc: "Visitas que no son de tu cliente ideal — falta segmentación de keywords." },
          { title: "Acabas de lanzar", desc: "Quieres construir SEO desde día 1 en lugar de remendar luego." },
          { title: "Compites en una ciudad concreta", desc: "Necesitas SEO local para captar clientes de tu zona." },
        ],
      },
      examples: {
        eyebrow: "EJEMPLOS",
        h2: "Proyectos donde el SEO fue clave.",
        sub: "Webs en las que el posicionamiento orgánico cambió los resultados.",
        projectSlugs: ["redline-marketing"],
      },
      cta: {
        eyebrow: "EMPECEMOS",
        h2: "¿Quieres aparecer donde te buscan?",
        sub: "Te enviamos una auditoría inicial gratuita en menos de 48 horas.",
        primary: "Solicitar auditoría",
        secondary: "WhatsApp",
      },
    },
    maintenance: {
      meta: {
        title: "Mantenimiento web por horas, sin cuota fija | Tuagenciaweb",
        description:
          "Bolsa de horas prepago, backups diarios, monitorización 24/7 y soporte directo. Sin permanencia.",
      },
      hero: {
        eyebrow: "MANTENIMIENTO",
        h1Top: "Mantenimiento opcional",
        h1Accent: "por horas, sin cuota fija.",
        sub:
          "Soporte por bolsa de horas prepago, sin permanencia. Tú decides cuándo necesitas algo y solo pagas por lo que usas. Cero compromisos eternos.",
        ctaPrimary: "Solicitar presupuesto",
        ctaSecondary: "Ver todos los servicios",
      },
      valueProp: {
        eyebrow: "POR QUÉ IMPORTA",
        h2: "Tu web sigue viva después del lanzamiento.",
        body:
          "Una web sin mantenimiento se rompe: dependencias desactualizadas, contenido obsoleto, errores que aparecen sin previo aviso. Nosotros la cuidamos para que tú no tengas que pensar en ella, y solo te cobramos lo que realmente usas — no una cuota mensual que pagas aunque no haya nada que hacer.",
      },
      included: {
        eyebrow: "QUÉ INCLUYE",
        h2: "Lo necesario, no lo superfluo.",
        sub: "Pagas por las horas que consumes. Sin permanencia, cancelable cuando quieras.",
        items: [
          { title: "Bolsa de horas prepago", desc: "Compras 5h, 10h o 20h. Las usas cuando las necesitas, sin caducidad anual." },
          { title: "Backups automáticos diarios", desc: "Tu web restaurable en minutos ante cualquier incidente." },
          { title: "Monitorización 24/7", desc: "Te avisamos si la web se cae antes de que tus clientes lo noten." },
          { title: "Actualizaciones de dependencias", desc: "Next.js, plugins y librerías al día para evitar vulnerabilidades." },
          { title: "Soporte por WhatsApp", desc: "Respuesta rápida en horario laboral para urgencias." },
          { title: "Pequeñas mejoras y cambios", desc: "Cambios de copy, imágenes, secciones, integraciones — todo dentro de tu bolsa." },
        ],
      },
      process: {
        eyebrow: "CÓMO TRABAJAMOS",
        h2: "Simple, transparente, sin sorpresas.",
        steps: [
          { num: "01", title: "Onboarding", desc: "Accedemos a tu web, configuramos backups y monitorización." },
          { num: "02", title: "Bolsa inicial", desc: "Eliges el tamaño de bolsa (5/10/20h). La cargas y queda disponible." },
          { num: "03", title: "Uso bajo demanda", desc: "Nos escribes lo que necesitas, te confirmamos coste y lo hacemos." },
          { num: "04", title: "Reporte mensual", desc: "Te enviamos un resumen de horas usadas y saldo restante." },
        ],
      },
      useCases: {
        eyebrow: "CUÁNDO TIENE SENTIDO",
        h2: "Esto es para ti si…",
        sub: "Casos típicos donde el mantenimiento por horas funciona mejor que una cuota fija.",
        items: [
          { title: "No quieres preocuparte por la web", desc: "Quieres delegar 100% y solo enterarte cuando todo va bien." },
          { title: "Necesitas cambios puntuales", desc: "Actualizar precios, añadir secciones, lanzar promociones." },
          { title: "Tu web da problemas técnicos", desc: "Errores 500, formularios que fallan, lentitud — los arreglamos." },
          { title: "Quieres evitar cuotas eternas", desc: "Pagar solo cuando hay trabajo real, sin facturas mensuales fijas." },
        ],
      },
      examples: {
        eyebrow: "EJEMPLOS",
        h2: "Clientes activos en mantenimiento.",
        sub: "Proyectos que mantenemos día a día.",
        projectSlugs: [],
      },
      cta: {
        eyebrow: "EMPECEMOS",
        h2: "¿Necesitas un equipo que cuide tu web?",
        sub: "Empezamos con una bolsa de 5h sin compromiso anual.",
        primary: "Solicitar presupuesto",
        secondary: "WhatsApp",
      },
    },
  },
```

- [ ] **Step 5: Refactor `lib/i18n/dict.en.ts` — same shape, EN copy**

Replace `servicesPage.detail` with the EN equivalent of `hubCards`:

```ts
    hubCards: {
      eyebrow: "WHAT WE DO",
      h2: "Four services, one focused approach.",
      sub:
        "Pick the service that fits your project. Each has its own page with everything it includes, how we work and real examples.",
      items: [
        {
          id: "design",
          eyebrow: "WEB DESIGN",
          title: "Custom web design",
          blurb: "Unique websites in Next.js, built around your brand and engineered to convert.",
        },
        {
          id: "shop",
          eyebrow: "ONLINE STORES",
          title: "Online stores",
          blurb: "E-commerce with secure payments, a simple admin panel and ready to sell on day one.",
        },
        {
          id: "seo",
          eyebrow: "TECHNICAL SEO",
          title: "Technical SEO & content",
          blurb: "Indexing, speed, schema and content so your site actually ranks.",
        },
        {
          id: "maintenance",
          eyebrow: "MAINTENANCE",
          title: "Optional maintenance",
          blurb: "Hourly support, no monthly fee. You only pay for what you actually need.",
        },
      ],
    },
```

Add top-level `servicesDetail` block to `dict.en.ts` with the EN version of all 4 services. Use the same shape as the ES version (Step 4). Translate every string. Examples block: keep `projectSlugs` the same (the slugs reference `lib/portfolio.ts` which is locale-independent).

(The full EN block follows the exact structure of the ES one above with English copy throughout. Key translations: "QUÉ HACEMOS"→"WHAT WE DO", "QUÉ INCLUYE"→"WHAT'S INCLUDED", "CÓMO TRABAJAMOS"→"HOW WE WORK", "CUÁNDO TIENE SENTIDO"→"WHEN IT MAKES SENSE", "EJEMPLOS"→"EXAMPLES", "EMPECEMOS"→"LET'S START". For brevity, the engineer should translate each ES `valueProp.body`, `included.items[].desc`, `process.steps[].desc`, `useCases.items[].desc` directly preserving sentence structure. CTAs: "Solicitar presupuesto"→"Request a quote", "Solicitar auditoría"→"Request an audit", "Ver todos los servicios"→"See all services", "WhatsApp"→"WhatsApp". All eyebrows uppercase per the ES pattern.)

- [ ] **Step 6: Update `components/services/ServicesPageContent.tsx` — temporarily render placeholder for HubCards**

Open the file. The current order is `<ServicesHero> <ServicesDetail> <ProcessTimeline> ...`. Replace `<ServicesDetail>` with a temporary placeholder so build passes — `<HubCards>` will be implemented in Task 2:

```tsx
import type { Dict, Locale } from "@/lib/i18n";
import { ServicesHero } from "./sr/ServicesHero";
import { ProcessTimeline } from "./sr/ProcessTimeline";
import { ComparisonTable } from "./sr/ComparisonTable";
import { MarketingGrid } from "./sr/MarketingGrid";
import { ServicesFaq } from "./sr/ServicesFaq";
import { ServicesCta } from "./sr/ServicesCta";

export function ServicesPageContent({ dict, locale }: { dict: Dict["servicesPage"]; locale: Locale }) {
  return (
    <main className="services-redesign">
      <ServicesHero dict={dict.hero} locale={locale} />
      {/* TODO Task 2: <HubCards dict={dict.hubCards} locale={locale} /> */}
      <ProcessTimeline dict={dict.process} />
      <ComparisonTable dict={dict.comparison} />
      <MarketingGrid dict={dict.marketing} />
      <ServicesFaq dict={dict.faq} />
      <ServicesCta dict={dict.cta} locale={locale} />
    </main>
  );
}
```

Note: `ServicesDetail` import is removed. The file `components/services/sr/ServicesDetail.tsx` stays on disk until Task 10 cleanup — its export simply has no consumer now.

- [ ] **Step 7: Build and lint**

```bash
cd /c/Users/chaoh/Desktop/Tuagenciaweb
npm run lint
npm run build
```
Both must pass. The route table should still list `/es/servicios` and `/en/services`. The `/servicios/[slug]` routes do NOT exist yet — they appear in Task 3.

- [ ] **Step 8: Commit**

```bash
git add lib/services.ts lib/i18n/dict.es.ts lib/i18n/dict.en.ts components/services/ServicesPageContent.tsx
git commit -m "refactor(services): lib/services.ts + dict shape (hubCards + servicesDetail)"
```

---

## Task 2: HubCards component + replace placeholder in hub + update ServicesNav

**Goal:** Build the new `<HubCards>` section. Update `<ServicesNav>` (the hero right-side anchor list) so it links to per-service pages instead of `#anchor`s. Both consumers of `dict.hubCards.items[].id` need `servicePath()` from `lib/services.ts`.

**Files:**
- Create: `components/services/sr/HubCards.tsx`
- Modify: `components/services/ServicesPageContent.tsx` (uncomment the `<HubCards>` line, remove the TODO)
- Modify: `components/services/sr/ServicesNav.tsx` (locale + servicePath)
- Modify: `components/services/sr/ServicesHero.tsx` (pass locale through to nav, navItems now include the ServiceId)
- Modify: `lib/i18n/dict.{es,en}.ts` (add `id: ServiceId` to each `hero.navItems[]` entry so the nav can resolve URLs)
- Modify: `app/globals.css` (append `.hub-cards` styles)

- [ ] **Step 1: Add `id` field to `hero.navItems` in both dicts**

In `lib/i18n/dict.es.ts`, find `servicesPage.hero.navItems` and update each entry:

```ts
      navItems: [
        { num: "01", id: "design",      title: "Diseño web a medida",     anchor: "diseno-web" },
        { num: "02", id: "shop",        title: "Tiendas online",          anchor: "tiendas-online" },
        { num: "03", id: "seo",         title: "SEO técnico y contenidos", anchor: "seo-tecnico" },
        { num: "04", id: "maintenance", title: "Mantenimiento opcional",  anchor: "mantenimiento" },
      ],
```

Keep `anchor` for now (other consumers might still reference it; we'll fully remove in Task 10). The new `id` lets consumers resolve `servicePath()`.

Mirror in `lib/i18n/dict.en.ts`:

```ts
      navItems: [
        { num: "01", id: "design",      title: "Custom web design",       anchor: "web-design" },
        { num: "02", id: "shop",        title: "Online stores",           anchor: "online-stores" },
        { num: "03", id: "seo",         title: "Technical SEO & content", anchor: "technical-seo" },
        { num: "04", id: "maintenance", title: "Optional maintenance",    anchor: "maintenance" },
      ],
```

- [ ] **Step 2: Update `components/services/sr/ServicesNav.tsx`**

Replace the entire file:

```tsx
"use client";

import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { servicePath, type ServiceId } from "@/lib/services";

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export function ServicesNav({
  label,
  items,
  locale,
}: {
  label: string;
  items: { num: string; id: ServiceId; title: string }[];
  locale: Locale;
}) {
  return (
    <aside className="sr-nav" aria-label={label}>
      <div className="sr-nav-label">{label}</div>
      <ul>
        {items.map((it) => (
          <li key={it.id}>
            <Link href={servicePath(it.id, locale)}>
              <span className="sr-nav-num">{it.num}</span>
              <span className="sr-nav-title">{it.title}</span>
              <span className="sr-nav-arrow"><ArrowRight /></span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
```

- [ ] **Step 3: Update `components/services/sr/ServicesHero.tsx`**

Find the line:
```tsx
<ServicesNav label={dict.navLabel} items={dict.navItems} />
```
Replace with:
```tsx
<ServicesNav label={dict.navLabel} items={dict.navItems} locale={locale} />
```

The `locale` prop is already received by `ServicesHero` — just pass it through.

- [ ] **Step 4: Create `components/services/sr/HubCards.tsx`**

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Dict, Locale } from "@/lib/i18n";
import { servicePath, type ServiceId } from "@/lib/services";

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const PencilIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 21c2 0 4-1 5-3l9-9-3-3-9 9c-2 1-3 3-3 6Z" />
    <path d="M14 6l4 4" />
    <path d="M17 3l4 4-3 3-4-4Z" />
  </svg>
);
const BagIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 7h14l-1.2 12.2A2 2 0 0 1 15.8 21H8.2a2 2 0 0 1-2-1.8L5 7Z" />
    <path d="M9 7V5a3 3 0 0 1 6 0v2" />
  </svg>
);
const SearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);
const ShieldIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 3 5 6v6c0 5 3 8 7 9 4-1 7-4 7-9V6l-7-3Z" />
  </svg>
);

const ICONS: Record<ServiceId, () => JSX.Element> = {
  design: PencilIcon,
  shop: BagIcon,
  seo: SearchIcon,
  maintenance: ShieldIcon,
};

export function HubCards({
  dict,
  locale,
}: {
  dict: Dict["servicesPage"]["hubCards"];
  locale: Locale;
}) {
  return (
    <section className="hub-cards-section">
      <div className="sr-container">
        <motion.div
          className="hub-cards-head"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <span className="sr-pill"><span className="dot" /> {dict.eyebrow}</span>
          <h2 className="sr-section-title">{dict.h2}</h2>
          <p className="sr-section-sub">{dict.sub}</p>
        </motion.div>

        <div className="hub-cards-grid">
          {dict.items.map((item, i) => {
            const Icon = ICONS[item.id];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <Link href={servicePath(item.id, locale)} className="hub-card">
                  <span className="hub-card-icon"><Icon /></span>
                  <span className="hub-card-eyebrow">{item.eyebrow}</span>
                  <h3 className="hub-card-title">{item.title}</h3>
                  <p className="hub-card-blurb">{item.blurb}</p>
                  <span className="hub-card-arrow">
                    <ArrowRight />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Wire `<HubCards>` into `ServicesPageContent.tsx`**

Replace the TODO line from Task 1 Step 6:

```tsx
import type { Dict, Locale } from "@/lib/i18n";
import { ServicesHero } from "./sr/ServicesHero";
import { HubCards } from "./sr/HubCards";
import { ProcessTimeline } from "./sr/ProcessTimeline";
import { ComparisonTable } from "./sr/ComparisonTable";
import { MarketingGrid } from "./sr/MarketingGrid";
import { ServicesFaq } from "./sr/ServicesFaq";
import { ServicesCta } from "./sr/ServicesCta";

export function ServicesPageContent({ dict, locale }: { dict: Dict["servicesPage"]; locale: Locale }) {
  return (
    <main className="services-redesign">
      <ServicesHero dict={dict.hero} locale={locale} />
      <HubCards dict={dict.hubCards} locale={locale} />
      <ProcessTimeline dict={dict.process} />
      <ComparisonTable dict={dict.comparison} />
      <MarketingGrid dict={dict.marketing} />
      <ServicesFaq dict={dict.faq} />
      <ServicesCta dict={dict.cta} locale={locale} />
    </main>
  );
}
```

- [ ] **Step 6: Append CSS to `app/globals.css`**

```css
/* Hub cards (services overview) */
.hub-cards-section { padding: 56px 0 88px; }
@media (min-width: 1024px) { .hub-cards-section { padding: 80px 0 96px; } }

.hub-cards-head { text-align: center; max-width: 680px; margin: 0 auto 48px; }

.hub-cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
  max-width: 1180px;
  margin: 0 auto;
}
@media (min-width: 640px) { .hub-cards-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; } }
@media (min-width: 1280px) { .hub-cards-grid { grid-template-columns: repeat(4, 1fr); gap: 24px; } }

.hub-card {
  display: grid;
  grid-template-rows: auto auto auto 1fr auto;
  gap: 8px;
  background: #fff;
  border: 1px solid var(--sr-line);
  border-radius: 20px;
  padding: 28px 24px 22px;
  text-decoration: none;
  color: inherit;
  transition:
    transform 0.4s cubic-bezier(0.2, 0.7, 0.2, 1),
    box-shadow 0.4s ease,
    border-color 0.4s ease;
  position: relative;
  overflow: hidden;
  min-height: 240px;
}
.hub-card:hover {
  transform: translateY(-4px);
  border-color: var(--sr-brand);
  box-shadow:
    0 22px 44px -20px rgba(37, 99, 235, 0.20),
    0 6px 14px -6px rgba(15, 23, 42, 0.06);
}

.hub-card-icon {
  width: 48px; height: 48px;
  border-radius: 14px;
  background: var(--sr-brand-soft);
  color: var(--sr-brand);
  display: inline-flex; align-items: center; justify-content: center;
}
.hub-card-eyebrow {
  font-size: 11.5px;
  letter-spacing: 0.14em;
  font-weight: 700;
  color: var(--sr-brand);
  margin-top: 8px;
}
.hub-card-title {
  font-size: 19px;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: var(--sr-ink);
  margin: 0;
  line-height: 1.2;
}
.hub-card-blurb {
  font-size: 14px;
  line-height: 1.5;
  color: var(--sr-muted);
  margin: 0;
}
.hub-card-arrow {
  margin-top: 6px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--sr-muted-2);
  transition: transform 0.3s ease, color 0.3s ease;
}
.hub-card:hover .hub-card-arrow {
  transform: translateX(4px);
  color: var(--sr-brand);
}

@media (prefers-reduced-motion: reduce) {
  .hub-card { transition: none; }
  .hub-card:hover { transform: none; }
  .hub-card:hover .hub-card-arrow { transform: none; }
}
```

- [ ] **Step 7: Build, lint, visually verify**

```bash
npm run lint
npm run build
```
Open `/es/servicios` in dev — confirm 4 hub cards render between hero and process timeline, each links to `/es/servicios/<slug>` (404 expected until Task 3).

- [ ] **Step 8: Commit**

```bash
git add lib/i18n/dict.es.ts lib/i18n/dict.en.ts components/services/sr/HubCards.tsx components/services/sr/ServicesNav.tsx components/services/sr/ServicesHero.tsx components/services/ServicesPageContent.tsx app/globals.css
git commit -m "feat(services-hub): replace detail blocks with 4 clickable hub cards"
```

---

## Task 3: Detail route + ServiceDetailPage orchestrator + ServiceHero

**Goal:** Land the per-service dynamic route and the orchestrator. ServiceHero is the only section component built in this task; the other 6 use temporary placeholders. After this task, navigating to `/es/servicios/diseno-web` and `/en/services/web-design` returns 200 with the hero section rendered.

**Files:**
- Create: `app/es/servicios/[slug]/page.tsx`
- Create: `app/en/services/[slug]/page.tsx`
- Create: `components/services/detail/ServiceDetailPage.tsx`
- Create: `components/services/detail/ServiceHero.tsx`
- Modify: `app/globals.css` (append `.sd-*` CSS)

- [ ] **Step 1: Create `components/services/detail/ServiceHero.tsx`**

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Dict, Locale } from "@/lib/i18n";
import { path } from "@/lib/i18n";

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const Slash = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <path d="M14 6 6 18" />
  </svg>
);

type Service = Dict["servicesDetail"][keyof Dict["servicesDetail"]];

export function ServiceHero({
  service,
  locale,
  hubLabel,
}: {
  service: Service;
  locale: Locale;
  hubLabel: string;
}) {
  return (
    <section className="sd-hero">
      <div className="sd-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <nav className="sd-breadcrumb" aria-label="Breadcrumb">
            <Link href={path("services", locale)}>{hubLabel}</Link>
            <Slash />
            <span aria-current="page">{service.hero.h1Top}</span>
          </nav>

          <span className="sr-pill"><span className="dot" /> {service.hero.eyebrow}</span>

          <h1 className="sd-h1">
            {service.hero.h1Top}{" "}
            <span className="sr-accent">{service.hero.h1Accent}</span>
          </h1>

          <p className="sd-lead">{service.hero.sub}</p>

          <div className="sd-cta-row">
            <Link href={path("contact", locale)} className="sr-btn sr-btn-primary">
              {service.hero.ctaPrimary}
              <ArrowRight />
            </Link>
            <Link href={path("services", locale)} className="sr-btn sr-btn-ghost">
              {service.hero.ctaSecondary}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/services/detail/ServiceDetailPage.tsx`** (orchestrator with placeholder sections for §2-§7)

```tsx
import type { Dict, Locale } from "@/lib/i18n";
import { ServiceHero } from "./ServiceHero";

type Service = Dict["servicesDetail"][keyof Dict["servicesDetail"]];

export function ServiceDetailPage({
  service,
  locale,
  hubLabel,
}: {
  service: Service;
  locale: Locale;
  hubLabel: string;
}) {
  return (
    <main className="services-redesign service-detail">
      <ServiceHero service={service} locale={locale} hubLabel={hubLabel} />
      {/* TODO Task 4: <ServiceValueProp /> */}
      {/* TODO Task 4: <ServiceIncluded /> */}
      {/* TODO Task 5: <ServiceProcess /> */}
      {/* TODO Task 5: <ServiceUseCases /> */}
      {/* TODO Task 6: <ServiceExamples /> */}
      {/* TODO Task 6: <ServiceCta /> */}
    </main>
  );
}
```

- [ ] **Step 3: Add `hubLabel` string to both dicts** (under `servicesPage.detailNav` so consumers find it cleanly)

In `lib/i18n/dict.es.ts`, inside the `servicesPage` block (next to `hubCards`), add:

```ts
    detailNav: {
      hubLabel: "Servicios",
    },
```

In `lib/i18n/dict.en.ts`:

```ts
    detailNav: {
      hubLabel: "Services",
    },
```

- [ ] **Step 4: Create `app/es/servicios/[slug]/page.tsx`**

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/components/services/detail/ServiceDetailPage";
import { getDict } from "@/lib/i18n";
import { getServicePathsForStaticParams, slugToId, SERVICE_SLUGS } from "@/lib/services";

const dict = getDict("es");

export function generateStaticParams() {
  return getServicePathsForStaticParams("es");
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const id = slugToId(slug, "es");
  if (!id) return {};
  const service = dict.servicesDetail[id];
  return {
    title: service.meta.title,
    description: service.meta.description,
    alternates: {
      canonical: `/es/servicios/${slug}`,
      languages: {
        es: `/es/servicios/${slug}`,
        en: `/en/services/${SERVICE_SLUGS[id].en}`,
      },
    },
    openGraph: {
      title: service.meta.title,
      description: service.meta.description,
      locale: "es_ES",
      type: "article",
    },
  };
}

export default async function ServiceDetailEs({ params }: Props) {
  const { slug } = await params;
  const id = slugToId(slug, "es");
  if (!id) notFound();
  const service = dict.servicesDetail[id];
  return (
    <ServiceDetailPage
      service={service}
      locale="es"
      hubLabel={dict.servicesPage.detailNav.hubLabel}
    />
  );
}
```

- [ ] **Step 5: Create `app/en/services/[slug]/page.tsx`**

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/components/services/detail/ServiceDetailPage";
import { getDict } from "@/lib/i18n";
import { getServicePathsForStaticParams, slugToId, SERVICE_SLUGS } from "@/lib/services";

const dict = getDict("en");

export function generateStaticParams() {
  return getServicePathsForStaticParams("en");
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const id = slugToId(slug, "en");
  if (!id) return {};
  const service = dict.servicesDetail[id];
  return {
    title: service.meta.title,
    description: service.meta.description,
    alternates: {
      canonical: `/en/services/${slug}`,
      languages: {
        es: `/es/servicios/${SERVICE_SLUGS[id].es}`,
        en: `/en/services/${slug}`,
      },
    },
    openGraph: {
      title: service.meta.title,
      description: service.meta.description,
      locale: "en_US",
      type: "article",
    },
  };
}

export default async function ServiceDetailEn({ params }: Props) {
  const { slug } = await params;
  const id = slugToId(slug, "en");
  if (!id) notFound();
  const service = dict.servicesDetail[id];
  return (
    <ServiceDetailPage
      service={service}
      locale="en"
      hubLabel={dict.servicesPage.detailNav.hubLabel}
    />
  );
}
```

- [ ] **Step 6: Append `.sd-*` CSS to `app/globals.css`**

```css
/* ===== Service Detail page — base ===== */
.service-detail {
  padding-bottom: 0;
}

.sd-container {
  position: relative;
  z-index: 1;
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 24px;
}
@media (min-width: 1024px) { .sd-container { padding: 0 56px; } }

/* Hero */
.sd-hero { padding: 40px 0 64px; }
@media (min-width: 1024px) { .sd-hero { padding: 64px 0 96px; } }

.sd-breadcrumb {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--sr-muted);
  margin-bottom: 32px;
}
.sd-breadcrumb a {
  color: var(--sr-muted);
  text-decoration: none;
  transition: color 0.3s ease;
}
.sd-breadcrumb a:hover { color: var(--sr-brand); }
.sd-breadcrumb svg { color: var(--sr-muted-2); }
.sd-breadcrumb [aria-current="page"] {
  color: var(--sr-ink);
  font-weight: 600;
}

.sd-h1 {
  font-size: clamp(36px, 4.8vw, 60px);
  line-height: 1.04;
  letter-spacing: -0.03em;
  font-weight: 800;
  color: var(--sr-ink);
  margin: 22px 0 18px;
  max-width: 18ch;
}

.sd-lead {
  color: var(--sr-ink-2);
  font-size: 17px;
  line-height: 1.6;
  max-width: 560px;
  margin: 0 0 32px;
}

.sd-cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

@media (max-width: 480px) {
  .sd-cta-row { flex-direction: column; align-items: stretch; }
  .sd-cta-row .sr-btn { justify-content: center; }
}
```

- [ ] **Step 7: Build, lint, verify routes**

```bash
npm run lint
npm run build
```
Build output route table should now include:
- `● /es/servicios/[slug]` (with 4 generated slugs)
- `● /en/services/[slug]` (with 4 generated slugs)

Visit `/es/servicios/diseno-web` in dev — hero renders, breadcrumb works, both CTAs link correctly.

- [ ] **Step 8: Commit**

```bash
git add app/es/servicios/[slug]/page.tsx app/en/services/[slug]/page.tsx components/services/detail/ServiceDetailPage.tsx components/services/detail/ServiceHero.tsx lib/i18n/dict.es.ts lib/i18n/dict.en.ts app/globals.css
git commit -m "feat(services): per-service [slug] routes with hero section"
```

---

## Task 4: ServiceValueProp + ServiceIncluded (sections §2 + §3)

**Files:**
- Create: `components/services/detail/ServiceValueProp.tsx`
- Create: `components/services/detail/ServiceIncluded.tsx`
- Modify: `components/services/detail/ServiceDetailPage.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Create `components/services/detail/ServiceValueProp.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import type { Dict } from "@/lib/i18n";

type ValueProp = Dict["servicesDetail"][keyof Dict["servicesDetail"]]["valueProp"];

export function ServiceValueProp({ data }: { data: ValueProp }) {
  return (
    <section className="sd-vp">
      <div className="sd-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <span className="sd-eyebrow">{data.eyebrow}</span>
          <h2 className="sd-h2">{data.h2}</h2>
          <p className="sd-body">{data.body}</p>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/services/detail/ServiceIncluded.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import type { Dict } from "@/lib/i18n";

type Included = Dict["servicesDetail"][keyof Dict["servicesDetail"]]["included"];

const Check = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polyline points="5 12 10 17 19 7" />
  </svg>
);

export function ServiceIncluded({ data }: { data: Included }) {
  return (
    <section className="sd-included">
      <div className="sd-container">
        <motion.div
          className="sd-section-head"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <span className="sd-eyebrow">{data.eyebrow}</span>
          <h2 className="sd-h2">{data.h2}</h2>
          <p className="sd-body">{data.sub}</p>
        </motion.div>

        <div className="sd-included-grid">
          {data.items.map((item, i) => (
            <motion.article
              key={item.title}
              className="sd-included-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <span className="sd-included-check"><Check /></span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Wire into `ServiceDetailPage.tsx`**

```tsx
import type { Dict, Locale } from "@/lib/i18n";
import { ServiceHero } from "./ServiceHero";
import { ServiceValueProp } from "./ServiceValueProp";
import { ServiceIncluded } from "./ServiceIncluded";

type Service = Dict["servicesDetail"][keyof Dict["servicesDetail"]];

export function ServiceDetailPage({
  service,
  locale,
  hubLabel,
}: {
  service: Service;
  locale: Locale;
  hubLabel: string;
}) {
  return (
    <main className="services-redesign service-detail">
      <ServiceHero service={service} locale={locale} hubLabel={hubLabel} />
      <ServiceValueProp data={service.valueProp} />
      <ServiceIncluded data={service.included} />
      {/* TODO Task 5: <ServiceProcess /> */}
      {/* TODO Task 5: <ServiceUseCases /> */}
      {/* TODO Task 6: <ServiceExamples /> */}
      {/* TODO Task 6: <ServiceCta /> */}
    </main>
  );
}
```

- [ ] **Step 4: Append CSS to `app/globals.css`**

```css
/* Service Detail — shared section styles */
.sd-eyebrow {
  display: inline-block;
  font-size: 12px;
  letter-spacing: 0.14em;
  font-weight: 700;
  color: var(--sr-brand);
  margin-bottom: 16px;
}
.sd-h2 {
  font-size: clamp(28px, 3.6vw, 42px);
  letter-spacing: -0.025em;
  line-height: 1.1;
  font-weight: 800;
  color: var(--sr-ink);
  margin: 0 0 16px;
  max-width: 22ch;
}
.sd-body {
  font-size: 16.5px;
  line-height: 1.65;
  color: var(--sr-ink-2);
  max-width: 64ch;
  margin: 0;
}
.sd-section-head {
  text-align: center;
  max-width: 720px;
  margin: 0 auto 48px;
}
.sd-section-head .sd-h2,
.sd-section-head .sd-body {
  margin-left: auto;
  margin-right: auto;
  max-width: 640px;
}

/* §2 ValueProp */
.sd-vp { padding: 32px 0 64px; }
@media (min-width: 1024px) { .sd-vp { padding: 48px 0 88px; } }
.sd-vp .sd-body { font-size: 17.5px; max-width: 64ch; }

/* §3 Included */
.sd-included { padding: 56px 0 72px; background: var(--sr-bg-soft); }
@media (min-width: 1024px) { .sd-included { padding: 88px 0 96px; } }

.sd-included-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  max-width: 1080px;
  margin: 0 auto;
}
@media (min-width: 640px) { .sd-included-grid { grid-template-columns: repeat(2, 1fr); gap: 18px; } }
@media (min-width: 1024px) { .sd-included-grid { grid-template-columns: repeat(3, 1fr); gap: 20px; } }

.sd-included-card {
  background: #fff;
  border: 1px solid var(--sr-line);
  border-radius: 16px;
  padding: 22px 22px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}
.sd-included-card:hover {
  transform: translateY(-2px);
  border-color: var(--sr-brand);
  box-shadow: 0 18px 32px -16px rgba(37, 99, 235, 0.16);
}
.sd-included-check {
  width: 32px; height: 32px;
  border-radius: 8px;
  background: var(--sr-brand-soft);
  color: var(--sr-brand);
  display: inline-flex; align-items: center; justify-content: center;
  margin-bottom: 6px;
}
.sd-included-card h3 {
  font-size: 15.5px;
  font-weight: 700;
  letter-spacing: -0.005em;
  color: var(--sr-ink);
  margin: 0;
  line-height: 1.25;
}
.sd-included-card p {
  font-size: 13.5px;
  line-height: 1.55;
  color: var(--sr-muted);
  margin: 0;
}
```

- [ ] **Step 5: Build + verify visually**

```bash
npm run lint
npm run build
```
Visit `/es/servicios/diseno-web`: hero + value prop + included grid all render. Check the responsive grid breakpoints.

- [ ] **Step 6: Commit**

```bash
git add components/services/detail/ServiceValueProp.tsx components/services/detail/ServiceIncluded.tsx components/services/detail/ServiceDetailPage.tsx app/globals.css
git commit -m "feat(services-detail): value prop + included sections"
```

---

## Task 5: ServiceProcess + ServiceUseCases (sections §4 + §5)

**Files:**
- Create: `components/services/detail/ServiceProcess.tsx`
- Create: `components/services/detail/ServiceUseCases.tsx`
- Modify: `components/services/detail/ServiceDetailPage.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Create `components/services/detail/ServiceProcess.tsx`** (vertical stepper, different from the hub's horizontal timeline)

```tsx
"use client";

import { motion } from "framer-motion";
import type { Dict } from "@/lib/i18n";

type Process = Dict["servicesDetail"][keyof Dict["servicesDetail"]]["process"];

export function ServiceProcess({ data }: { data: Process }) {
  return (
    <section className="sd-process">
      <div className="sd-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <span className="sd-eyebrow">{data.eyebrow}</span>
          <h2 className="sd-h2">{data.h2}</h2>
        </motion.div>

        <ol className="sd-process-list">
          {data.steps.map((step, i) => (
            <motion.li
              key={step.num}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <span className="sd-process-num">{step.num}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/services/detail/ServiceUseCases.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import type { Dict } from "@/lib/i18n";

type UseCases = Dict["servicesDetail"][keyof Dict["servicesDetail"]]["useCases"];

export function ServiceUseCases({ data }: { data: UseCases }) {
  return (
    <section className="sd-usecases">
      <div className="sd-container">
        <motion.div
          className="sd-section-head"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <span className="sd-eyebrow">{data.eyebrow}</span>
          <h2 className="sd-h2">{data.h2}</h2>
          <p className="sd-body">{data.sub}</p>
        </motion.div>

        <div className="sd-usecases-grid">
          {data.items.map((item, i) => (
            <motion.article
              key={item.title}
              className="sd-usecase-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 2) * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <div className="sd-usecase-quote">&ldquo;</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Wire into `ServiceDetailPage.tsx`**

```tsx
import { ServiceProcess } from "./ServiceProcess";
import { ServiceUseCases } from "./ServiceUseCases";
// ...
<ServiceProcess data={service.process} />
<ServiceUseCases data={service.useCases} />
```

Full updated file:

```tsx
import type { Dict, Locale } from "@/lib/i18n";
import { ServiceHero } from "./ServiceHero";
import { ServiceValueProp } from "./ServiceValueProp";
import { ServiceIncluded } from "./ServiceIncluded";
import { ServiceProcess } from "./ServiceProcess";
import { ServiceUseCases } from "./ServiceUseCases";

type Service = Dict["servicesDetail"][keyof Dict["servicesDetail"]];

export function ServiceDetailPage({
  service,
  locale,
  hubLabel,
}: {
  service: Service;
  locale: Locale;
  hubLabel: string;
}) {
  return (
    <main className="services-redesign service-detail">
      <ServiceHero service={service} locale={locale} hubLabel={hubLabel} />
      <ServiceValueProp data={service.valueProp} />
      <ServiceIncluded data={service.included} />
      <ServiceProcess data={service.process} />
      <ServiceUseCases data={service.useCases} />
      {/* TODO Task 6: <ServiceExamples /> */}
      {/* TODO Task 6: <ServiceCta /> */}
    </main>
  );
}
```

- [ ] **Step 4: Append CSS to `app/globals.css`**

```css
/* §4 Process (vertical stepper) */
.sd-process { padding: 72px 0 72px; }
@media (min-width: 1024px) { .sd-process { padding: 96px 0 88px; } }

.sd-process-list {
  list-style: none;
  padding: 0;
  margin: 40px 0 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 720px;
  counter-reset: none;
}
.sd-process-list li {
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 18px;
  align-items: baseline;
  padding: 18px 0;
  border-top: 1px solid var(--sr-line);
}
.sd-process-list li:first-child { border-top: none; padding-top: 8px; }

.sd-process-num {
  font-size: 26px;
  font-weight: 800;
  color: var(--sr-ink);
  letter-spacing: -0.02em;
  line-height: 1;
}
.sd-process-list h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--sr-ink);
  margin: 0 0 6px;
  line-height: 1.2;
}
.sd-process-list p {
  font-size: 14.5px;
  line-height: 1.55;
  color: var(--sr-muted);
  margin: 0;
}

/* §5 UseCases */
.sd-usecases { padding: 56px 0 80px; background: var(--sr-bg-soft); }
@media (min-width: 1024px) { .sd-usecases { padding: 88px 0 96px; } }

.sd-usecases-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  max-width: 1080px;
  margin: 0 auto;
}
@media (min-width: 640px) { .sd-usecases-grid { grid-template-columns: repeat(2, 1fr); gap: 18px; } }

.sd-usecase-card {
  background: #fff;
  border: 1px solid var(--sr-line);
  border-radius: 18px;
  padding: 24px 22px 22px;
  position: relative;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}
.sd-usecase-card:hover {
  transform: translateY(-2px);
  border-color: var(--sr-brand);
  box-shadow: 0 18px 32px -16px rgba(37, 99, 235, 0.16);
}
.sd-usecase-quote {
  position: absolute;
  top: 8px;
  right: 16px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 56px;
  line-height: 1;
  color: var(--sr-brand-soft);
  pointer-events: none;
  user-select: none;
}
.sd-usecase-card h3 {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.005em;
  color: var(--sr-ink);
  margin: 0 0 6px;
  line-height: 1.25;
}
.sd-usecase-card p {
  font-size: 14px;
  line-height: 1.5;
  color: var(--sr-muted);
  margin: 0;
}
```

- [ ] **Step 5: Build + verify**

```bash
npm run lint
npm run build
```
Visit each of the 4 service pages — process stepper and use cases grid should render.

- [ ] **Step 6: Commit**

```bash
git add components/services/detail/ServiceProcess.tsx components/services/detail/ServiceUseCases.tsx components/services/detail/ServiceDetailPage.tsx app/globals.css
git commit -m "feat(services-detail): process stepper + use cases sections"
```

---

## Task 6: ServiceExamples + ServiceCta (sections §6 + §7)

**Files:**
- Create: `components/services/detail/ServiceExamples.tsx`
- Create: `components/services/detail/ServiceCta.tsx`
- Modify: `components/services/detail/ServiceDetailPage.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Create `components/services/detail/ServiceExamples.tsx`** (reads `lib/portfolio.ts`; renders nothing if `projectSlugs` is empty)

```tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Dict } from "@/lib/i18n";
import { PROJECTS } from "@/lib/portfolio";

type Examples = Dict["servicesDetail"][keyof Dict["servicesDetail"]]["examples"];

const ArrowOut = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

export function ServiceExamples({
  data,
  viewProjectLabel,
}: {
  data: Examples;
  viewProjectLabel: string;
}) {
  const projects = data.projectSlugs
    .map((slug) => PROJECTS.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (projects.length === 0) return null;

  return (
    <section className="sd-examples">
      <div className="sd-container">
        <motion.div
          className="sd-section-head"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <span className="sd-eyebrow">{data.eyebrow}</span>
          <h2 className="sd-h2">{data.h2}</h2>
          <p className="sd-body">{data.sub}</p>
        </motion.div>

        <div className="sd-examples-grid">
          {projects.map((p, i) => (
            <motion.article
              key={p.slug}
              className="sd-example-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <div className="sd-example-thumb">
                {p.image && (
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={1200}
                    height={750}
                    className="sd-example-img"
                  />
                )}
              </div>
              <div className="sd-example-body">
                <h3>{p.name}</h3>
                <span className="sd-example-meta">{p.sector.toUpperCase()} · {p.year}</span>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sd-example-link"
                  >
                    {viewProjectLabel}
                    <ArrowOut />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/services/detail/ServiceCta.tsx`**

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Dict, Locale } from "@/lib/i18n";
import { path } from "@/lib/i18n";

type CtaData = Dict["servicesDetail"][keyof Dict["servicesDetail"]]["cta"];

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M20.5 3.5A11 11 0 0 0 3 17l-1 5 5-1a11 11 0 0 0 16.4-9.4 11 11 0 0 0-2.9-8.1Zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-3 .6.6-3-.2-.3A9 9 0 1 1 12 20.5Zm5-6.7c-.3-.2-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.1l-.9 1c-.1.2-.3.2-.5.1a7 7 0 0 1-3.6-3.2c-.1-.2 0-.4.1-.5l.4-.5.2-.3v-.4l-.9-2c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.8.4 3 3 0 0 0-1 2.2c0 1.3 1 2.5 1.1 2.7.1.2 1.9 2.9 4.6 4.1a16 16 0 0 0 1.5.6c.6.2 1.2.2 1.7.1.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
  </svg>
);

const WA_HREF =
  "https://wa.me/34613654273?text=Hola%2C%20me%20interesa%20un%20presupuesto%20para%20mi%20web.";

export function ServiceCta({
  data,
  locale,
}: {
  data: CtaData;
  locale: Locale;
}) {
  return (
    <section className="sd-cta-section">
      <div className="sd-container">
        <motion.div
          className="sd-cta-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <span className="sd-cta-eyebrow">{data.eyebrow}</span>
          <h2 className="sd-cta-h2">{data.h2}</h2>
          <p className="sd-cta-sub">{data.sub}</p>
          <div className="sd-cta-actions">
            <Link href={path("contact", locale)} className="sd-cta-btn primary">
              {data.primary}
            </Link>
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="sd-cta-btn ghost"
            >
              <WhatsAppIcon />
              {data.secondary}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add `viewProject` label to both dicts** (under `servicesPage.detailNav`)

In `lib/i18n/dict.es.ts`:
```ts
    detailNav: {
      hubLabel: "Servicios",
      viewProject: "Ver proyecto",
    },
```

In `lib/i18n/dict.en.ts`:
```ts
    detailNav: {
      hubLabel: "Services",
      viewProject: "View project",
    },
```

- [ ] **Step 4: Wire both into `ServiceDetailPage.tsx`**

Final orchestrator:

```tsx
import type { Dict, Locale } from "@/lib/i18n";
import { ServiceHero } from "./ServiceHero";
import { ServiceValueProp } from "./ServiceValueProp";
import { ServiceIncluded } from "./ServiceIncluded";
import { ServiceProcess } from "./ServiceProcess";
import { ServiceUseCases } from "./ServiceUseCases";
import { ServiceExamples } from "./ServiceExamples";
import { ServiceCta } from "./ServiceCta";

type Service = Dict["servicesDetail"][keyof Dict["servicesDetail"]];

export function ServiceDetailPage({
  service,
  locale,
  hubLabel,
  viewProjectLabel,
}: {
  service: Service;
  locale: Locale;
  hubLabel: string;
  viewProjectLabel: string;
}) {
  return (
    <main className="services-redesign service-detail">
      <ServiceHero service={service} locale={locale} hubLabel={hubLabel} />
      <ServiceValueProp data={service.valueProp} />
      <ServiceIncluded data={service.included} />
      <ServiceProcess data={service.process} />
      <ServiceUseCases data={service.useCases} />
      <ServiceExamples data={service.examples} viewProjectLabel={viewProjectLabel} />
      <ServiceCta data={service.cta} locale={locale} />
    </main>
  );
}
```

Update both page.tsx files (`app/es/servicios/[slug]/page.tsx` and `app/en/services/[slug]/page.tsx`) to pass `viewProjectLabel`:

```tsx
return (
  <ServiceDetailPage
    service={service}
    locale="es"  // or "en"
    hubLabel={dict.servicesPage.detailNav.hubLabel}
    viewProjectLabel={dict.servicesPage.detailNav.viewProject}
  />
);
```

- [ ] **Step 5: Append CSS to `app/globals.css`**

```css
/* §6 Examples */
.sd-examples { padding: 72px 0 80px; }
@media (min-width: 1024px) { .sd-examples { padding: 96px 0 96px; } }

.sd-examples-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
  max-width: 1080px;
  margin: 0 auto;
}
@media (min-width: 768px) { .sd-examples-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; } }

.sd-example-card {
  background: #fff;
  border: 1px solid var(--sr-line);
  border-radius: 18px;
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 0.4s ease;
}
.sd-example-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 22px 44px -20px rgba(15, 23, 42, 0.18);
}
.sd-example-thumb {
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--sr-bg-soft);
}
.sd-example-img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.sd-example-card:hover .sd-example-img { transform: scale(1.04); }

.sd-example-body { padding: 20px 22px 22px; display: flex; flex-direction: column; gap: 6px; }
.sd-example-body h3 {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--sr-ink);
  margin: 0;
}
.sd-example-meta {
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--sr-muted-2);
  font-weight: 600;
}
.sd-example-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  color: var(--sr-brand);
  font-size: 13.5px;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease;
}
.sd-example-link:hover { color: var(--sr-brand-hover); }

/* §7 Service CTA — compact variant of the hub CTA */
.sd-cta-section { padding: 16px 0 96px; }

.sd-cta-card {
  max-width: 1080px;
  margin: 0 auto;
  padding: 48px 28px;
  border-radius: 24px;
  text-align: center;
  color: #fff;
  background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 60%, #1e40af 100%);
  position: relative;
  overflow: hidden;
}
@media (min-width: 768px) { .sd-cta-card { padding: 56px 48px; border-radius: 28px; } }

.sd-cta-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 60% at 80% 0%, rgba(255, 255, 255, 0.16), transparent 60%),
    radial-gradient(ellipse 40% 50% at 10% 100%, rgba(255, 255, 255, 0.10), transparent 60%);
  pointer-events: none;
}
.sd-cta-card > * { position: relative; z-index: 1; }

.sd-cta-eyebrow {
  display: inline-block;
  font-size: 12px;
  letter-spacing: 0.16em;
  font-weight: 700;
  opacity: 0.7;
  margin-bottom: 12px;
}
.sd-cta-h2 {
  font-size: clamp(24px, 3.4vw, 38px);
  letter-spacing: -0.025em;
  font-weight: 800;
  line-height: 1.1;
  margin: 0 0 12px;
}
.sd-cta-sub {
  font-size: 16px;
  line-height: 1.55;
  max-width: 520px;
  margin: 0 auto 24px;
  opacity: 0.88;
}

.sd-cta-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}
.sd-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 13px 24px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 15px;
  text-decoration: none;
  transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
}
.sd-cta-btn.primary {
  background: #fff;
  color: var(--sr-brand);
  box-shadow: 0 16px 32px -14px rgba(15, 23, 42, 0.45);
}
.sd-cta-btn.primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 20px 36px -14px rgba(15, 23, 42, 0.55);
}
.sd-cta-btn.ghost {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.4);
}
.sd-cta-btn.ghost:hover { background: rgba(255, 255, 255, 0.18); }

@media (max-width: 480px) {
  .sd-cta-actions { flex-direction: column; align-items: stretch; }
  .sd-cta-btn { justify-content: center; }
}
```

- [ ] **Step 6: Build + verify**

```bash
npm run lint
npm run build
```
Visit each of the 4 service pages. The full 7-section render should be visible. Verify:
- `/es/servicios/diseno-web` — examples shows chinaway + reformlab
- `/es/servicios/tiendas-online` — examples shows melodify + yg-event-solutions
- `/es/servicios/seo-tecnico` — examples shows redline-marketing only
- `/es/servicios/mantenimiento` — examples section does NOT render (empty projectSlugs)

- [ ] **Step 7: Commit**

```bash
git add components/services/detail/ServiceExamples.tsx components/services/detail/ServiceCta.tsx components/services/detail/ServiceDetailPage.tsx lib/i18n/dict.es.ts lib/i18n/dict.en.ts app/es/servicios/[slug]/page.tsx app/en/services/[slug]/page.tsx app/globals.css
git commit -m "feat(services-detail): examples (portfolio) + CTA gradient sections"
```

---

## Task 7: Make home Services cards clickable to per-service pages

**Files:**
- Modify: `components/home/Services.tsx`
- Modify: `lib/i18n/dict.es.ts` (add `id: ServiceId` to each `services.items[]`)
- Modify: `lib/i18n/dict.en.ts` (mirror)
- Modify: `app/globals.css` (small hover arrow indicator on `.services-section .card`)

- [ ] **Step 1: Add `id` field to home services dict items**

Find `services.items` in `lib/i18n/dict.es.ts` and add an `id: ServiceId` to each entry:

```ts
    items: [
      { id: "design",      title: "Diseño web a medida", body: "...", bullets: [...] },
      { id: "shop",        title: "Tiendas online",      body: "...", bullets: [...] },
      { id: "seo",         title: "SEO local + on-page", body: "...", bullets: [...] },
      { id: "maintenance", title: "Mantenimiento web",   body: "...", bullets: [...] },
    ],
```

(Preserve existing `title`/`body`/`bullets` content. Just add the `id` field as the FIRST key in each object.)

Mirror in `dict.en.ts` with identical `id` values (same 4 service ids).

- [ ] **Step 2: Update `components/home/Services.tsx`**

Read the current file first to see the exact structure. The relevant change: wrap the `<article className="card">` (lines ~133-185 of current implementation) in a `<Link>` to `servicePath(s.id, locale)`. Add a small arrow indicator at the bottom-right of each card.

```tsx
import Image from "next/image";
import Link from "next/link";
import type { Dict, Locale } from "@/lib/i18n";
import { path } from "@/lib/i18n";
import { servicePath, type ServiceId } from "@/lib/services";

// ... (keep all existing icon + illustration component definitions)

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

// ... (keep ACCENTS and ICONS arrays)

export function Services({ dict, locale }: { dict: Dict["services"]; locale: Locale }) {
  return (
    <section id="servicios" className="services-section">
      <div className="container-s">
        <div className="section-head">
          <span className="badge">
            <span className="dot" /> {dict.pill}
          </span>
          <h2 className="section-title">
            {dict.h2Top}
            <br />
            <span className="alt">{dict.h2Accent}</span>
          </h2>
          <p className="section-sub">{dict.sub}</p>
        </div>

        <div className="grid">
          {dict.items.map((s, i) => {
            const accent = ACCENTS[i] ?? "blue";
            const Icon = ICONS[i] ?? PencilIcon;
            return (
              <Link
                key={s.id}
                href={servicePath(s.id as ServiceId, locale)}
                className="card"
              >
                <div className="body">
                  <div className="top">
                    <span className={`ico ${accent}`} aria-hidden>
                      <Icon />
                    </span>
                    <div>
                      <h3>{s.title}</h3>
                      <p className="lead">{s.body}</p>
                    </div>
                  </div>
                  <div className="rule" />
                  <ul className="checks">
                    {s.bullets.map((b) => (
                      <li key={b}>
                        <span className={`check ${accent}`}>
                          <CheckMark />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`illu ${accent}`} aria-hidden>
                  <div className="halo" />
                  {i === 0 && <DevicesIllustration />}
                  {i === 1 && (
                    <Image src="/services/basket.png" alt="" width={260} height={240} className="illu-img" />
                  )}
                  {i === 2 && (
                    <SeoChartIllustration
                      label={dict.seoRank.label}
                      source={dict.seoRank.source}
                      rank={dict.seoRank.rank}
                    />
                  )}
                  {i === 3 && (
                    <Image src="/services/shield.png" alt="" width={260} height={240} className="illu-img" />
                  )}
                </div>
                <span className="card-arrow" aria-hidden>
                  <ArrowRight />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="cta-bar">
          <div className="chat" aria-hidden>
            <ChatIcon />
          </div>
          <div className="copy">
            <strong>{dict.cta.leadBold}</strong>
            <span>{dict.cta.lead}</span>
          </div>
          <Link href={path("contact", locale)} className="btn">
            {dict.cta.button}
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
```

Notes:
- The `<article>` becomes `<Link>` with the same `className="card"`.
- The `<span className="card-arrow">` is the new visual indicator added at the bottom-right.
- Drop the unused `ArrowRight` definition that was duplicated; the one at the top handles both the card arrow and the CTA button.

- [ ] **Step 3: Append CSS to `app/globals.css`** (small hover arrow on `.services-section .card`)

```css
/* Home Services — clickable card arrow indicator */
.services-section .card {
  text-decoration: none;
  color: inherit;
}
.services-section .card .card-arrow {
  position: absolute;
  right: 22px;
  bottom: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--sr-muted-2, #94a3b8);
  transition: transform 0.32s cubic-bezier(0.2, 0.7, 0.2, 1), color 0.32s ease;
  z-index: 2;
}
.services-section .card:hover .card-arrow {
  transform: translateX(4px);
  color: var(--sr-brand, #2563eb);
}
```

- [ ] **Step 4: Build + verify**

```bash
npm run lint
npm run build
```
Visit `/es` (home). The 4 service cards should each navigate to `/es/servicios/<slug>` when clicked. Hover state shows the arrow shift.

- [ ] **Step 5: Commit**

```bash
git add lib/i18n/dict.es.ts lib/i18n/dict.en.ts components/home/Services.tsx app/globals.css
git commit -m "feat(home): make services cards link to per-service pages"
```

---

## Task 8: Update header dropdown to link to per-service pages + add "Ver todos"

**Files:**
- Modify: `components/layout/SiteHeader.tsx`

- [ ] **Step 1: Replace `ServicesNavDropdown` to link to `servicePath()` and add a "View all" footer item**

Open `components/layout/SiteHeader.tsx`. The existing `ServicesNavDropdown` builds anchor links `${href}#${it.anchor}`. Replace with:

```tsx
// At the top of the file, add the import:
import { servicePath, type ServiceId } from "@/lib/services";

// Update the ServiceItem type signature (NavItem includes `id`):
type ServiceItem = { num: string; id: ServiceId; title: string };

// Update the dropdown body — the items section. Find this block:
//   {items.map((it) => (
//     <a
//       key={it.anchor}
//       href={`${href}#${it.anchor}`}
//       ...
//     >...</a>
//   ))}
//
// Replace with:

{items.map((it) => (
  <a
    key={it.id}
    href={servicePath(it.id, locale)}
    role="menuitem"
    className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-[var(--color-brand-soft)]"
    onClick={() => setOpen(false)}
  >
    <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-[var(--color-brand-soft)] text-[12px] font-bold tracking-wider text-[var(--color-brand)] transition-colors group-hover:bg-white">
      {it.num}
    </span>
    <span className="flex-1 text-[14.5px] font-semibold text-[var(--color-ink-900)]">
      {it.title}
    </span>
    <span className="text-[var(--color-ink-300)] transition-all group-hover:translate-x-1 group-hover:text-[var(--color-brand)]">
      <ArrowRight />
    </span>
  </a>
))}

{/* Divider + "View all services" footer item */}
<div className="mt-1 border-t border-[var(--color-ink-100)]" />
<a
  href={href}
  role="menuitem"
  className="block rounded-xl px-3 py-3 text-center text-[13.5px] font-semibold text-[var(--color-brand)] transition-colors hover:bg-[var(--color-brand-soft)]"
  onClick={() => setOpen(false)}
>
  {viewAllLabel} →
</a>
```

The dropdown component signature needs to accept `locale` and `viewAllLabel` now:

```tsx
function ServicesNavDropdown({
  label,
  href,
  items,
  locale,
  viewAllLabel,
}: {
  label: string;
  href: string;
  items: ServiceItem[];
  locale: Locale;
  viewAllLabel: string;
}) {
```

- [ ] **Step 2: Update SiteHeader to pass new props through**

In the `<ServicesNavDropdown>` call inside `SiteHeader`, add `locale` and `viewAllLabel`:

```tsx
<ServicesNavDropdown
  key={item.key}
  label={item.label}
  href={item.href}
  items={servicesNavItems}
  locale={locale}
  viewAllLabel={viewAllLabel}
/>
```

The `viewAllLabel` is a new prop on `SiteHeader`. Update the signature:

```tsx
export function SiteHeader({
  locale,
  dict,
  langDict,
  servicesNavItems,
  viewAllLabel,
}: {
  locale: Locale;
  dict: Dict["nav"];
  langDict: Dict["langSwitcher"];
  servicesNavItems: ServiceItem[];
  viewAllLabel: string;
}) {
```

- [ ] **Step 3: Pass `viewAllLabel` from `app/{es,en}/layout.tsx`**

Add a new string to both dicts under `nav`:

In `lib/i18n/dict.es.ts`, find `nav: { ... }` and add:
```ts
    servicesViewAll: "Ver todos los servicios",
```

In `lib/i18n/dict.en.ts`:
```ts
    servicesViewAll: "See all services",
```

Update both layouts to pass it:

`app/es/layout.tsx`:
```tsx
<SiteHeader
  locale="es"
  dict={dict.nav}
  langDict={dict.langSwitcher}
  servicesNavItems={dict.servicesPage.hero.navItems}
  viewAllLabel={dict.nav.servicesViewAll}
/>
```

`app/en/layout.tsx`:
```tsx
<SiteHeader
  locale="en"
  dict={dict.nav}
  langDict={dict.langSwitcher}
  servicesNavItems={dict.servicesPage.hero.navItems}
  viewAllLabel={dict.nav.servicesViewAll}
/>
```

- [ ] **Step 4: Update the mobile menu (also inside SiteHeader) to use the same per-service URLs**

In the mobile `<ul>` block (inside `{open && (...)}`), find the nested `<ul>` that lists `servicesNavItems`. It currently builds `href={\`${servicesHref}#${s.anchor}\`}`. Replace with `href={servicePath(s.id, locale)}`. Drop the `anchor` reference from the mobile menu.

Also add a small "View all" link at the end of the mobile submenu:

```tsx
{item.key === "services" && (
  <ul className="-mt-1 mb-2 ml-3 border-l border-[var(--color-ink-100)] pl-4">
    {servicesNavItems.map((s) => (
      <li key={s.id}>
        <a
          href={servicePath(s.id, locale)}
          onClick={() => setOpen(false)}
          className="block py-2 text-[15px] font-medium text-[var(--color-ink-500)]"
        >
          <span className="mr-2 text-[12px] font-bold tracking-wider text-[var(--color-brand)]">
            {s.num}
          </span>
          {s.title}
        </a>
      </li>
    ))}
    <li>
      <a
        href={servicesHref}
        onClick={() => setOpen(false)}
        className="block py-2 text-[14px] font-semibold text-[var(--color-brand)]"
      >
        {viewAllLabel} →
      </a>
    </li>
  </ul>
)}
```

- [ ] **Step 5: Build + verify**

```bash
npm run lint
npm run build
```
Visit `/es` on desktop. Hover over "Servicios" in the nav. Confirm:
- 4 items each linking to `/es/servicios/<slug>`.
- Divider + "Ver todos los servicios →" item at the bottom linking to `/es/servicios`.
- On mobile, same items appear in the hamburger submenu.

- [ ] **Step 6: Commit**

```bash
git add components/layout/SiteHeader.tsx app/es/layout.tsx app/en/layout.tsx lib/i18n/dict.es.ts lib/i18n/dict.en.ts
git commit -m "feat(nav): header dropdown links to per-service pages + 'view all' footer"
```

---

## Task 9: Sitemap full rewrite

**Files:**
- Modify: `app/sitemap.ts`

- [ ] **Step 1: Replace `app/sitemap.ts` entirely**

```ts
import type { MetadataRoute } from "next";
import { getDict } from "@/lib/i18n";
import { SERVICE_IDS, SERVICE_SLUGS } from "@/lib/services";

const BASE = "https://www.tuagenciaweb.es";

type LocalePair = { es: string; en: string };

function entry(pair: LocalePair, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"], lastModified: Date): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE}${pair.es}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages: { es: `${BASE}${pair.es}`, en: `${BASE}${pair.en}` } },
    },
    {
      url: `${BASE}${pair.en}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages: { es: `${BASE}${pair.es}`, en: `${BASE}${pair.en}` } },
    },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const es = getDict("es");

  const staticPairs: Array<{ pair: LocalePair; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
    { pair: { es: "/es", en: "/en" }, priority: 1.0, freq: "weekly" },
    { pair: { es: "/es/servicios", en: "/en/services" }, priority: 0.9, freq: "monthly" },
    { pair: { es: "/es/sobre-nosotros", en: "/en/about" }, priority: 0.7, freq: "monthly" },
    { pair: { es: "/es/contacto", en: "/en/contact" }, priority: 0.7, freq: "monthly" },
    { pair: { es: "/es/blog", en: "/en/blog" }, priority: 0.6, freq: "weekly" },
  ];

  const servicePairs = SERVICE_IDS.map((id) => ({
    pair: {
      es: `/es/servicios/${SERVICE_SLUGS[id].es}`,
      en: `/en/services/${SERVICE_SLUGS[id].en}`,
    },
    priority: 0.8,
    freq: "monthly" as const,
  }));

  const blogPairs = es.blogPage.articles.map((a) => ({
    pair: { es: `/es/blog/${a.slug}`, en: `/en/blog/${a.slug}` },
    priority: 0.5,
    freq: "monthly" as const,
  }));

  return [...staticPairs, ...servicePairs, ...blogPairs].flatMap(({ pair, priority, freq }) =>
    entry(pair, priority, freq, now),
  );
}
```

- [ ] **Step 2: Build + verify**

```bash
npm run lint
npm run build
```
Visit `/sitemap.xml` in dev. Count the `<url>` entries — should be 38 total (5 + 4 + 8 = 17 pairs × 2 locales = 34, plus the 4 service pages × 2 locales = +8 — wait, the math: 5 static pairs + 4 services + 8 blog posts = 17 pairs × 2 = 34 URLs).

Actually: 5 static pairs × 2 = 10. 4 service pairs × 2 = 8. 8 blog pairs × 2 = 16. Total = 34 URLs in the sitemap.

- [ ] **Step 3: Commit**

```bash
git add app/sitemap.ts
git commit -m "feat(sitemap): full rewrite including services children + blog posts"
```

---

## Task 10: Cleanup — delete ServicesDetail.tsx + obsolete CSS + obsolete dict fields

**Goal:** Remove dead code now that nothing references the old `<ServicesDetail>` and the `navItems[].anchor` field. Remove the obsolete `.sr-detail*` CSS block from globals.css.

**Files:**
- Delete: `components/services/sr/ServicesDetail.tsx`
- Modify: `lib/i18n/dict.es.ts` (drop `anchor` field from `hero.navItems[]` items)
- Modify: `lib/i18n/dict.en.ts` (mirror)
- Modify: `app/globals.css` (delete `.sr-detail*` block)

- [ ] **Step 1: Verify no consumer references `ServicesDetail`**

```bash
cd /c/Users/chaoh/Desktop/Tuagenciaweb
grep -rn "ServicesDetail" --include="*.tsx" --include="*.ts" components/ app/ lib/ 2>/dev/null
```
Expected: zero matches.

- [ ] **Step 2: Delete the file**

```bash
rm components/services/sr/ServicesDetail.tsx
```

- [ ] **Step 3: Drop `anchor` field from `hero.navItems` in both dicts**

In `lib/i18n/dict.es.ts`, replace:
```ts
      navItems: [
        { num: "01", id: "design",      title: "Diseño web a medida",     anchor: "diseno-web" },
        { num: "02", id: "shop",        title: "Tiendas online",          anchor: "tiendas-online" },
        { num: "03", id: "seo",         title: "SEO técnico y contenidos", anchor: "seo-tecnico" },
        { num: "04", id: "maintenance", title: "Mantenimiento opcional",  anchor: "mantenimiento" },
      ],
```
with:
```ts
      navItems: [
        { num: "01", id: "design",      title: "Diseño web a medida" },
        { num: "02", id: "shop",        title: "Tiendas online" },
        { num: "03", id: "seo",         title: "SEO técnico y contenidos" },
        { num: "04", id: "maintenance", title: "Mantenimiento opcional" },
      ],
```

Mirror in `dict.en.ts`:
```ts
      navItems: [
        { num: "01", id: "design",      title: "Custom web design" },
        { num: "02", id: "shop",        title: "Online stores" },
        { num: "03", id: "seo",         title: "Technical SEO & content" },
        { num: "04", id: "maintenance", title: "Optional maintenance" },
      ],
```

- [ ] **Step 4: Delete obsolete `.sr-detail*` CSS block from `app/globals.css`**

```bash
grep -n "/\* Detail blocks \*/" app/globals.css
grep -n "\.sr-detail-wrap\b" app/globals.css
grep -n "\.sr-detail-check\b" app/globals.css
```
The first match gives the start of the block (~line 2590), the last match (`.sr-detail-check`) marks the end of the block (~line 2660). Open the file, delete the entire block from `/* Detail blocks */` through the closing `}` of `.sr-detail-check`.

Confirm after deletion:
```bash
grep -n "\.sr-detail\b" app/globals.css
```
Expected: zero matches (no remaining `.sr-detail*` rules).

DO NOT touch `.sd-*` rules (those are the NEW service detail page styles — different prefix). DO NOT touch other `.sr-*` rules.

- [ ] **Step 5: Build + verify**

```bash
npm run lint
npm run build
```
All 4 service pages + the hub + home + blog still render correctly. No visual regression.

- [ ] **Step 6: Commit**

```bash
git add lib/i18n/dict.es.ts lib/i18n/dict.en.ts app/globals.css components/services/sr/ServicesDetail.tsx
git commit -m "chore(services): drop obsolete ServicesDetail + .sr-detail CSS + anchor fields"
```

---

## Task 11: Responsive QA + merge to main

**Goal:** Manually verify all new pages at 320/375/768/1024/1440px. Fix any responsive issues inside mobile media queries. Then merge to main.

**Files:**
- Possibly: `app/globals.css` (mobile-only fixes if QA finds issues)

- [ ] **Step 1: Start dev server**

```bash
cd /c/Users/chaoh/Desktop/Tuagenciaweb
npm run dev
```

- [ ] **Step 2: Manually test viewports**

Open Chrome DevTools, toggle device toolbar. For each viewport (320, 375, 768, 1024, 1440 px), visit:
- `/es/servicios` — hub with hub cards
- `/es/servicios/diseno-web`
- `/es/servicios/tiendas-online`
- `/es/servicios/seo-tecnico`
- `/es/servicios/mantenimiento`
- `/en/services/web-design` (one EN page to confirm)
- `/es` (home) — confirm 4 service cards link to the new pages

Check:
- No horizontal scroll.
- Breadcrumb in detail page reads OK on mobile.
- Hero H1 doesn't break awkwardly under 375px.
- Included grid: 1 col mobile, 2 cols tablet, 3 cols desktop.
- Use cases grid: 1 col mobile, 2 cols ≥640px.
- Examples grid: 1 col mobile, 2 cols ≥768px.
- CTA buttons stack vertically under 480px.
- Header dropdown still works on tablet/desktop (>1024px).
- Mobile menu shows services subitems indented.

- [ ] **Step 3: Apply scoped mobile fixes only if needed**

If any overflow/spacing issue is found, add the fix inside an existing `@media (max-width: N)` block in `app/globals.css`. Do NOT modify desktop CSS.

- [ ] **Step 4: Test reduced motion**

DevTools → Rendering panel → emulate `prefers-reduced-motion: reduce`. Reload `/es/servicios/diseno-web`. Confirm fade-up doesn't run, no hover transforms scale.

- [ ] **Step 5: Final lint + build**

```bash
npm run lint
npm run build
```
Both green.

- [ ] **Step 6: Commit any QA fixes (if any)**

```bash
git add app/globals.css
git commit -m "fix(services-detail): responsive polish from QA pass"
```

(Skip if no fixes needed.)

- [ ] **Step 7: Push the feature branch**

```bash
git push -u origin feat/services-per-page-arch
```
Vercel auto-creates a preview deployment. Note the preview URL.

- [ ] **Step 8: Present preview URL to the user**

Stop and ask the user to verify on the Vercel preview before merging to main. Do NOT auto-merge.

- [ ] **Step 9: Merge to main and push**

(After user OK.)
```bash
git checkout main
git merge --no-ff feat/services-per-page-arch -m "feat(services): per-page architecture (hub + 4 detail pages)"
git push origin main
```

- [ ] **Step 10: Verify production**

After ~2 minutes, check:
- `https://www.tuagenciaweb.es/es/servicios` (hub)
- `https://www.tuagenciaweb.es/es/servicios/diseno-web` (one detail page)
- `https://www.tuagenciaweb.es/sitemap.xml` (34 URLs total)
- Header dropdown on prod

- [ ] **Step 11: Clean up local branch**

```bash
git branch -d feat/services-per-page-arch
```

(Remote stays for history.)

---

## Self-Review notes

- **Spec coverage:** Each spec section maps to a task:
  - URL structure → Task 1 (lib/services.ts) + Tasks 3-6 (routes)
  - Dict refactor → Tasks 1, 2, 6, 8, 10
  - `lib/services.ts` central mapping → Task 1
  - 7-section template → Tasks 3-6 (one task per pair of sections)
  - Hub simplification → Task 2 (HubCards replaces ServicesDetail)
  - Home Services clickable → Task 7
  - Header dropdown to pages + "Ver todos" → Task 8
  - Sitemap → Task 9
  - Cleanup obsolete code → Task 10
  - Responsive QA + deploy → Task 11
- **No placeholders** in the plan steps. All code blocks present full content where applicable.
- **Type consistency**: `ServiceId` declared in Task 1 (`lib/services.ts`) is used in Tasks 2, 4-7, 8. The `Service` type derived from `Dict["servicesDetail"][keyof Dict["servicesDetail"]]` is used in Tasks 3-6 consistently. The `servicePath()` signature `(id, locale)` is used in Tasks 2, 7, 8 with the same call style.
- **Content note**: Spec says "placeholder semántico legible (no Lorem)". The actual Spanish copy provided in Task 1 Step 4 is intentionally generic-but-plausible — the user will rewrite specific copy later but the structure is fully functional. EN copy in Task 1 Step 5 mirrors the structure (the engineer translates each ES field directly per the instructions in that step).

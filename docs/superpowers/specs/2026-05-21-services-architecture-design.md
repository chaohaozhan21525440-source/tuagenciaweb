# Services architecture — split into per-service pages

**Fecha**: 2026-05-21
**Branch propuesta**: `feat/services-per-page-arch`

**Goal**: Convertir `/servicios` (página única con bloques de detalle por servicio) en un **hub** con **4 páginas dedicadas hijas** (`/servicios/<slug>`). Cada servicio tendrá su propia URL, SEO y plantilla extensa. Las entradas (header dropdown + home Services + hub cards) navegan directamente a la página individual de cada servicio.

**Esta fase es solo arquitectura.** No se rellena el copy/contenido real de cada página de servicio en esta iteración; los slots quedan listos con strings tipo placeholder semántico que el usuario rellenará en una fase posterior (o que se generará via subagent en el siguiente plan).

## Restricciones

- **Branch nueva** `feat/services-per-page-arch` desde `main`. Merge cuando arquitectura termine y build pase.
- **No tocar** /sobre-nosotros, /contacto, /blog, footer, ni el resto del sitio salvo lo que aquí se lista.
- **TypeScript dict parity**: cualquier cambio en `dict.es.ts` se refleja idéntico en shape en `dict.en.ts`. El usuario aprueba cambios de estructura en ambos.
- **Sin contenido real todavía**. Las páginas individuales renderizan con copy placeholder genérico legible (no Lorem). El usuario sustituirá copy en fase 2. La estructura visual debe quedar 100% terminada (CSS, animaciones, responsive).
- Las páginas individuales deben renderizar correctamente en ambos idiomas desde el commit final de esta fase.

## URL structure final

```
/                          → /es (redirect, ya existe)
/es                        → home (con sección Services clickeable)
/es/servicios              → hub (simplificado, con 4 cards clickeables)
/es/servicios/diseno-web         → service detail page
/es/servicios/tiendas-online     → service detail page
/es/servicios/seo-tecnico        → service detail page
/es/servicios/mantenimiento      → service detail page

/en                        → home (EN)
/en/services               → hub (EN)
/en/services/web-design          → service detail page
/en/services/online-stores       → service detail page
/en/services/technical-seo       → service detail page
/en/services/maintenance         → service detail page
```

Slugs distintos por idioma (mejor SEO + ya existen como `anchor` en el dict actual).

## Dict shape refactor

El bloque `dict.servicesPage` se reorganiza. Antes:

```ts
servicesPage: {
  meta, hero, detail, process, comparison, marketing, faq, cta
}
```

Después:

```ts
servicesPage: {
  meta,
  hero,           // sin cambios estructurales; sus navItems siguen siendo válidos
  hubCards,       // NUEVO: 4 cards del hub (icon, title, blurb, slug)
  process,        // sin cambios (se queda en el hub)
  comparison,     // sin cambios
  marketing,      // sin cambios
  faq,            // sin cambios (FAQ general en el hub)
  cta,            // sin cambios
}

// `detail` desaparece de servicesPage. Se sustituye por:
servicesDetail: {
  // un objeto por slug, mismo shape para los 4
  [slug]: {
    meta: { title, description },
    hero: { eyebrow, h1Top, h1Accent, sub, ctaPrimary, ctaSecondary },
    valueProp: { eyebrow, h2, body },                          // §2 narrativa
    included: { eyebrow, h2, sub, items: { title, desc }[] },  // §3 deliverables (grid 4-6 items)
    process: { eyebrow, h2, steps: { num, title, desc }[] },   // §4 proceso específico (3-4 pasos)
    useCases: { eyebrow, h2, sub, items: { title, desc }[] },  // §5 cuando necesitas este servicio (mini-cards)
    examples: { eyebrow, h2, sub, projectSlugs: string[] },    // §6 referencias a portfolio (1-2 slugs de lib/portfolio.ts)
    cta: { eyebrow, h2, sub, primary, secondary },             // §7
  }
}
```

`servicesDetail` se tipa como `Record<ServiceSlug, ServiceDetail>` y se valida en TypeScript que los 4 slugs estén presentes en ambos idiomas. Los 4 slugs son enum:
```ts
type ServiceSlugEs = "diseno-web" | "tiendas-online" | "seo-tecnico" | "mantenimiento";
type ServiceSlugEn = "web-design" | "online-stores" | "technical-seo" | "maintenance";
```

Para evitar duplicar este enum, se introduce un mapping centralizado en `lib/services.ts`:

```ts
// lib/services.ts
export const SERVICE_IDS = ["design", "shop", "seo", "maintenance"] as const;
export type ServiceId = (typeof SERVICE_IDS)[number];

export const SERVICE_SLUGS: Record<ServiceId, { es: string; en: string }> = {
  design:      { es: "diseno-web",      en: "web-design" },
  shop:        { es: "tiendas-online",  en: "online-stores" },
  seo:         { es: "seo-tecnico",     en: "technical-seo" },
  maintenance: { es: "mantenimiento",   en: "maintenance" },
};

export function getServiceSlug(id: ServiceId, locale: "es" | "en"): string {
  return SERVICE_SLUGS[id][locale];
}
```

`servicesDetail` en cada dict usa los 4 `ServiceId` como keys (estables entre idiomas):
```ts
servicesDetail: {
  design: { … },
  shop: { … },
  seo: { … },
  maintenance: { … },
}
```

Esto elimina la duplicación slug-string en el dict y permite que `path()` resuelva la URL correcta por locale.

## Componentes

### Crear

- `components/services/detail/ServiceDetailPage.tsx` — orquestador de las 7 secciones de la página individual. Recibe el `ServiceId` + el `ServiceDetail` del dict + `locale`. Renderiza todas las secciones en orden.
- `components/services/detail/ServiceHero.tsx` (§1)
- `components/services/detail/ServiceValueProp.tsx` (§2)
- `components/services/detail/ServiceIncluded.tsx` (§3)
- `components/services/detail/ServiceProcess.tsx` (§4) — específico para esta página, NO confundir con el `ProcessTimeline` del hub.
- `components/services/detail/ServiceUseCases.tsx` (§5)
- `components/services/detail/ServiceExamples.tsx` (§6) — lee `lib/portfolio.ts` por `projectSlugs` y renderiza 1-2 cards con thumbnail real (sí, aquí mostramos proyectos porque el contexto es probar que sabemos hacer este servicio específico; sigue siendo coherente con la decisión previa de no mostrar proyectos en el hub).
- `components/services/detail/ServiceCta.tsx` (§7) — variante del `ServicesCta` actual, pero con un secondary opcional (ej. "Volver a /servicios" o "Ver otros servicios").
- `app/es/servicios/[slug]/page.tsx` — Server Component que recibe `params.slug`, mapea a `ServiceId` vía `lib/services.ts`, y renderiza `<ServiceDetailPage>`. `generateStaticParams` produce los 4 slugs ES. Metadata dinámica desde `dict.servicesDetail[id].meta`.
- `app/en/services/[slug]/page.tsx` — mirror para EN con los 4 slugs EN.

### Modificar

- `components/services/ServicesPageContent.tsx` (el hub) — elimina el render de `<ServicesDetail>` (que era el §2 con los 4 bloques largos). Añade `<HubCards>` en su lugar.
- `components/services/sr/ServicesDetail.tsx` — **se elimina** (su contenido sube a las páginas individuales).
- `components/services/sr/HubCards.tsx` — **se crea** (NUEVO): 4 cards icon+title+blurb+arrow, cada una `<Link>` a la página del servicio.
- `components/services/sr/ServicesHero.tsx` — modificar `ServicesNav` para que sus `navItems` linkeen a `/servicios/<slug>` (no a `#anchor`).
- `components/services/sr/ServicesNav.tsx` — cambiar `<a href="#anchor">` a `<Link href="/servicios/<slug>">`. Recibe `locale` para construir el path correcto.
- `components/home/Services.tsx` — envolver cada `<article>` en `<Link href={path('service', locale, id)}>` (necesita extender `path()` en `lib/i18n/slugs.ts` para soportar `service` keys con un service id como tercer argumento).
- `components/layout/SiteHeader.tsx` — actualizar `ServicesNavDropdown` para que los items linkeen a `/servicios/<slug>` (no a `#anchor`). Añadir un divisor + item final "Ver todos los servicios →" que apunta al hub `/servicios`.
- `lib/i18n/slugs.ts` — añadir route key `"service"` con un parámetro opcional `id: ServiceId`, que devuelve `/<locale-prefix>/(servicios|services)/<slug>`.
- `lib/i18n/dict.es.ts` y `dict.en.ts` — refactor descrito arriba (eliminar `servicesPage.detail`, añadir `servicesPage.hubCards`, añadir top-level `servicesDetail` con 4 entries).
- `app/sitemap.ts` — añadir 4 rutas ES + 4 EN del cluster servicios + las que faltan (`/servicios`, `/services`, `/blog`, `/blog/<slug>`).
- `app/globals.css` — añadir bloque CSS para las nuevas secciones `.sd-*` (service detail) y `.hub-cards`. Eliminar reglas obsoletas de `.sr-detail*` (las del §2 viejo).

## Detalle del Header dropdown (modificado)

`SiteHeader.tsx → ServicesNavDropdown`:
- Los 4 items existentes ahora linkean a `/<locale-prefix>/(servicios|services)/<slug>` en vez de a anchors.
- Después de los 4 items, un divisor 1px de `--color-ink-100`.
- Un 5º item full-width "Ver todos los servicios →" (EN: "See all services →") que linkea al hub `/servicios`. Estilo: texto centrado, font-weight 600, color brand-soft on hover, hover → fondo brand-soft.
- Mantiene el comportamiento de hover-open/close existente.

## Detalle del Home Services component (modificado)

Cada `<article className="card">` se envuelve en `<Link href={path("service", locale, serviceId)}>`. Esto reemplaza la card actual no-clickeable. Hover existente se conserva. Falta añadir un indicador visual mínimo de que es clickeable: una flecha "→" en la esquina inferior derecha de la card que se desplaza ligeramente al hover. El CTA banner final ("Hablemos") se conserva.

## Detalle del Hub `/servicios` (simplificado)

Orden de secciones del hub tras la refactorización:
1. **ServicesHero** — sin cambios estructurales. La nav de la derecha (`<ServicesNav>`) ahora linkea a las 4 páginas individuales.
2. **HubCards (NUEVO)** — 4 cards en grid 2×2 (1 col mobile, 2 cols tablet, 4 cols desktop). Cada card es un `<Link>` a su página individual. Estructura por card: icono color-soft + título + 1-2 líneas de blurb + flecha "Ver detalle →".
3. **ProcessTimeline** — sin cambios (proceso general).
4. **ComparisonTable** — sin cambios.
5. **MarketingGrid** — sin cambios.
6. **ServicesFaq** — sin cambios (FAQ general; las FAQ específicas por servicio se eliminaron del scope).
7. **ServicesCta** — sin cambios.

Lo que **desaparece** del hub: el render de `<ServicesDetail>` (los 4 bloques largos con números fantasma). Esa estructura se replica como página por servicio.

## Detalle del template `/servicios/[slug]` (template R-2)

Cada página individual de servicio renderiza estas 7 secciones en orden:

1. **Hero del servicio** (`<ServiceHero>`)
   - Breadcrumb: `Servicios / <nombre del servicio>` con link al hub.
   - Badge pill del servicio con icono y color de marca soft.
   - H1 grande con `h1Top` + `h1Accent` en azul.
   - Subtítulo 16-17px.
   - 2 CTAs: primary ("Solicitar presupuesto" → /contacto) + secondary ("Ver todos los servicios" → /servicios).
   - Hero visual: ilustración o gradiente sutil (no foto). Mantiene look textual premium del hub.

2. **Value prop** (`<ServiceValueProp>`)
   - Sección con eyebrow + H2 + body largo (1-2 párrafos densos).
   - Estilo editorial: max-width 720px, centered, generous spacing.

3. **Qué incluye** (`<ServiceIncluded>`)
   - Eyebrow + H2 + sub.
   - Grid de 4-6 items (deliverables). Cada item: icono pequeño + título + descripción 1-2 líneas.
   - 2 cols mobile, 3 cols desktop.

4. **Cómo trabajamos en este servicio** (`<ServiceProcess>`)
   - Eyebrow + H2 + sub.
   - 3-4 pasos numerados estilo stepper vertical editorial.
   - Específico para este servicio (NO el timeline horizontal del hub).

5. **Cuándo necesitas este servicio** (`<ServiceUseCases>`)
   - Eyebrow + H2 + sub.
   - Grid de 3-4 mini-cards de use cases. Cada card: pictograma simple + título corto + 1 línea de contexto.
   - Pensado para que el visitante se reconozca ("ah, yo soy ese caso").

6. **Ejemplos** (`<ServiceExamples>`)
   - Eyebrow + H2 + sub.
   - 1-2 cards de proyectos del portfolio (lee `lib/portfolio.ts` filtrando por los slugs especificados en `examples.projectSlugs`).
   - Cada card: thumbnail real + nombre del proyecto + sector + link "Ver proyecto →" (si tiene URL pública).
   - Si `projectSlugs` está vacío, sección no renderiza.

7. **CTA final** (`<ServiceCta>`)
   - Card gradiente azul, similar al `ServicesCta` del hub pero más compacta.
   - Eyebrow + H2 + sub + 2 botones (primary = contacto, secondary = WhatsApp).
   - 3 indicadores ("Respuesta 24h · Sin compromiso · Presupuesto detallado").

**Motion**: fade-up por sección al entrar en viewport (Intersection Observer via framer-motion `whileInView`, ya en uso). Duración 0.6s, stagger 0.06s entre hijos.

**Responsive**: misma escala que el hub (clamp() para tipografía, grids responsive con breakpoints 640/768/1024).

## SEO

- `metadata.title` por página: `<Title del servicio> | Tuagenciaweb` (EN equivalente).
- `metadata.description` por página: 1 frase desde `dict.servicesDetail[id].meta.description`.
- `alternates.canonical` por idioma + `alternates.languages` con cross-link al equivalente en el otro idioma.
- `alternates.canonical` del hub queda igual.
- OpenGraph: `type: "website"` para el hub, `type: "article"` para las páginas de servicio (las trata más como contenido).
- Schema.org `Service` JSON-LD por página individual (en una fase posterior si se quiere; no se inyecta en esta).

## Sitemap

Reescribir `app/sitemap.ts` para producir el sitemap completo. Rutas:
- `/es` y `/en` — priority 1.0, weekly
- `/es/servicios` y `/en/services` — priority 0.9, monthly
- 4 × `/es/servicios/<slug>` y 4 × `/en/services/<slug>` — priority 0.8, monthly
- `/es/sobre-nosotros` y `/en/about` — priority 0.7, monthly
- `/es/contacto` y `/en/contact` — priority 0.7, monthly
- `/es/blog` y `/en/blog` — priority 0.6, weekly
- 8 × `/es/blog/<slug>` y 8 × `/en/blog/<slug>` — priority 0.5, monthly

Total: 38 URLs en el sitemap.

## Acceptance criteria

- [ ] `npm run lint` y `npm run build` verdes al final.
- [ ] El build genera estáticamente las 8 nuevas páginas (`/es/servicios/[slug]` × 4 + `/en/services/[slug]` × 4).
- [ ] Los 4 `<Link>` de `<HubCards>` (en el hub) navegan a la página correcta.
- [ ] Las 4 cards de la home `<Services>` navegan a la página correcta.
- [ ] El dropdown del header muestra los 4 items + "Ver todos los servicios" y todos navegan a la URL correcta.
- [ ] El hover/click "Servicios" mismo lleva al hub.
- [ ] Las 8 páginas individuales renderizan las 7 secciones con copy placeholder semántico legible (no Lorem ipsum).
- [ ] El sitemap incluye las 8 nuevas rutas + las del hub + las que faltaban (blog, blog/[slug]).
- [ ] No queda en el codebase ninguna referencia a `<ServicesDetail>` (componente eliminado).
- [ ] Las animaciones fade-up + reduced-motion funcionan en las páginas nuevas.
- [ ] Responsive verificado a 320, 375, 768, 1024, 1440 px.
- [ ] Los anchors antiguos (`/servicios#diseno-web`) ya no son linkeados desde ningún sitio del codebase — el header dropdown, la nav del hero del hub y la nav de la home apuntan todos a las páginas individuales.

## Out of scope (fase 2)

- El contenido real de las 8 páginas individuales (copy específico por servicio). En esta fase se rellenan con placeholders semánticos legibles que el usuario revisará y reescribirá en una fase posterior.
- Inyectar JSON-LD `Service` schema por página.
- A/B de copy.
- Imágenes/ilustraciones específicas por servicio (más allá de iconos lineales que ya tenemos).
- Cambios en `/precios` (que el snapshot de precio se haya quitado del template implica que precios sigue donde está, sin tocar).
- Cambios en footer (lista de "Servicios" del footer puede quedar como está apuntando al hub o ser una mejora separada).

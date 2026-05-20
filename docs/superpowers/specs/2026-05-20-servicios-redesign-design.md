# /servicios — Rediseño premium (textual)

**Fecha**: 2026-05-20
**Branch propuesta**: `feat/servicios-redesign`
**Objetivo**: Sustituir la /servicios actual (sosa, extensa, repetitiva, "muy IA") por una página premium orientada a conversión, alineada con inspiraciones del usuario (Clay, Halo Lab, Ramotion, Digital Silk).

## Restricciones

- **No tocar el resto del sitio** (home, sobre nosotros, contacto, blog, layout, header, footer).
- **Cero ejemplos de proyectos** en /servicios (eliminar el `<Services>` reuso del home si era necesario, decidido más abajo).
- **Sin fotos**: el carácter visual viene de tipografía + espacios + microanimaciones + detalles geométricos. Inspiraciones: Clay, Halo Lab, Ramotion.
- Mantener sistema visual existente: fondo claro, acento azul `#2563eb`, tinta `#0F172A`, gris `#64748B`, cards blancas con `border-radius: 24–32px`, sombras suaves.
- Tipografía ligeramente más refinada que el resto (escala de display más generosa en H2/H3 con `letter-spacing` negativo más marcado).
- I18N: paridad ES/EN obligatoria (los strings van en `lib/i18n/dict.es.ts` y `dict.en.ts` bajo la key `servicesPage`, extendiendo lo que ya existe).

## Estructura final (7 secciones)

```
1. Hero (split editorial)
2. Servicios principales (4 cards — componente existente, refinado)
3. Cómo trabajamos (timeline horizontal 4 pasos)
4. Por qué elegirnos (comparativa 2 columnas)
5. Marketing digital y SEO (grid 8 mini-cards)
6. FAQ (8 preguntas, schema FAQPage)
7. CTA final
```

La sección "Proyectos destacados" del brief original **se elimina** — el usuario quiere /servicios 100% textual, los proyectos siguen viviendo solo en /#proyectos del home.

---

## §1 — Hero

**Layout**: split editorial 60/40 (texto izquierda, lista vertical de servicios derecha).

**Izquierda**:
- Badge pill `● SERVICIOS` (font-size 12px, letter-spacing 0.12em, color brand).
- H1: "Diseño web, SEO y marketing digital para hacer crecer tu negocio." — `clamp(40px, 4.6vw, 64px)`, `letter-spacing: -.03em`, weight 800. "**hacer crecer tu negocio**" en azul `#2563eb`.
- Sub (max-width 520px, gris `#475569`, 16.5px, line-height 1.55): "Creamos webs rápidas, modernas y orientadas a conversión. Desde el diseño hasta el posicionamiento, nos encargamos de todo para que tu web genere resultados."
- CTAs (gap 12px): `Solicitar presupuesto` (sólido brand) + `Ver proyectos` (ghost, href `/#proyectos`).
- Trust pills (4, gap 8px, font 12.5px, padding 6px 12px, border `#e5e7eb`, background `#fff`): Sin cuotas obligatorias · SEO técnico incluido · Entrega en 2–3 semanas · Código y dominio 100% tuyos.

**Derecha — Lista vertical "Nuestros servicios"**:
- Card vertical de fondo `linear-gradient(180deg, #eef4ff 0%, #f8fafc 100%)`, border-radius 24px, padding 28px.
- Etiqueta arriba: `EN ESTA PÁGINA` (12px, letter-spacing 0.14em, gris).
- 4 items con número (01-04), título y flecha →:
  - 01 — Diseño web a medida → `#diseno-web`
  - 02 — Tiendas online → `#tiendas-online`
  - 03 — SEO técnico y contenidos → `#seo-tecnico`
  - 04 — Mantenimiento → `#mantenimiento`
- Cada item es `<a>` con `scroll-behavior: smooth` al anchor. Hover: fondo blanco + flecha translateX(+4px). Transición 300ms.

**Background**: gradiente radial sutil en la parte superior (`radial-gradient(ellipse 60% 50% at 80% 0%, rgba(37,99,235,.06), transparent 70%)`).

**Anchors**: `<section id="diseno-web">` etc. en §2.

---

## §2 — Servicios principales

**Componente**: nuevo `components/services/ServicesDetail.tsx` que reemplaza el reuso del `<Services>` del home (que ya tiene su hover de cards). Las cards son **distintas** del home — más extensas, con anchor target.

**Layout**: stack vertical de 4 secciones, no grid. Cada servicio ocupa un bloque full-width con:
- ID anchor (`diseno-web`, `tiendas-online`, `seo-tecnico`, `mantenimiento`).
- Número `01` grande (96px, weight 800, opacity 0.08, color brand, posicionado top-left absoluto del bloque como ornamento).
- Eyebrow (badge color por servicio, 12.5px).
- Title H2 (38px → 28px mobile, weight 800, letter-spacing -.025em).
- Lead (16px, gris, max-width 56ch).
- Grid 3 bullets con check icon + texto (15px, weight 600).

**Copy borrador (igual estructura para los 4)**:

| # | Eyebrow | Title | Lead | 3 bullets |
|---|---|---|---|---|
| 01 | DISEÑO WEB | Diseño web a medida | Webs únicas en Next.js, sin plantillas reutilizadas. Diseñamos cada interfaz pensando en tu marca y en convertir visitas en clientes. | Diseño UI/UX propio · Animaciones sutiles y rendimiento 100/100 · Editable por ti tras la entrega |
| 02 | TIENDAS ONLINE | Tiendas online | E-commerce con catálogo, pasarela de pago segura y panel de gestión simple. Listas para vender desde el día 1. | Stripe, Redsys o PayPal · Inventario y envíos automatizados · Optimizado para Google Shopping |
| 03 | SEO TÉCNICO | SEO técnico y contenidos | Indexación, velocidad, schema y contenido optimizado para que tu web posicione de verdad — no solo para que se vea bonita. | Core Web Vitals en verde · Schema.org y sitemap dinámico · Auditoría mensual opcional |
| 04 | MANTENIMIENTO | Mantenimiento opcional | Soporte por horas, sin cuota mensual obligatoria. Tú decides cuándo necesitas algo y solo pagas por lo que usas. | Bolsa de horas prepago · Backups y monitorización 24/7 · Sin contratos de permanencia |

**Hover**: cada bloque tiene un hover sutil sobre el número fantasma (sube su opacidad 0.08 → 0.18 y escala 1.06).

---

## §3 — Cómo trabajamos

**Layout**: timeline horizontal 4 pasos en una fila (en desktop). En mobile (<768px), colapsa a vertical.

**Estructura**:
- Container con `position: relative`.
- Línea horizontal: `::before` absoluta a `top: 22px`, gradiente `linear-gradient(to right, #e5e7eb, #2563eb 50%, #e5e7eb)`.
- 4 columnas (`grid-template-columns: repeat(4, 1fr)`, gap 24px). Cada paso:
  - Dot 14px circular con border 2px brand + fondo blanco (z-index 1 sobre la línea).
  - Número `01` color brand, 12px, weight 700, letter-spacing 0.1em.
  - Title 17px weight 700.
  - Desc 14px gris, line-height 1.5, max-width 220px.

**Copy**:
- **01 · Estrategia** — Definimos objetivo, público objetivo y prioridades antes de tocar una sola pantalla.
- **02 · Diseño y desarrollo** — UI a medida y código limpio sobre Next.js. Sin plantillas, sin atajos.
- **03 · Optimización SEO** — Indexación, velocidad, schema y on-page desde el primer commit.
- **04 · Lanzamiento y soporte** — Deploy, formación al equipo y mantenimiento opcional sin permanencia.

**Hover (requisito explícito del usuario)**: al pasar el ratón sobre un paso:
- El dot se rellena de azul (`background: #2563eb`).
- Toda la columna escala 1.04 (transform-origin: center top).
- El título cambia de `#0f172a` → `#1d4ed8`.
- Transición 280ms `cubic-bezier(.2,.7,.2,1)`.

**Mobile**: timeline → vertical stepper. La línea pasa de horizontal a vertical (a la izquierda de los dots). Hover deshabilitado, fade-up al scroll en cada paso.

---

## §4 — Por qué elegirnos

**Title (centrado)**: "Más que una web bonita." — H2 38px, accent azul en "**bonita**".
**Sub (centrada, max-width 520px, gris)**: "Una comparación honesta de lo que ofrecemos frente a la mayoría del mercado."

**Layout**: una sola card grande (max-width 1080px, border-radius 28px, sombra suave) dividida en 2 columnas con divisor vertical 1px `#e5e7eb`. En mobile, el divisor pasa a horizontal y las columnas se apilan.

**Columna izquierda (Otras agencias)**:
- Eyebrow: `OTRAS AGENCIAS` (12px, letter-spacing 0.14em, gris `#94a3b8`).
- Fondo `#fafafa`, color texto `#64748B`.
- 4 items (✕ icono gris en círculo `#e5e7eb`, 18px):
  - Plantillas genéricas
  - Cuotas mensuales eternas
  - SEO superficial o inexistente
  - Código y dominio bajo su control

**Columna derecha (Tuagenciaweb)**:
- Eyebrow: `TUAGENCIAWEB` (12px, letter-spacing 0.14em, brand).
- Fondo `#fff`, color texto `#0f172a`.
- 5 items (✓ icono blanco en círculo brand, 18px):
  - Diseño a medida sobre Next.js
  - Pago único, sin cuotas obligatorias
  - SEO técnico real, no parches
  - Código y dominio 100% tuyos
  - Soporte opcional por horas

**Motion**: fade-up al entrar en viewport. Los items aparecen en stagger 60ms cada uno.

---

## §5 — Marketing digital y SEO

**Title (centrado)**: "Estrategia digital end-to-end" — H2 38px.
**Sub**: "Más allá del diseño: ayudamos a que tu web atraiga, convierta y crezca."

**Layout**: grid de 8 mini-cards (4 columnas desktop, 2 mobile-tablet, 1 phone <480px).

**Card style**:
- Background `#fff`, border `1px solid #e5e7eb`, border-radius 18px, padding 22px.
- Icon 28px (icono lineal con color brand-soft de fondo en un círculo 44px).
- Title 15px weight 700.
- Desc 13.5px gris, line-height 1.5.

**Hover**: border passes to brand `#2563eb`, translateY(-3px), shadow soft. 300ms.

**Copy**:
| # | Title | Desc |
|---|---|---|
| 1 | SEO local | Aparece primero en las búsquedas de tu ciudad y barrio. |
| 2 | SEO técnico | Velocidad, indexación y schema listos para Google. |
| 3 | Link building | Enlaces de autoridad para escalar posiciones. |
| 4 | Google Ads | Campañas rentables con tracking de conversión real. |
| 5 | Meta Ads | Anuncios en Instagram y Facebook bien segmentados. |
| 6 | Analítica web | GA4, Search Console y dashboards a medida. |
| 7 | CRO | Optimización de conversión basada en datos reales. |
| 8 | Automatizaciones | Email, CRM y flujos sin trabajo manual. |

**Iconos**: inline SVG (mismo patrón que `components/home/Services.tsx`), color brand `#2563eb`, stroke-width 2, line-cap round.

---

## §6 — FAQ

**Title**: "Preguntas frecuentes" — H2 38px centrado.
**Sub**: "Todo lo que sueles preguntarnos antes de empezar."

**Layout**: lista vertical de 8 acordeones, max-width 760px centrada. Cada item:
- Pregunta en row con `<button>` (full-width, padding 22px 24px, font-weight 600, font 16.5px, color `#0f172a`).
- Icono `+` a la derecha que rota 45° (→ `×`) al abrir.
- Border-bottom `1px solid #e5e7eb` entre items.
- Respuesta en panel desplegable (`max-height` animado, padding 0 24px 22px, font 15px, gris, line-height 1.65).

**Comportamiento**: solo un acordeón abierto a la vez. Transición 320ms ease.

**Copy (8 Q+A)**:

1. **¿Cuánto cuesta una página web?**
   Depende del alcance. Una web corporativa parte de 590€, una tienda online desde 1.890€. Te enviamos un presupuesto cerrado en 24h sin compromiso.

2. **¿Cuánto se tarda en tener la web lista?**
   Entre 2 y 3 semanas para una web corporativa. Para una tienda online suelen ser 4-6 semanas, dependiendo del catálogo.

3. **¿De quién es el dominio y el código?**
   Tuyos al 100%. El dominio se compra a tu nombre desde el día 1, y el código fuente se te entrega al cierre del proyecto sin candados.

4. **¿Incluye SEO?**
   Sí: el SEO técnico (velocidad, schema, indexación, sitemap) está incluido en todos los packs. El SEO de contenidos y link building son opcionales y se contratan aparte.

5. **¿Podré editar la web yo mismo?**
   Sí. Te entregamos un panel de edición con el que puedes cambiar textos, imágenes y secciones sin tocar código ni depender de nosotros.

6. **¿Puedo pagar a plazos?**
   Sí, ofrecemos pago en 2 o 3 plazos sin recargo. Lo acordamos contigo al cerrar el presupuesto.

7. **¿Trabajáis con clientes de toda España?**
   Sí. Trabajamos 100% en remoto con clientes en cualquier punto de España. Las reuniones son por videollamada y el ritmo lo marcas tú.

8. **¿Ofrecéis mantenimiento después de la entrega?**
   Sí, mantenimiento opcional por bolsa de horas prepago. Sin cuota mensual obligatoria, solo pagas por lo que necesites.

**Schema**: inyectar JSON-LD `FAQPage` en el `<head>` de la página con las 8 Q+A. Crear helper en `lib/schemas.ts` (`faqPageSchema(items)`) y consumirlo en el Server Component de `app/es/servicios/page.tsx` y `app/en/services/page.tsx`.

---

## §7 — CTA final

**Layout**: card grande max-width 1080px, centrada, padding 64px 56px, border-radius 32px.
**Fondo**: gradiente `linear-gradient(135deg, #1d4ed8 0%, #2563eb 60%, #1e40af 100%)` con un overlay de noise sutil para evitar planitud (svg pattern 0.04 opacity).
**Texto en blanco**.

- Eyebrow `LISTO PARA EMPEZAR` (12px, letter-spacing 0.16em, opacity 0.7).
- H2 "¿Hablamos de tu proyecto?" (44px → 32px mobile, weight 800, letter-spacing -.025em).
- Sub "Te preparamos una propuesta personalizada en menos de 24 horas." (17px, opacity 0.85, max-width 480px).
- 2 botones (gap 14px, flex-wrap):
  - **Solicitar presupuesto** — sólido blanco, texto azul, padding 14px 26px, font 15px weight 700, border-radius 14px, sombra suave. Href: `/es/contacto` o `/en/contact`.
  - **WhatsApp** — outline (border `1px solid rgba(255,255,255,.4)`, fondo `rgba(255,255,255,.08)`, hover `rgba(255,255,255,.18)`). Icon WhatsApp + texto. Href: `https://wa.me/34613654273?text=Hola%2C%20me%20interesa%20un%20presupuesto%20para%20mi%20web.`
- 3 indicadores debajo en row (gap 24px, font 13px, opacity 0.85, separados por bullet `·`):
  Respuesta en 24h · Sin compromiso · Presupuesto detallado.

**Mobile**: padding reduce a 40px 28px. Botones full-width apilados.

---

## Motion (transversal)

- **Fade-up on scroll**: cada sección y cada card interna usa Intersection Observer (o `framer-motion` `whileInView` ya disponible en el repo) — `opacity: 0 → 1`, `translateY: 16px → 0`, duración 600ms, ease-out, stagger 60-80ms entre hijos.
- **Hover transitions**: 300ms `cubic-bezier(.2,.7,.2,1)` para todo (cards, botones, dots del proceso).
- **Reduced motion**: respetar `@media (prefers-reduced-motion: reduce)` — deshabilitar fade-up, dejar `opacity: 1` y `transform: none`. Hover transiciones a 0s.

## Responsive

- **Desktop** (≥1024px): grids completos, hero split 60/40, timeline horizontal 4 columnas.
- **Tablet** (640-1023px): hero apila vertical, services-detail mantiene full-width, timeline horizontal sigue 4 columnas si el container lo permite, marketing grid 2 columnas.
- **Mobile** (<640px): todo apilado, timeline → vertical stepper, marketing grid 1 columna (a <480px) o 2 columnas (480-639px), CTA final con botones full-width.

Reusar los breakpoints existentes (640, 768, 1024, 1100, 1280).

## SEO

- **URL**: `/es/servicios` y `/en/services` (ya existen, mantener slugs).
- **Title** (ES): `Servicios de diseño web, SEO y marketing digital | Tuagenciaweb`.
- **Title** (EN): `Web design, SEO and digital marketing services | Tuagenciaweb`.
- **Meta description** (ES): "Diseño web en Barcelona, tiendas online, SEO técnico y marketing digital. Creamos webs rápidas y orientadas a conversión."
- **Meta description** (EN): "Web design in Barcelona, online stores, technical SEO and digital marketing. Fast, conversion-focused websites."
- **H1**: "Servicios de diseño web, SEO y marketing digital" (único H1 de la página, dentro del hero).
- **Schema**: FAQPage JSON-LD generado desde el dict (los 8 Q+A). Inyectar en el `<head>` desde el page component.

## Componentes a crear

```
components/services/
├── ServicesPageContent.tsx       (refactorizado, orquesta los nuevos bloques)
├── ServicesHero.tsx              (§1 nuevo)
├── ServicesNav.tsx               (§1 derecha — lista vertical anchor)
├── ServicesDetail.tsx            (§2 nuevo — 4 bloques full-width con números fantasma)
├── ProcessTimeline.tsx           (§3 nuevo — timeline horizontal con hover)
├── ComparisonTable.tsx           (§4 nuevo — dos columnas con divisor)
├── MarketingGrid.tsx             (§5 nuevo — 8 mini-cards)
├── ServicesFaq.tsx               (§6 nuevo — acordeón con schema FAQPage)
└── ServicesCta.tsx               (§7 nuevo — card final gradiente)
```

CSS: nuevo bloque dedicado en `app/globals.css` bajo el comentario `/* ===== /servicios — redesign 2026-05-20 ===== */` con scope `.services-page-v2` para no chocar con el actual `.services-page`. Migrar el id de la página de `services-page` → `services-page-v2` (o un nombre limpio sin sufijo).

## Strings i18n

Extender `lib/i18n/dict.es.ts` y `lib/i18n/dict.en.ts` con la key `servicesPage` rehecha. La estructura quedará:

```ts
servicesPage: {
  meta: { title, description },
  hero: { badge, h1Top, h1Accent, sub, ctaPrimary, ctaSecondary, trustPills: string[], navLabel, navItems: { num, title, anchor }[] },
  detail: { items: { id, eyebrow, title, lead, bullets: string[] }[] },
  process: { eyebrow, h2, sub, steps: { num, title, desc }[] },
  comparison: { h2Top, h2Accent, sub, others: { eyebrow, items: string[] }, us: { eyebrow, items: string[] } },
  marketing: { h2, sub, items: { icon, title, desc }[] },
  faq: { h2, sub, items: { q, a }[] },
  cta: { eyebrow, h2, sub, primary, whatsapp, indicators: string[] },
}
```

Mantener la key `services` del home como está (no se toca).

## Out of scope

- Cambios en la home, footer, header, sobre nosotros, contacto, blog, layout global.
- Captura de pantallas / mockups de proyectos.
- Cambios en `lib/packs.ts` (los precios siguen donde están, este spec no los toca; solo se referencian en la FAQ #1).
- Tracking / analytics nuevos.

## Criterios de aceptación

- [ ] Lighthouse mobile/desktop ≥ 95 en Performance, SEO, Accessibility.
- [ ] CLS < 0.1, LCP < 2.5s.
- [ ] Schema FAQPage validado en https://search.google.com/test/rich-results.
- [ ] Versión EN paritaria con la versión ES.
- [ ] `npm run lint` y `npm run build` limpios.
- [ ] Tests unit existentes no regresan (15/15 Vitest).
- [ ] Sin horizontal scroll en 320px, 375px, 768px, 1024px, 1440px.
- [ ] Hover del proceso visible y suave.
- [ ] FAQ con un solo item abierto a la vez.
- [ ] El usuario valida la página en local antes del deploy.

# Tuagenciaweb — Web corporativa de la agencia

- **Fecha**: 2026-05-14
- **Dominio**: tuagenciaweb.es
- **Despliegue**: Vercel
- **Repo local**: `C:\Users\chaoh\Desktop\Tuagenciaweb`
- **Skill de diseño**: [`taste-skill`](https://github.com/Leonxlnx/taste-skill) — variante `design-taste-frontend` con dials ajustados (ver §3)

## 1. Objetivo y posicionamiento

Web corporativa de una agencia de desarrollo web orientada a pymes y autónomos en España. Tono **cercano / sin complicaciones**, con **precios públicos** y entrega rápida. Debe transmitir sensación de empresa **consolidada y experta** sin recurrir a afirmaciones falsas (no "20 años en el sector"; sí proceso detallado, FAQ extensa, testimonios, copy experto y número real de proyectos entregados).

**Usuario tipo**: dueño/a de clínica dental, despacho de abogados, empresa de reformas, fisioterapia, hostelería, etc., que necesita una primera web profesional o reemplazar una desactualizada.

**Criterios de éxito**:

- Cliente frío entiende servicio, confianza y precio en < 30s.
- Conversión clara: CTA "Pedir presupuesto" siempre visible (navbar + cierre de cada sección).
- Lighthouse ≥ 95 en Performance/Accessibility/Best Practices/SEO.
- Cumple RGPD/LSSI desde el día 1.

## 2. Stack técnico

| Capa             | Tecnología                                      | Notas                                               |
| ---------------- | ----------------------------------------------- | --------------------------------------------------- |
| Framework        | Next.js 15 (App Router) + React 19 + TypeScript | RSC por defecto, "use client" solo donde haga falta |
| Estilos          | Tailwind CSS v4                                 | 90% del CSS; tokens custom en `tailwind.config.ts`  |
| i18n             | `next-intl`                                     | Rutas localizadas: `/es/servicios` ↔ `/en/services` |
| Motion           | Framer Motion                                   | Motion bajo (level ~4) — fade-up, stagger suave     |
| Componentes base | `shadcn/ui` personalizado                       | Radii, colores y shadows custom (nunca default)     |
| Iconos           | `@phosphor-icons/react`                         | `strokeWidth=1.5` global                            |
| Blog             | MDX + `next-mdx-remote` (o Contentlayer 2)      | Posts en `content/blog/{es,en}/*.mdx`               |
| Formularios      | React Hook Form + Zod                           | Mismo schema cliente y servidor                     |
| Email            | Resend                                          | Dominio verificado para `noreply@tuagenciaweb.es`   |
| Rate limit       | Upstash Ratelimit                               | 1 envío de formulario / 60s / IP                    |
| Analítica        | Vercel Analytics + Speed Insights               | Bloqueada hasta consentimiento                      |

**Estructura de carpetas**:

```
Tuagenciaweb/
├── app/
│   └── [locale]/
│       ├── layout.tsx
│       ├── page.tsx                       # Home
│       ├── servicios/page.tsx             # → /en/services
│       ├── portfolio/page.tsx
│       ├── sobre-nosotros/page.tsx        # → /en/about
│       ├── contacto/page.tsx              # → /en/contact
│       │   └── actions.ts                 # Server Action submitContact
│       ├── blog/
│       │   ├── page.tsx
│       │   └── [slug]/page.tsx
│       └── legal/
│           ├── aviso-legal/page.tsx       # → /en/legal/legal-notice
│           ├── privacidad/page.tsx        # → /en/legal/privacy
│           └── cookies/page.tsx
├── components/
│   ├── ui/                                # shadcn personalizado (Button, Input, Accordion…)
│   ├── sections/                          # Hero, ServicesGrid, PortfolioGrid, FAQ…
│   └── layout/                            # Navbar, Footer, CookieBanner, LocaleSwitcher
├── content/blog/{es,en}/*.mdx
├── messages/
│   ├── es.json
│   └── en.json
├── lib/
│   ├── resend.ts
│   ├── ratelimit.ts
│   ├── schemas.ts                         # Zod
│   ├── packs.ts                           # datos canónicos de los 3 packs
│   ├── portfolio.ts                       # listado de proyectos
│   └── seo.ts                             # helpers metadata + JSON-LD
├── public/
│   ├── logo/                              # SVGs del logo (light/dark/mono)
│   ├── portfolio/                         # capturas de los proyectos
│   └── og/                                # imágenes OG por defecto
├── docs/superpowers/specs/                # specs (este archivo)
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

## 3. Identidad visual

### 3.1 Configuración de taste-skill

```
DESIGN_VARIANCE:  5    (1=simétrico, 10=caótico)  → asimetría moderada, no agresiva
MOTION_INTENSITY: 4    (1=estático, 10=cinemático)→ fade-ups + stagger, nada de magnetic/parallax pesado
VISUAL_DENSITY:   4    (1=galería, 10=cockpit)    → respiración generosa sin sentirse vacío
```

Reglas duras de taste-skill aplicables a este proyecto:

- **Sin Inter**, sin serifs en home/UI. Display = Cabinet Grotesk; body = Geist.
- **Sin emojis** en código ni copy.
- **Sin pure black** (`#000`). Usar `#0F172A` / `#0B1426`.
- **Sin gradientes-text** en titulares grandes.
- **Sin Unsplash**; placeholders con `https://picsum.photos/seed/<slug>/W/H` o SVG.
- Hero: `min-h-[100dvh]`, **nunca** `h-screen`.
- `grid-cols-*` en lugar de cálculos `calc(33%-1rem)`.
- Iconos Phosphor con stroke 1.5 (constante global).

### 3.2 Logo

**Dirección elegida: B — Símbolo + wordmark.**

- **Símbolo**: cuadrado de esquinas suaves (`rounded-[6px]`, ratio 1:1) con fondo `#2C5BFF` y la letra `t` minúscula en blanco, Cabinet Grotesk Bold, centrada ópticamente.
- **Wordmark**: `tuagenciaweb` en minúsculas, Cabinet Grotesk Bold, `tracking-tight`, color `#0F172A` (light mode) / `#FAFAFA` (dark sections).
- **Espaciado símbolo↔wordmark**: 0.6× del alto del símbolo.
- **Variantes a producir** (en `public/logo/`): `logo-full-light.svg`, `logo-full-dark.svg`, `logo-symbol.svg`, `logo-symbol-mono.svg`, `favicon.svg`, `favicon-32.png`, `favicon-180.png`, `apple-touch-icon.png`.

### 3.3 Paleta (tokens en Tailwind)

| Token          | HEX       | Uso                                                  |
| -------------- | --------- | ---------------------------------------------------- |
| `bg.canvas`    | `#FAFAFA` | Fondo general                                        |
| `bg.elevated`  | `#FFFFFF` | Cards que necesitan elevación                        |
| `bg.dark`      | `#0B1426` | Footer y secciones oscuras (CTA final, hero alt)     |
| `text.strong`  | `#0F172A` | Titulares                                            |
| `text.body`    | `#475569` | Párrafos                                             |
| `text.muted`   | `#94A3B8` | Textos secundarios, captions                         |
| `border`       | `#E2E8F0` | Bordes finos                                         |
| `divider`      | `#F1F5F9` | Separadores                                          |
| `accent`       | `#2C5BFF` | Único color de marca: CTAs, links, foco              |
| `accent.hover` | `#1E40FF` | Hover sobre el acento                                |
| `accent.soft`  | `#EFF4FF` | Fondos sutiles (badges "Más elegido", chips activos) |

### 3.4 Tipografía

- **Display**: Cabinet Grotesk (700/800) — titulares.
- **Body**: Geist (400/500/600) — párrafos y UI.
- Cargadas vía `next/font` (self-hosted, sin tracking externo). Si Cabinet Grotesk no está disponible vía `next/font/google`, usar Fontshare o fallback a Geist Bold.

**Escala tipográfica (móvil → desktop)**:

| Token      | Tamaño                                                  | Uso                 |
| ---------- | ------------------------------------------------------- | ------------------- |
| display-xl | `text-5xl md:text-7xl tracking-tighter leading-none`    | H1 hero             |
| display-lg | `text-4xl md:text-6xl tracking-tighter leading-tight`   | H1 páginas internas |
| display-md | `text-3xl md:text-5xl tracking-tight leading-tight`     | H2 sección          |
| heading    | `text-2xl md:text-3xl font-semibold`                    | H3                  |
| body       | `text-base text-text.body leading-relaxed max-w-[65ch]` | Párrafos            |
| caption    | `text-sm text-text.muted`                               | Metas, captions     |

## 4. Arquitectura de información

### 4.1 Sitemap

| Página         | ES                      | EN                       |
| -------------- | ----------------------- | ------------------------ |
| Home           | `/es`                   | `/en`                    |
| Servicios      | `/es/servicios`         | `/en/services`           |
| Portfolio      | `/es/portfolio`         | `/en/portfolio`          |
| Sobre nosotros | `/es/sobre-nosotros`    | `/en/about`              |
| Blog (listado) | `/es/blog`              | `/en/blog`               |
| Blog (post)    | `/es/blog/[slug]`       | `/en/blog/[slug]`        |
| Contacto       | `/es/contacto`          | `/en/contact`            |
| Aviso legal    | `/es/legal/aviso-legal` | `/en/legal/legal-notice` |
| Privacidad     | `/es/legal/privacidad`  | `/en/legal/privacy`      |
| Cookies        | `/es/legal/cookies`     | `/en/legal/cookies`      |
| 404            | (auto)                  | (auto)                   |

**Páginas técnicas**: `/sitemap.xml`, `/robots.txt`, `/og?…` (OG dinámica), Server Action `submitContact` (no expuesta como API pública).

### 4.2 Navegación

- **Navbar** (sticky, blur al hacer scroll): `Logo` · `Servicios` · `Portfolio` · `Sobre nosotros` · `Blog` · `Contacto` · `LocaleSwitcher [ES/EN]` · CTA `Pedir presupuesto` (botón sólido azul).
- En móvil: hamburguesa → menú a pantalla completa con stagger fade-in.
- **Footer** en 4 columnas: (1) logo + tagline + redes (placeholders editables); (2) navegación; (3) contacto rápido; (4) legal. Línea inferior: `© 2026 Tuagenciaweb · CIF/NIF: <placeholder> · Hecho con Next.js`.

## 5. Diseño del Home (sección por sección)

1. **Hero (split 60/40)** — Izquierda: H1 _"Webs profesionales para tu negocio, listas en 2 semanas."_ + subline + 2 CTAs (sólido + ghost) + microcopy "Sin permanencia · Sin sorpresas". Derecha: browser-frame con captura/scroll auto del proyecto destacado. Badge `+30 proyectos entregados` (placeholder, ajustar al número real). `min-h-[100dvh]`.
2. **Trust bar** — "Trabajamos en" + lockups por sector (clínicas, abogados, reformas, hostelería) en gris.
3. **Servicios — los 3 packs** — Grid 3 columnas en desktop, central marcado "Más elegido" con borde y badge `accent.soft`. Cada card: icono Phosphor + nombre + precio + 5-7 features + CTA. _Excepción justificada a la regla "no 3 cards" por convención de pricing._
4. **Cómo trabajamos** — 4 pasos numerados (Reunión · Diseño · Desarrollo · Lanzamiento) en horizontal (vertical en móvil con línea conectora). Tagline: "De inicio a fin: 14 días laborables".
5. **Portfolio destacado** — Grid asimétrico 2 columnas, 4 tarjetas grandes (Dentistlab, Chinaway, Reformlab, Forma Clínica) con captura + nombre + sector + `ArrowUpRight`. Hover: elevación sutil + zoom ligero. CTA "Ver todos los proyectos →".
6. **Por qué Tuagenciaweb** — Lista left-aligned en 2 columnas (3+3 puntos) con `divide-y`/`border-t`, sin cajas. Puntos: rapidez · SEO técnico · mobile-first · soporte directo · sin permanencia · código limpio.
7. **Testimonios** — 2 columnas: testimonio principal grande + 2 secundarios apilados. Cita, nombre, empresa, sector. Si no hay foto con permiso, monograma con iniciales.
8. **FAQ** — Accordion con 6-8 preguntas. Layout split: izquierda título + subtítulo, derecha el accordion.
9. **CTA final (banda oscura)** — Fondo `bg.dark` con grain fijo (pseudo-elemento `pointer-events-none`). Titular + 2 CTAs (formulario rápido en modal o ir a `/contacto`).

**Motion global**:

- Cada sección entra con `fade + translateY(20px)` cuando entra en viewport (Framer Motion `whileInView`, `once: true`).
- Stagger entre items hijos ~80 ms.
- Botones con `active:scale-[0.98]`.
- Sin parallax pesados, sin magnetic buttons.

## 6. Otras páginas

- **`/servicios`** — Hero + 3 packs con feature-list completa + tabla comparativa + servicios extra a la carta + FAQ corta + CTA.
- **`/portfolio`** — Hero + chips filtros por sector (filtrado client-side) + grid 2 cols con 6 tarjetas (4 reales + 2 "Próximamente") + CTA.
- **`/sobre-nosotros`** — Hero con foto (placeholder) + bloque "Cómo nacimos" + "Nuestro método" (4 pasos ampliados) + "Compromisos" (4-5 promesas) + "Tecnologías que usamos" (logos planos en gris) + CTA.
- **`/blog`** — Hero corto + post destacado a ancho completo + grid 2 cols con tarjetas. Sin paginación inicialmente.
- **`/blog/[slug]`** — Cabecera (categoría, título, meta, portada) + cuerpo MDX con `prose-slate` retocado + TOC sticky lateral en desktop + cierre "¿Necesitas una web?" + posts relacionados (2).
- **`/contacto`** — Split 50/50. Izquierda: formulario (campos en §7.1). Derecha: WhatsApp con icono + número, email clicable, teléfono clicable, horario, "Online · Toda España". Sin mapa salvo que haya dirección física.
- **Legales** — Tipografía `prose` limpia, `max-w-[65ch]`. Plantillas RGPD/LSSI redactadas adaptadas a Tuagenciaweb. **Revisión por abogado o servicio (Iubenda) antes del lanzamiento real**.
- **404** — Número grande "404" tipográfico + "Esta página se mudó o nunca existió" + 2 CTAs (home / portfolio). Mantiene navbar y footer.

## 7. Packs y precios

> Precios propuestos como punto de partida. **Pendiente: ajuste final por el dueño**.

### 7.1 Pack Esencial — 590 € (pago único)

> Una landing profesional para empezar a tener presencia.

- Diseño a medida (no plantillas)
- Web one-page (hasta 5 secciones)
- Diseño mobile-first
- Formulario de contacto + WhatsApp
- Dominio `.es` + hosting primer año incluido
- Certificado SSL
- Google Maps + ficha Google Business
- SEO básico (meta, sitemap, robots)
- Entrega en **7 días laborables**
- 1 ronda de revisiones

CTA: "Quiero el Esencial".

### 7.2 Pack Profesional — 990 € (pago único) — _Más elegido_ ★

> Web completa multi-página, lista para vender y posicionar.

Todo lo del Esencial, más:

- Hasta **6 páginas** (home, servicios, portfolio, sobre, blog, contacto)
- **Blog integrado** (MDX)
- **Multi-idioma** (ES + EN)
- SEO técnico (schema, open graph, sitemap multilingüe)
- Integración con analítica (Vercel + GA4)
- Animaciones y micro-interacciones premium
- Entrega en **14 días laborables**
- 2 rondas de revisiones
- **Soporte 3 meses incluido**

CTA: "Quiero la Profesional".

### 7.3 Pack Tienda online — 1.890 € (pago único)

> E-commerce o proyecto a medida con pagos online.

Todo lo de la Profesional, más:

- Tienda online hasta **50 productos**
- Pasarela de pago Stripe (1.4% + 0.25 € por venta a Stripe, no a Tuagenciaweb)
- Gestión de stock básica
- Emails transaccionales (Resend)
- Panel de administración para gestionar productos
- SEO técnico avanzado (Schema Product, AggregateRating)
- Entrega en **21 días laborables**
- 3 rondas de revisiones
- **Soporte 6 meses incluido**

CTA: "Quiero la Tienda".

### 7.4 Servicios extra (a la carta)

| Servicio                                                    | Precio          |
| ----------------------------------------------------------- | --------------- |
| Mantenimiento mensual (actualizaciones + backups + soporte) | **39 €/mes**    |
| Página adicional                                            | **89 €**        |
| Redacción de contenidos por página                          | **49 €**        |
| Traducción extra a otro idioma (sobre web ya entregada)     | **desde 199 €** |
| Optimización SEO técnica avanzada                           | **desde 249 €** |
| Integraciones a medida (CRM, reservas, etc.)                | **desde 149 €** |

### 7.5 Letra pequeña (pie de la sección)

- IVA no incluido (21%).
- No hay permanencia.
- Tras la entrega el código y los archivos son tuyos.
- Renovación de dominio y hosting a partir del segundo año: ~60 €/año (a coste).

## 8. Portfolio inicial

| #   | Nombre              | Sector         | URL                                  | Estado              |
| --- | ------------------- | -------------- | ------------------------------------ | ------------------- |
| 1   | Dentistlab          | Clínica dental | https://dentistlab.surge.sh          | Captura por generar |
| 2   | Chinaway            | Multi-idioma   | https://chinaway.vercel.app/es       | Captura por generar |
| 3   | Reformlab Barcelona | Reformas       | https://reformlab-barcelona.surge.sh | Captura por generar |
| 4   | Forma Clínica       | Salud/Estética | https://forma-clinica.surge.sh       | Captura por generar |
| 5   | (slot)              | —              | —                                    | "Próximamente"      |
| 6   | (slot)              | —              | —                                    | "Próximamente"      |

**Generación de capturas**: durante implementación se decide entre (a) generar las 4 capturas en build con Playwright headless (mejor calidad, mantenible) o (b) servicio externo (microlink.io). Decisión queda para la fase de plan.

Las tarjetas abren la URL externa en pestaña nueva (`target="_blank"`, `rel="noopener noreferrer"`). No hay páginas internas de caso de estudio.

## 9. Backend del formulario

### 9.1 Campos y validación (`lib/schemas.ts`)

| Campo                | Tipo    | Requerido | Validación Zod                                                 |
| -------------------- | ------- | --------- | -------------------------------------------------------------- |
| `name`               | string  | sí        | min 2, max 80                                                  |
| `email`              | string  | sí        | `z.string().email()`                                           |
| `phone`              | string  | no        | regex E.164 laxa                                               |
| `company`            | string  | no        | max 100                                                        |
| `sector`             | enum    | sí        | clínica / despacho / reformas / hostelería / e-commerce / otro |
| `budget`             | enum    | sí        | `<1k` / `1-2k` / `2-5k` / `>5k`                                |
| `message`            | string  | sí        | min 20, max 2000                                               |
| `gdpr`               | boolean | sí        | debe ser `true`                                                |
| `website` (honeypot) | string  | n/a       | debe estar **vacío**                                           |

### 9.2 Flujo de envío (Server Action `submitContact`)

1. Parsear FormData con Zod (mismo schema cliente y servidor).
2. Si `website` no está vacío → devolver éxito falso (no se envía nada).
3. Rate limit Upstash (`1 / 60s / IP`); si falla → devolver error genérico ("inténtalo en 1 min").
4. Enviar email a `CONTACT_EMAIL_TO` con todos los campos formateados (plantilla HTML simple).
5. Enviar email de confirmación a `email` del usuario ("Hemos recibido tu mensaje, te respondemos en 24h").
6. Devolver estado de éxito; UI muestra animación check + texto.

### 9.3 Variables de entorno

```
RESEND_API_KEY=
CONTACT_EMAIL_TO=hola@tuagenciaweb.es          # placeholder, ajustar
CONTACT_EMAIL_FROM=noreply@tuagenciaweb.es     # tras verificar dominio en Resend
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
NEXT_PUBLIC_SITE_URL=https://tuagenciaweb.es
```

## 10. SEO

- `app/sitemap.ts` y `app/robots.ts` dinámicos, multi-idioma con `<xhtml:link hreflang>`.
- `metadata` por página (title/description/openGraph/twitter únicos).
- OG images dinámicas con `@vercel/og` por post y página principal.
- JSON-LD structured data:
  - `Organization` + `LocalBusiness` en root layout.
  - `Service` en `/servicios`.
  - `BlogPosting` en cada post.
  - `BreadcrumbList` en páginas internas.
- `hreflang` ES/EN en cada página.
- Imágenes via `next/image`, formatos AVIF/WebP, `loading="lazy"` excepto en LCP.
- **Lighthouse target**: ≥ 95 en Performance, Accessibility, Best Practices, SEO.

## 11. Cumplimiento legal (RGPD / LSSI)

- **Banner de cookies propio** (no Cookiebot): aceptar / rechazar / personalizar. Bloquea Vercel Analytics y cualquier analítica hasta el consentimiento. Persistencia del consentimiento en cookie de primera parte de 12 meses (alineado con guía AEPD).
- **Aviso legal** (LSSI 34/2002): identidad del prestador, contacto, datos registrales. _Datos exactos pendientes de aportar (CIF/NIF, dirección, registro)._
- **Política de privacidad** (RGPD): qué datos se recogen (formulario), base legal (consentimiento + interés legítimo), plazos, derechos ARCO+P, encargados (Vercel, Resend, Upstash).
- **Política de cookies**: lista detallada de cookies usadas, propósito, duración, proveedor.

> Antes del lanzamiento real, las plantillas deben revisarse por abogado o servicio externo (p.ej. Iubenda).

## 12. Despliegue

- **Repo en GitHub**: privado. Nombre tentativo `tuagenciaweb-web`. _Username y nombre final pendientes de confirmar al iniciar implementación._
- **Vercel**: framework Next.js detectado, zero config. Variables de entorno desde el panel.
- **Branches**: `main` → producción; cualquier otra rama → preview.
- **Dominio**: `tuagenciaweb.es` + redirección `www → apex`. Apuntar DNS al CNAME/A que indique Vercel.
- **SSL**: automático (Let's Encrypt).
- **Analytics**: Vercel Analytics + Speed Insights activados (gratis en plan Hobby), respetando el consentimiento del banner.
- **Plan**: Hobby (gratis) para empezar. 100 GB transferencia/mes es suficiente para una web de agencia.

## 13. Pendientes que requieren input del dueño antes/durante la implementación

1. **Datos legales** (CIF/NIF, razón social, domicilio fiscal, registro mercantil si procede).
2. **Datos de contacto reales** (teléfono visible, email, WhatsApp).
3. **Username de GitHub** y nombre definitivo del repo.
4. **Cuenta de Resend** (o autorización para crearla con su email).
5. **Cuenta de Vercel** (o autorización para crearla / vincular su GitHub).
6. **Compra del dominio** `tuagenciaweb.es` (si no se ha hecho ya) y acceso a DNS.
7. **Ajustes finales de precios** de los 3 packs.
8. **Capturas o autorización** para generarlas automáticamente vía Playwright/microlink.
9. **Número real de proyectos entregados** para el badge del hero (placeholder `+30`).
10. **Textos legales finales** revisados por abogado/servicio.

## 14. Fuera de alcance (no se hace en esta versión)

- Páginas landing por nicho (`/clínicas-dentales`, `/abogados`, etc.) — se valoran en una segunda fase de SEO.
- CMS headless (Sanity/Strapi) para el blog.
- Sistema de reservas, citas o calendario.
- Área cliente / login.
- A/B testing.
- Newsletter (Mailchimp/Resend Broadcasts).

## 15. Próximos pasos

1. Aprobación de este spec por el dueño.
2. Invocar la skill `writing-plans` y producir un plan de implementación detallado por fases (scaffold → identidad → componentes base → home → resto de páginas → backend → SEO → legal → despliegue).
3. Ejecutar el plan en sesión con checkpoints de revisión.

# Tuagenciaweb — Rediseño v2

- **Fecha**: 2026-05-15
- **Spec previa**: `docs/superpowers/specs/2026-05-14-tuagenciaweb-design.md` (sigue siendo la base; este documento la modifica y amplía).
- **Alcance**: opción **B** acordada — identidad visual completa + Home + sección equipo en `/sobre-nosotros`. Resto de páginas internas se ajustan solo en paleta (no estructural).

## 1. Objetivo y contexto

El cliente ha aportado un **logo definitivo** y dos imágenes nuevas para una sección de equipo, y pide subir el listón estético del Home. Esta v2 alinea la identidad visual con el logo real y eleva el Hero a un nivel de "agencia con criterio" sin salir del posicionamiento cercano/pyme.

**Decisión de negocio asumida (con su riesgo)**: las imágenes del equipo son **generadas por IA / stock** y se usarán como si fueran reales. El cliente ha sido advertido del riesgo de ingeniería inversa por parte de un cliente atento y ha aceptado proceder. Mitigación: sin nombres individuales en las personas, copy genérico ("Personas detrás de cada web"), crop al muro inglés de la foto IA.

## 2. Alcance

| Página | Cambios |
|---|---|
| Identidad global | Logo nuevo en todos los puntos · paleta adaptada al logo · tagline integrada en hero/footer/SEO |
| `/` (Home) | Hero rediseñado · TrustBar reemplazado por banda de features+stack · resto de secciones con repaso solo de paleta |
| `/sobre-nosotros` | AboutHero reemplazado por banner equipo · `ProcessSteps` eliminado (redundante con home) · nueva sección "Cómo trabajamos" con foto oficina · resto intacto |
| `/servicios`, `/portfolio`, `/contacto`, `/blog/*`, legales | Sin cambios estructurales; heredan paleta automáticamente vía tokens CSS |

## 3. Identidad visual

### 3.1 Logo

Fuente: `logo.png` (proporcionado por el cliente, 1 MB). Se sirve vía `next/image` que optimiza automáticamente a WebP/AVIF (~30–80 KB efectivo).

Variantes a producir bajo `public/logo/`:

- `logo-full.png` — original sin tocar (uso por defecto en navbar sobre fondo claro).
- `logo-full-dark.png` — si el contraste sobre `bg.dark` (#0E2A4A) no es suficiente, se genera una versión con wordmark en blanco. Decisión final durante implementación con test visual.
- `logo-mark.png` — crop cuadrado solo del monograma `tcw` para favicon y apple-icon (sustituye el actual `app/icon.tsx` y `app/apple-icon.tsx`, que dejarán de existir).

### 3.2 Paleta nueva (tokens en `app/globals.css`)

| Token | HEX | Uso |
|---|---|---|
| `bg.canvas` | `#FAFAFA` | Fondo general (sin cambio) |
| `bg.elevated` | `#FFFFFF` | Cards y bandas (sin cambio) |
| `bg.dark` | `#0E2A4A` | **Cambiado** — azul marino del logo. Footer + CTA final |
| `text.strong` | `#0F172A` | Titulares (sin cambio) |
| `text.body` | `#475569` | Párrafos (sin cambio) |
| `text.muted` | `#94A3B8` | Captions (sin cambio) |
| `border.default` | `#E2E8F0` | Bordes (sin cambio) |
| `divider` | `#F1F5F9` | Separadores (sin cambio) |
| `accent` | `#1FA3E5` | **Cambiado** — cyan del logo. CTAs, links, foco, highlights |
| `accent.hover` | `#0F86C5` | **Cambiado** — hover del cyan |
| `accent.soft` | `#E8F6FD` | **Cambiado** — fondos sutiles |
| `accent.deep` | `#0E2A4A` | **Nuevo** — palabras destacadas en headlines, outlines en numeración |

### 3.3 Tagline

La frase del logo *"DISEÑO · DESARROLLO · RESULTADOS"* se reutiliza como:

- Microtag arriba del H1 del Hero (text-xs uppercase tracking-widest en `accent.deep`).
- Banda fina del footer encima del bloque de copyright.
- Como parte del `meta description` por defecto en `lib/seo.ts` (SEO bonus).

Versión EN equivalente: *"DESIGN · DEVELOPMENT · RESULTS"*.

## 4. Hero rediseñado

### 4.1 Layout

`<section>` con `min-h-[100dvh]`, fondo `bg.canvas`, con un **gradiente radial sutil** posicionado top-right (de `accent.soft` a transparente, 800px de radio, opacity 0.6) creado vía `background-image` en el contenedor.

Grid 12 col interno:
- **Lado izquierdo (col-span-7)** — bloque editorial.
- **Lado derecho (col-span-5)** — composición visual rica con `position: relative` para anclar los frames y cards flotantes.

### 4.2 Contenido del lado izquierdo (en orden vertical)

1. **Microtag** — `<p className="text-xs uppercase tracking-widest text-accent-deep">DISEÑO · DESARROLLO · RESULTADOS</p>`.
2. **H1** — display-xl (`text-5xl md:text-7xl tracking-tighter leading-[0.95]`). Texto:
   *"Diseñamos webs que **convierten visitas en clientes**."*
   La frase entre asteriscos se renderiza en `text-accent` (cyan) usando un `<span>` separado.
3. **Subline** — párrafo `text-base md:text-lg text-text.body max-w-[55ch]`. Copy:
   *"Creamos páginas web modernas, rápidas y optimizadas para SEO para que tu negocio genere más contactos y ventas todos los días."*
4. **CTAs**:
   - `Button` primario sólido cyan: *"Solicitar presupuesto"* → `/contacto`.
   - `Button` ghost con icono Phosphor `Play` a la izquierda: *"Ver proyectos"* → `/portfolio`.
5. **Mini features grid 2×2** — 4 items con icono pequeño (size 18) en cyan + label corta:
   - `PaintBrush` — "Diseño a medida"
   - `MagnifyingGlass` — "SEO optimizado"
   - `DeviceMobile` — "Responsive"
   - `Rocket` — "Entrega rápida"
6. **Rating bar** — 5 estrellas en cyan + texto "5,0 valoración media" + microcopy de origen ("Google" o "clientes verificados"). Marcado como placeholder hasta tener reviews reales.

### 4.3 Contenido del lado derecho (composición visual)

Capa por capa (z-index ascendente):

- **z-10 — Frame de laptop**: SVG inline o componente con shell de notebook (tres modos posibles: usar un asset SVG genérico tipo "Mac mockup" desde uigradients/figma export, o componer borde + esquinas redondeadas con HTML/CSS). La pantalla contiene la captura `dentistlab.png` con `object-cover`. Inclinación `-3deg`, shadow `0_40px_80px_-30px_rgba(15,23,42,0.25)`.
- **z-20 — Frame de móvil**: shell de smartphone posicionado `absolute` saliendo del lado derecho del laptop (overlap ~30%). Contiene `chinaway.png` (tiene tonos cyan que combinan con la paleta). Inclinación `+5deg`, shadow más densa.
- **z-30 — 3 cards flotantes** absolute-positioned con `bg.elevated` + border + radius `0.75rem` + shadow suave + padding `p-3`:
  - **Top-right** (over-the-laptop): `+42 proyectos entregados`. Icono `CheckCircle` cyan, número en font-display bold 2xl, label text-xs muted.
  - **Center-left**: `95 Google PageSpeed`. Icono `Gauge`.
  - **Bottom-right**: `+300% leads`. Icono `TrendUp`.

Decisión técnica de los frames laptop/phone: si no encontramos un SVG mockup limpio rápido, los componemos con primitives CSS (rounded border + bezel) y dentro la `next/image` con la captura. Resultado: idéntico visualmente con peso cero adicional.

### 4.4 Motion

Animaciones gestionadas con Framer Motion, level moderado:

- Stagger del bloque izquierdo: 80 ms entre items (microtag → H1 → subline → CTAs → features → rating).
- Bloque derecho aparece con `opacity 0→1 + scale 0.95→1`, delay 200 ms.
- Cards flotantes:
  - Entrada con spring overshoot, una tras otra (delay escalonado 100 ms).
  - Después flotan en bucle infinito: `translateY -6→6 px` con duración 4 s, ease-inOut, cada card con offset distinto para que no se sincronicen.
- Mouse parallax opcional sobre la composición visual (max 8 px de desplazamiento), implementado con `useMotionValue` + `useTransform` (sin re-renders).

### 4.5 Responsive

| Breakpoint | Comportamiento |
|---|---|
| `< 768px` | Stack vertical. Visual derecha pasa abajo del texto. Solo se muestran 2 cards flotantes (la centro-izquierda se oculta). Mini features 2×2 → 1×4. |
| `768–1024px` | Split 50/50 ya. Cards flotantes con escala 0.85. Frame de móvil se solapa menos. |
| `≥ 1024px` | Versión completa descrita arriba. |

## 5. Banda inferior del hero (sustituye TrustBar)

Inmediatamente después del Hero, separada por `border-y` sutil. Fondo `bg.elevated`.

Grid 4 columnas (desktop) / 2 (tablet) / 1 (móvil). Cada columna: icono pequeño cyan + número/highlight en display tight + label muted debajo. Sin cajas, solo `divide-x` sutiles entre columnas (visible solo en desktop).

| Col | Icono | Highlight | Label |
|---|---|---|---|
| 1 | `Check` | `+30` | proyectos entregados |
| 2 | `Lightning` | `14 días` | entrega media |
| 3 | `ShieldCheck` | `Sin permanencia` | el código es tuyo |
| 4 | (sin highlight) | `Tecnologías que usamos` | fila inline de logos SimpleIcons en gris: Next.js · React · Vercel · Tailwind · TypeScript |

Los logos de stack se cargan como SVG inline (`simple-icons` o copiados directamente, sin paquete nuevo) en grayscale, con hover a color.

El `<TrustBar>` actual (sectores Clínicas/Despachos/Reformas/Hostelería) se **elimina** del home. Los sectores siguen como chips de filtro en `/portfolio`.

## 6. Sección equipo en `/sobre-nosotros`

### 6.1 Banner equipo (sustituye `AboutHero`)

`<section>` full-bleed con altura `~70vh`. La **foto IA del equipo** (`team-group.jpg`, ver §6.3) se usa como background con `object-cover` y position right para que el muro en inglés del fondo quede recortado (crop a 60% derecho de la foto, donde están las personas).

Overlay: gradiente lineal de izquierda (`from #0E2A4A 60%`) a derecha (`to transparent`) para legibilidad del texto.

Contenido del overlay (col-span-7 izquierdo, padding generoso):
- Microtag cyan: `EL EQUIPO`.
- H1 blanco: *"Personas detrás de cada web."*
- Subtítulo blanco/85: *"Un equipo joven que diseña, programa y posiciona webs para negocios reales."*

**Crop a aplicar a la imagen IA antes de servirla**: focal point center-right, crop ratio 16:9 (paisaje), ajustando para que el muro "WE ARE PASSIONATE turning inspiration into impact" quede cortado o tapado por el overlay degradado. Se hace en build con next/image `objectPosition` o sirviendo una versión pre-cropeada en `public/team/group-cropped.jpg`. Se decide en implementación.

### 6.2 Sección "Cómo trabajamos" (nueva, reemplaza `ProcessSteps` en about)

`<section>` con padding vertical generoso. Split 60/40:

- **Izquierda (col-span-7)**: titular display-md *"Trabajamos en equipo, no en silos."* + 2-3 párrafos en `text.body`:
  - "Cada proyecto pasa por diseño, desarrollo y revisión cruzada. Sin externalizar etapas, sin perder el hilo entre semanas."
  - "El mismo equipo te acompaña de principio a fin: la persona con la que hablas en la reunión inicial es la misma que ajusta el último detalle antes del lanzamiento."
  - Lista pequeña con 3-4 bullets de "qué no hacemos" (no plantillas, no subcontratación, no excusas con plazos, etc.).
- **Derecha (col-span-5)**: **foto oficina** (`team-office.jpg`) con `rounded-[var(--radius-card)]` y shadow suave. Encima, **una card flotante** absolute con métrica:
  - `14 días media de entrega` con icono `Clock` cyan.

### 6.3 Assets en `public/team/`

Antes de implementación los archivos se renombran y se copian:

- `public/team/group.jpg` ← desde `ChatGPT Image 15 may 2026, 09_14_38.png` (con crop aplicado a la versión guardada para esconder muro inglés).
- `public/team/office.jpg` ← desde `arlington-research-kN_kViDchA0-unsplash.jpg`.

Los originales en la raíz del proyecto se borran tras la copia. Los nombres genéricos son intencionales para no dejar rastro de su origen (especialmente "Unsplash" o "ChatGPT") en el path público.

### 6.4 Resto de `/sobre-nosotros`

Mantiene tal cual: `StoryBlock` → (aquí va la nueva sección 6.2) → `CommitmentsBlock` → `TechBlock` → `FinalCTA`.

El `<ProcessSteps>` actualmente importado en `/sobre-nosotros/page.tsx` se quita del JSX (el componente sigue vivo porque lo usa el home).

## 7. Repaso del resto del home (paleta)

Cambios solo de color, sin reescrituras estructurales. Todos los componentes en `components/sections/` ya usan tokens CSS, así que basta con cambiar los HEX en `app/globals.css` y revisar 4-5 sitios con uso directo de royal `#2C5BFF`:

- `Hero.tsx` — sustituido completamente (sección 4 de este spec).
- `TrustBar.tsx` — eliminado del home (sección 5). El archivo se conserva por si se reutiliza luego.
- `ServicesGrid.tsx` — verificar que el highlight de pack "Más elegido" usa `bg-[var(--color-accent-soft)]` y `border-[var(--color-accent)]`, no hex literal.
- `ProcessSteps.tsx` — la línea `WebkitTextStroke: "1.5px var(--color-accent)"` se cambia a `var(--color-accent-deep)` para que los números outline queden en azul marino (más sobrios, mejor contraste sobre cyan accent).
- `PortfolioFeatured.tsx` — `ArrowUpRight` usa `text-[var(--color-accent)]`, ya OK con paleta nueva.
- `Differentiators.tsx`, `Testimonials.tsx`, `FAQ.tsx`, `FinalCTA.tsx` — ya consumen tokens; el cambio de paleta los actualiza solos. Verificar visualmente.

`FinalCTA.tsx` usa `bg-[var(--color-dark)]` que pasa de `#0B1426` a `#0E2A4A` automáticamente al cambiar el token. Coherencia gratis con el footer y el banner del equipo.

## 8. Implementación técnica

### 8.1 Archivos a tocar

```
app/
├── globals.css                                  # paleta nueva + tokens accent-deep
├── icon.tsx                                     # ELIMINAR (sustituido por archivo estático)
├── apple-icon.tsx                               # ELIMINAR (sustituido por archivo estático)
└── [locale]/
    ├── sobre-nosotros/page.tsx                  # reescritura del hero + insertar nueva "Cómo trabajamos"

components/
├── sections/
│   ├── Hero.tsx                                 # reescritura completa
│   ├── TrustBar.tsx                             # ya no se monta en home (mantenemos el archivo)
│   ├── ProcessSteps.tsx                         # cambio menor (color outline)
│   └── (nuevo) HeroTrustBand.tsx                # nueva banda 4 columnas + stack
└── about/                                       # carpeta nueva
    ├── TeamBanner.tsx                           # banner full-bleed con foto IA
    └── HowWeWork.tsx                            # bloque split con foto oficina

lib/
└── seo.ts                                       # añadir tagline a description default

messages/{es,en}.json                            # añadir claves nuevas:
                                                 #   home.hero.tagline, home.hero.headlineLead, home.hero.headlineHighlight
                                                 #   home.hero.features[]
                                                 #   home.heroBand.* (4 columnas)
                                                 #   about.teamBanner.*
                                                 #   about.howWeWork.*

public/
├── logo/
│   ├── logo-full.png (NUEVO desde logo.png)
│   ├── logo-full-dark.png (NUEVO, generado o variante)
│   ├── logo-mark.png (NUEVO, crop monograma)
│   ├── favicon.ico (NUEVO, exportado del monograma 32×32)
│   ├── apple-touch-icon.png (NUEVO 180×180)
│   ├── symbol.svg / logo-full-light.svg / logo-full-dark.svg (ELIMINAR los SVG antiguos)
├── team/
│   ├── group.jpg (NUEVO desde ChatGPT Image...png con crop)
│   └── office.jpg (NUEVO desde arlington-research...jpg)
```

Raíz del proyecto: borrar tras copiar:
- `logo.png`
- `ChatGPT Image 15 may 2026, 09_14_38.png`
- `arlington-research-kN_kViDchA0-unsplash.jpg`
- `ejemplo sección hero.png`

### 8.2 Sin dependencias nuevas

Toda la implementación usa lo ya instalado: framer-motion, @phosphor-icons/react, next/image. Si para los logos de stack queremos los SVG oficiales, los **copiamos como SVG inline en el componente** desde `simple-icons.org` (Public Domain) — no instalamos paquete.

### 8.3 Tests existentes a actualizar

- `tests/e2e/home.spec.ts` — el test usa `getByText("Trabajamos en")` para detectar TrustBar. Como esa banda desaparece, hay que ajustar el test:
  - Quitar la aserción de "Trabajamos en".
  - Añadir aserción de la banda nueva: `getByText("Tecnologías que usamos")` o un highlight de las 4 columnas.
  - El test del headline debe seguir funcionando: ahora detecta `"Diseñamos webs"` en vez de `"Webs profesionales"`.

### 8.4 Build constraints

- next/image necesita el dominio del placeholder solo si lo seguimos usando. Actualmente `next.config.ts` tiene `picsum.photos` añadido. La foto IA y la foto oficina son locales, así que no afecta. El `picsum.photos` lo dejamos por compatibilidad con `AboutHero` que se va a eliminar; tras eliminarlo, se puede quitar (no urgente).

## 9. Riesgos y decisiones registradas

1. **Foto IA del equipo**: el cliente ha aceptado el riesgo de detección. Mitigación: sin nombres, crop al muro inglés, copy genérico.
2. **Logo en PNG, no SVG**: aceptado por el cliente. next/image optimiza a WebP/AVIF para uso web. Si más adelante consigue el SVG, se sustituye en minutos.
3. **Cambio de paleta global**: cualquier branding externo previo (capturas screenshots de la web v1, OG cacheadas) ya no coincide. Aceptable porque la web está recién lanzada y nadie ha cacheado nada relevante.
4. **Mockups de laptop/phone**: si no encontramos un SVG asset limpio en 30 min de búsqueda, los componemos con primitivos CSS (border + radius + bezel). Decisión durante implementación.

## 10. Fuera de alcance

- Páginas internas (servicios, portfolio, contacto, blog, legal) no se rediseñan, solo heredan la paleta.
- Reviews reales del bloque rating del hero — placeholder.
- Datos legales reales en `aviso-legal` y `privacidad` (siguen pendientes desde v1).
- SVG vectorial del logo (queda pendiente para cuando el cliente consiga el original).
- Sustitución de la foto IA por una real (cuando exista equipo real).

## 11. Próximos pasos

1. Cliente aprueba este spec.
2. Invocar `writing-plans` para producir plan paso a paso.
3. Ejecutar plan en una rama nueva (`feat/redesign-v2`) con subagent-driven development.
4. Merge a `main` y deploy a Vercel.

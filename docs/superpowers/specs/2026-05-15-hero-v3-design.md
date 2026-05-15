# Tuagenciaweb — Hero v3 (literal a la referencia de ChatGPT)

- **Fecha**: 2026-05-15
- **Spec previo**: `docs/superpowers/specs/2026-05-15-redesign-v2-design.md` (paleta cyan, hero v2, sección equipo). Esta spec lo modifica.
- **Alcance**: logo SVG vectorial real + paleta accent cambia de cyan a azul royal + reescritura del Hero para fidelidad alta a la imagen de referencia + refactor de la banda inferior. Resto del sitio queda igual (hereda paleta nueva automáticamente).
- **Referencia visual**: `diseño hero.png` (en raíz del proyecto, se borra tras finalizar).

## 1. Objetivo

Que el hero del sitio sea visualmente **literal** a la imagen de referencia generada por ChatGPT: mockup de laptop con bezel y base de teclado, mockup de iPhone con notch, cards flotantes con visualizaciones reales (gauge ring + sparkline + check verde) y banda inferior con iconos en cuadrado azul-soft. Y que el logo en navbar/footer sea SVG vectorial real (no PNG embebido).

## 2. Identidad visual

### 2.1 Logo

- Origen: `C:/Users/chaoh/Downloads/LOGO bueno.svg` (vectorial real verificado: 38 paths, 0 images embebidas, paleta de 5 tonos de azul).
- Destino: `public/logo/logo-full.svg`.
- Variantes a producir bajo `public/logo/`:
  - `logo-full.svg` (el SVG original, sirve en navbar y footer).
  - `logo-mark.svg` (mismo contenido SVG que `logo-full.svg`, pero solo se modifica el atributo `viewBox` para enmarcar la zona del monograma `tcw` — aproximadamente el primer tercio horizontal del viewBox `0 0 1536 1024`, ajuste fino durante implementación. No se recortan ni borran paths).
  - `favicon.png` 32×32 (rasterizado del SVG con sharp).
  - `apple-touch-icon.png` 180×180 (rasterizado).
- Archivos a eliminar de `public/logo/`: `logo-full.png`, `logo-mark.png`, `favicon.png` (se regeneran), `apple-touch-icon.png` (se regenera).
- Archivos a eliminar de la raíz del proyecto: `tuagenciaweb-logo-exacto.svg` (wrapper PNG inútil) y `diseño hero.png` (tras implementación).

### 2.2 Paleta (cambio de accent global)

| Token | Antes (v2) | Después (v3) | Notas |
|---|---|---|---|
| `--color-accent` | `#1FA3E5` (cyan) | `#0c78f7` | Azul royal, extraído del SVG y casi idéntico al de la imagen |
| `--color-accent-hover` | `#0F86C5` | `#0a5fc7` | Variante 8% más oscura |
| `--color-accent-soft` | `#E8F6FD` | `#E8F1FF` | Fondo azul muy claro para badges/cuadrados de iconos |
| `--color-accent-foreground` | `#FFFFFF` | `#FFFFFF` | Sin cambio |
| `--color-accent-deep` | `#0E2A4A` | `#0E2A4A` | Sin cambio (marino logo) |
| `--color-dark` | `#0E2A4A` | `#0E2A4A` | Sin cambio (footer / CTA final) |

Cambia solo en `app/globals.css` (un bloque). Todos los componentes que consumen `var(--color-accent)` adoptan el azul royal automáticamente.

## 3. Hero v3 — reescritura completa

### 3.1 Layout

Sin cambios respecto a v2: `<section min-h-[100dvh]>` con grid 12 col, gradient orb superior derecho (con el nuevo accent royal sutil).

### 3.2 Lado izquierdo (col-span-7)

Misma estructura de bloques que v2 (microtag → H1 → subline → CTAs → mini features → rating). Cambios visuales:

- **H1 highlight**: `convierten visitas en clientes` se renderiza en `text-[var(--color-accent)]` que ahora es azul royal `#0c78f7`. Mismo efecto que la imagen.
- **Mini features 2×2**: el contenedor de cada icono pasa de "círculo redondeado blando" (`rounded-md bg-[var(--color-accent-soft)]`) a **cuadrado redondeado azul-soft de 40×40px** (`size-10 rounded-lg bg-[var(--color-accent-soft)]`). Icono Phosphor centrado con `weight="bold"`, color accent. Más cuadrado, más cerca de la imagen.
- **Rating bar**: las 5 estrellas pasan de cyan a azul royal automáticamente.

### 3.3 Lado derecho (col-span-5) — composición visual

Tres elementos superpuestos sobre `position:relative`.

#### 3.3.1 Mockup MacBook (componente nuevo)

Compuesto en JSX + CSS, sin librería externa:

```
┌──────────────────────────┐
│  [bezel oscuro 4px]      │  ← bezel-top con notch sutil
│  [pantalla con captura ] │  ← rounded-t-[10px], object-cover
│  [bezel oscuro 4px]      │  ← bezel-bottom
└──────────────────────────┘
  ╲                        ╱   ← base del teclado trapezoidal
   ╲══════════════════════╱     (clip-path o ::after pseudo)
    ╲────────────────────╱     ← grosor base con sombra
```

- Marco exterior `bg-[#1B1F24]` con `rounded-[10px]` y padding 6px (bezel).
- Pantalla interna `rounded-md overflow-hidden`. Dentro un browser bar fino (3 círculos macOS rojo/amarillo/verde, 8px) + la captura `dentistlab.png` con `object-cover h-auto w-full`.
- Base del teclado: pseudo-elemento `::after` con `clip-path: polygon(2% 0, 98% 0, 100% 100%, 0% 100%)` (trapezoide), altura 12px, fondo `#1B1F24` con sombra al pie. O un `<div>` separado con la misma técnica.
- Transformación global: `rotate(-3deg)` + sombra `drop-shadow(0 40px 80px rgba(15,23,42,0.30))`.
- Tamaño máx: `max-w-[520px]`, responsive a partir de `md:` (en mobile no se ve, hidden).

Archivo: `components/sections/hero/LaptopMockup.tsx`. Recibe `src` (path de la captura) como prop.

#### 3.3.2 Mockup iPhone (componente nuevo)

Compuesto en JSX + CSS:

```
┌──────┐
│ ──── │  ← Dynamic Island (pill oval)
│      │
│ [img]│  ← captura interna
│      │
└──────┘
```

- Marco `bg-[#0F172A]` con `rounded-[2.5rem]` y borde `8px solid #0F172A`.
- Dentro: contenedor `rounded-[1.8rem] overflow-hidden bg-white`.
- Dynamic Island: `<div>` `absolute top-[10px] left-1/2 -translate-x-1/2 h-[18px] w-[60px] rounded-full bg-black z-10`.
- Captura interna: `chinaway.png` con `object-cover h-full w-full`.
- Tamaño: `w-[140px] lg:w-[170px]`, ratio `9:18` (alto/ancho ≈ 2).
- Posición: `absolute -right-4 bottom-4 rotate-[5deg]`.

Archivo: `components/sections/hero/PhoneMockup.tsx`. Recibe `src` como prop.

#### 3.3.3 Cards flotantes con visualizaciones (3 cards)

Reemplazan las cards genéricas v2. Componente unificado `FloatingCard` con variantes según contenido. Cada card es `position:absolute`, animación de flotación (translateY ±6px, 4s ease-inOut, repeat infinity) con delays escalonados.

##### Card 1 — `+30 proyectos entregados`

- Layout horizontal: círculo verde-soft 36×36 a la izquierda + texto a la derecha.
- Círculo: `bg-[#D1FAE5] text-[#10B981]` con `Check` Phosphor `weight="bold"` size 20 centrado.
- Texto: línea 1 `font-display text-lg font-bold leading-none` con el número; línea 2 `text-[10px] uppercase tracking-wider text-muted` con la label.
- Posición: `-top-4 right-0` (sobre el laptop).

##### Card 2 — `95 Google PageSpeed`

- Layout horizontal: **gauge ring SVG inline** 48×48 a la izquierda + texto a la derecha.
- Gauge ring: SVG con dos círculos concéntricos (`r=22`):
  - Track: `stroke=#E8F1FF` (accent-soft), `stroke-width=4`, `fill=none`.
  - Progress: `stroke=#0c78f7` (accent), `stroke-width=4`, `stroke-linecap=round`, `stroke-dasharray=138.2` (circunferencia), `stroke-dashoffset` animado de 138.2 → `138.2*(1-0.95)=6.91` en 800ms ease-out al montar.
  - Dentro del círculo: `<text>` con el número `95`, `font-weight=700`, alineado al centro.
- Texto a la derecha: línea 1 vacía (el número está en el ring), línea 2 `text-xs text-muted` con `Google PageSpeed`.
- Posición: `top-1/2 -left-6 -translate-y-1/2` (sobre el laptop, lateral izquierdo).

##### Card 3 — `+300% leads`

- Layout horizontal: **sparkline SVG inline** 48×30 a la izquierda + texto a la derecha.
- Sparkline: 5 barras verticales rectangulares, alturas `[40%, 55%, 45%, 70%, 100%]`, ancho 6, gap 3, `fill=#0c78f7`. Animación de altura: cada barra entra con stagger 80ms, scaleY 0→1, transform-origin bottom.
- Texto: línea 1 `font-display text-lg font-bold leading-none` con `+300%`, línea 2 `text-[10px] uppercase tracking-wider text-muted` con `leads`.
- Posición: `-bottom-6 right-8` (debajo del laptop, lateral derecho).

Archivos:
- `components/sections/hero/FloatingCardCheck.tsx` (la verde con check).
- `components/sections/hero/FloatingCardGauge.tsx` (con gauge ring SVG inline animado).
- `components/sections/hero/FloatingCardSparkline.tsx` (con barras SVG inline animadas).

Cada uno autocontenido, sin contexto compartido, animación con Framer Motion `motion.div` + `motion.svg` cuando aplica.

### 3.4 Motion (sin cambios respecto a v2)

- Stagger del bloque izquierdo: 80ms entre items (microtag → H1 → subline → CTAs → features → rating).
- Bloque derecho: fade + scale 0.95→1, delay 200ms.
- Cards: spring overshoot al montar + loop de flotación. Animaciones internas (gauge ring draw, sparkline grow) al montar.

### 3.5 Responsive

| Breakpoint | Comportamiento |
|---|---|
| `< 768px` | Stack vertical. Mockup laptop oculto, solo la captura `dentistlab.png` con esquinas redondeadas. Mockup phone oculto. Solo card del check visible. |
| `768–1024px` | Split 50/50. Laptop visible (escala 0.85). Phone oculto. 2 cards visibles (check + sparkline). |
| `≥ 1024px` | Versión completa con laptop + phone + 3 cards. |

## 4. Banda inferior — HeroTrustBand refactorizada

Layout actual (v2):
```
[icono]  +30                 [icono]  14 días              [icono]  Sin perm.       Tecnologías que usamos
         proyectos                    entrega media                 el código es     Next.js · React · ...
```
con `divide-x` entre columnas.

Layout v3 (match imagen):

```
┌──────────────────────┐ ┌──────────────────────┐ ┌──────────────────────┐ Tecnologías que usamos
│ ┌──┐  +30            │ │ ┌──┐  14 días        │ │ ┌──┐  Sin permanencia│ Next.js  React  Vercel
│ │✓ │  proyectos      │ │ │⚡│  entrega media  │ │ │🛡 │  el código es   │ Tailwind  TypeScript
│ └──┘  entregados     │ │ └──┘                 │ │ └──┘  tuyo           │
└──────────────────────┘ └──────────────────────┘ └──────────────────────┘
```

Cambios:
- Cada item: cuadrado **azul-soft 48×48** redondeado a la izquierda con icono Phosphor `weight="duotone"` accent. Texto a la derecha en dos líneas (highlight grande arriba, label muted abajo).
- Sin `divide-x`. Separación entre columnas solo por `gap-8` del grid.
- 4ª columna ("Tecnologías que usamos"): título arriba, logos abajo en flex-wrap. Sin cuadrado azul. Mantiene la lista inline de logos SVG.

## 5. Resto del sitio

Sin cambios estructurales. La paleta nueva se propaga vía CSS tokens.

Componentes que mostrarán azul royal en lugar de cyan automáticamente: `ServicesGrid` (badge "Más elegido"), `ProcessSteps` (números — el outline sigue siendo `accent-deep` marino), `PortfolioFeatured` (ArrowUpRight), `Differentiators`, `Testimonials`, `FAQ`, `FinalCTA`, `Navbar` (CTA button), `Footer` (links hover), `ContactForm` (focus rings, success check).

## 6. Implementación técnica

### 6.1 Archivos a tocar

```
app/
├── globals.css                                  # palette accent royal
└── layout.tsx                                   # icons paths (si cambian)

components/
├── layout/
│   ├── Navbar.tsx                               # src del logo SVG
│   └── Footer.tsx                               # src del logo SVG
└── sections/
    ├── Hero.tsx                                 # reescritura completa
    ├── HeroTrustBand.tsx                        # refactor layout (cuadrado azul-soft + sin divide-x)
    └── hero/                                    # nueva carpeta
        ├── LaptopMockup.tsx                     # CSS-only laptop con base teclado
        ├── PhoneMockup.tsx                      # CSS-only iPhone con dynamic island
        ├── FloatingCardCheck.tsx                # card verde con check
        ├── FloatingCardGauge.tsx                # gauge ring SVG inline
        └── FloatingCardSparkline.tsx            # sparkline SVG inline

public/
└── logo/
    ├── logo-full.svg                            # NUEVO (de LOGO bueno.svg)
    ├── logo-mark.svg                            # NUEVO (crop monograma)
    ├── favicon.png                              # REGENERADO desde SVG
    └── apple-touch-icon.png                     # REGENERADO desde SVG
```

A eliminar:
- `public/logo/logo-full.png`, `public/logo/logo-mark.png` (no se usan después del cambio).
- `tuagenciaweb-logo-exacto.svg` (en raíz, no es vector real).
- `diseño hero.png` (en raíz, era referencia).

### 6.2 Sin dependencias nuevas

Todo el código vive sobre lo ya instalado: `framer-motion`, `@phosphor-icons/react`, `next/image`. Las visualizaciones son SVG inline en componentes RSC/Client según necesidad.

### 6.3 Generación de favicon desde SVG

Con `sharp` (ya instalado):

```bash
node -e "
const sharp = require('sharp');
Promise.all([
  sharp('public/logo/logo-mark.svg').resize(32, 32).png().toFile('public/logo/favicon.png'),
  sharp('public/logo/logo-mark.svg').resize(180, 180).png().toFile('public/logo/apple-touch-icon.png'),
]).then(() => console.log('done'));
"
```

Sharp rasteriza SVG nativamente. Si por algún motivo falla con el SVG complejo, se cae a usar el SVG completo (no el `logo-mark`) recortado al cuadrado del monograma.

### 6.4 Tests

- E2E smoke test (`tests/e2e/home.spec.ts`): sigue funcionando — el headline assert busca `"Diseñamos webs que"`, no cambia.
- Unit tests existentes: no afectados (no testean componentes UI).

## 7. Riesgos y decisiones registradas

1. **SVG pesado (306 KB sin optimizar)**: aceptable; `next/image` no optimiza SVG pero el peso real de transferencia con compresión gzip baja a ~80 KB. Posible follow-up: ejecutar `svgo` para reducir a ~30-50 KB. No bloqueante.
2. **Mockup MacBook/iPhone en CSS puro**: si el resultado visual no convence tras el primer deploy, follow-up con SVG mockup asset. Decisión inicial: CSS por simplicidad.
3. **Gauge ring y sparkline animados** son visualizaciones nuevas — riesgo bajo, son SVG estáticos con animación CSS/Framer simple.
4. **Cambio de accent global** afecta a todos los componentes que consumen `--color-accent`. Verificación visual rápida tras deploy: home + servicios + portfolio + contacto + sobre-nosotros.

## 8. Fuera de alcance

- Refinar otros componentes más allá del hero y la banda inferior (servicios, portfolio, etc. — solo cambian color, no estructura).
- Vectorización ulterior / optimización con svgo (queda como follow-up).
- Datos legales reales en aviso-legal/privacidad (pendiente desde v1).

## 9. Próximos pasos

1. Aprobación de este spec.
2. `writing-plans` para producir plan paso a paso.
3. Ejecutar plan en rama `feat/hero-v3` con subagent-driven.
4. Merge a `main` y deploy automático via push (no CLI, lección aprendida en v2).

---
name: Magnetica Beauty Bar
description: Landing dark-first para salón de uñas: lienzo de medianoche, acento magnético y reserva conversacional.
colors:
  background: "#08040b"
  foreground: "#f6eaf3"
  primary: "#e11d74"
  primary-glow: "#ff3d9a"
  secondary: "#8b5cf6"
  accent: "#f5c542"
  muted: "#2a1a31"
  muted-foreground: "#b9a3c4"
  border: "#3a2540"
  card: "#120a17"
  popover: "#14091f"
  input: "#1a0f20"
  destructive: "#dc2626"
typography:
  display:
    fontFamily: "'Playfair Display', Georgia, serif"
    fontSize: "clamp(3rem, 7vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: normal
  headline:
    fontFamily: "'Playfair Display', Georgia, serif"
    fontSize: "clamp(1.5rem, 4vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.2
  title:
    fontFamily: "'Playfair Display', Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 600
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.6
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.28em"
    textTransform: uppercase
rounded:
  base: "0.75rem"
  lg: "0.75rem"
  xl: "1.05rem"
  "2xl": "1.35rem"
  "3xl": "1.65rem"
  full: "9999px"
spacing:
  xxs: "0.5rem"
  xs: "0.75rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.primary-glow}"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "12px 20px"
  button-outline:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
    padding: "12px 20px"
  button-ghost:
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
    padding: "8px 12px"
  button-destructive:
    backgroundColor: "{colors.destructive}"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.2xl}"
  input-stage:
    backgroundColor: "{colors.input}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
    padding: "10px 14px"
---

# Design System: Magnetica Beauty Bar

## Overview

**Creative North Star: "La Magnetita de San Bernardo"**

La Magnetita es un sistema **dark-first**: un lienzo de medianoche casi negro sobre el que la luz aparece con cuenta gotas y siempre con intención. Esa luz —glow magenta, destellos cromados, dorados puntuales— es *el producto*, no la decoración: atrae como un imán (de ahí la marca) y hace que cada CTA se lea como un objeto luminoso en penumbra.

Todo lo que no está iluminado se retira: superficies oscuras por capas tonales, bordes pétalos casi invisibles, texto rosa perlado en vez de blanco puro para que el negro no se sienta vacío. La tipografía editorial (Playfair Display) en los héroes ancla el glamour de autor; Inter sostiene la lectura y la operación. Es despierto y nocturno: rojo lacado, chrome, estrellas Y2K y flores neón viven en el lienzo sin que la página se sienta saturada.

La página vende (Persuade) y a la vez la vende a un salón real: cada pantalla demuestra que la oscuridad premia funcionalmente.

**Key Characteristics:**
- Oscuridad es lienzo; luz es producto (glow = CTA y firmas).
- Contraste alto de valor, baja saturación de fondo; acento en un solo magenta intenso.
- Superficies en capas tonales y glass con blur sutil; sin sombras grises ambientales.
- Display editorial para héroes, sans para lectura; tracking amplio en etiquetas.
- Conversación integrada (agente de reservas) como pieza material del sistema.

## Colors

Paleta nocturna con un único acento magnético dominante, un violeta de apoyo y un dorado de celebración; los neutros son tintas frías que nunca llegan a negro mate ni a gris nube.

### Primary
- **Coral Hipnótico** (#e11d74): sólido para acciones principales, texto enfatizado y acentos sobre fondo oscuro. Es el magenta "de cuerpo" (contraste AA en botones).
- **Magenta Magnético** (#ff3d9a): solo como *glow* y selecciones: halo de botones, anillo de foco, resplandor del orbe. Nunca sobre texto pequeño.

### Secondary
- **Violeta Magnetita** (#8b5cf6): apoyo en diagramación (orbe lavanda, gradientes sutil, gráficos) y en elementos de segundo plano deseados. No compite con el primary en la misma zona.

### Tertiary
- **Dorado Destello** (#f5c542): celebración y lujo puntual — decoraciones, estrellas ✦, badgets. Uso escaso y nunca en texto de lectura.
- **Destructive** (#dc2626): errores y acciones destructivas; en fondos oscuros se usa con halo translúcido propio (bg-destructive/10).

### Neutral
- **Negro Medianoche** (#08040b): fondo base de todos los temas oscuros. Ligeramente frío-violeta, nunca #000.
- **Rosa Perlado** (#f6eaf3): texto principal. Blanco rosado, evita el blanco puro en fondos oscuros.
- **Ciruela Oscura** (#2a1a31): superficies muted (fondos de mensajes, regiones de baja jerarquía).
- **Lavanda Griseada** (#b9a3c4): texto secundario/muted con AA sobre Medianoche.
- **Borde Pétalo** (#3a2540): bordes y separadores en oscuro; policía de contorno discreta.
- **Tinta Card** (#120a17) / **Noche Popover** (#14091f) / **Noche Input** (#1a0f20): superficies elevadas numeradas por luz creciente, jamás por sombra.

### Named Rules
**The Midnight Canvas Rule.** El fondo es medianoche. La oscuridad no es un estado vacío: cada superficie elevada sube *un escalón de luz*, no una sombra.
**The Rare Gem Rule.** El glow magenta se usa sobre ≤10 % del área de cualquier pantalla (CTA primarios y firmas). Su rareza es el punto.
**The Gold Restraint Rule.** El dorado solo es decorativo en objetos y pertenece a textos grandes o glyphs con AA ≥ 4.5:1; prohibido en párrafos.

## Typography

**Display Font:** Playfair Display (Georgia, serif fallback)
**Body Font:** Inter (ui-sans-serif, system-ui fallback)
**Label/Mono Font:** Geist Mono (para datos, precios tabulares y micro-etiquetas)

**Character:** La serifo editorial de los héroes habla de autor y de casa de alta costura; la sans neutra opera el resto con cero ruido. Son socias de roles, nunca concurrentes.

### Hierarchy
- **Display** (600, clamp(3rem, 7vw, 4.5rem), 1.05): H1 de hero. Una sola línea, balanceada, ocasionalmente *italic* con text-glow.
- **Headline** (600, clamp(1.5rem, 4vw, 2.25rem), 1.2): títulos de sección y encabezados de tarjeta emotivos.
- **Title** (600, 1.25rem, 1.25): títulos internos de tarjetas, titles de dialogos y componentes.
- **Body** (400, 1rem, 1.6): texto general; texto de lectura limitado a ~65ch (`max-w-xl` en hero, `text-pretty`).
- **Label** (600, 0.75rem, tracking 0.28em, uppercase): eyebrows, micro-marca en navbar ("Beauty Bar"), meta de fecha. La mayúscula expandida es la firma administrativa.

### Named Rules
**The Editorial Authority Rule.** Los héroes y títulos de sección usan la serif; el resto, sans. Una escalada tipográfica que rompa esto traiciona el glamour de autor.

## Layout

Contenedor central `max-w-6xl`, padding lateral `px-4 sm:px-6`, márgenes verticales en `pt-14 pb-20` (hero) y `py-20+` (secciones). Grillas 2 columnas en `md` (contacto, hero) y carrusel full-bleed. La jerarquía horizontal de una página: hero de impacto → grid de servicios (tarjetas glass, 2-3 cols) → galería en bandas → testimonios en carrusel → reserva (chat) → contacto. Breakpoints estándar Tailwind (sm 640 / md 768 / lg 1024 / xl 1280). Densidad relajada: los componentes respiran (`gap-4/6`); nada toca bordes sin padding `px-4`.

## Elevation & Depth

Sistema **plano por defecto, iluminado por estado**: sin sombras grises ambientales; la elevación se expresa con (a) escalones de luz tonal entre superficies y (b) *halo magéntico* (`box-shadow 0 0 24px / 64px` con `color-mix` de `--primary-glow`) en los objetos que actúan. Los contenedores sobre imágenes usan glass (`blur(14px)` + borde translúcido 12 % foreground).

### Shadow Vocabulary (glow, no sombra)
- **Halo CTA** (`0 0 24px color-mix(in srgb, var(--primary-glow) 55%, transparent), 0 0 64px ... 25%`): botón primario y acciones de reserva. Presencia luminosa en penumbra.
- **Aura Texto** (text-shadow 0 0 18px, glow 60 %): palabras en display premium (`text-glow`).
- **Glass** (backdrop-filter blur 14px + borde 12 % foreground): tarjetas sobre imágenes y chat.

### Named Rules
**The Lunar Glow Rule.** La profundidad se anuncia con luz de marca, nunca con sombra difusa. Sombra gris = ruido visual.

## Shapes

Lenguaje de esquinas generosas pero contenidas: base `0.75rem`. Botones e input `rounded-lg` (0.75rem), tarjetas/cards `rounded-2xl` (1.35rem) y piezas firmes `rounded-3xl` (1.65rem); el logo-circular y chips usan `rounded-full`. La única cristalografía dura es el chip de loza del avatar y el orbe WebGL: formas orgánicas y neón conviven con la geometría *rounded* del UI.

## Components

### Buttons
- **Shape:** `rounded-lg` (0.75rem), padding `12px 20px` (h-8 → h-12 en CTA grandes de pantalla completa).
- **Primary:** fondo **Coral Hipnótico** (#e11d74), texto blanco, **Halo CTA** de glow magenta (`glow-magenta`). Hover: sube de luminosidad (primary → glow) y el halo se intensifica.
- **Hover / Focus:** `focus-visible` con `ring-3` de `--ring` (Magenta Magnético); `[&_svg]` tamaño 16px, nunca pointer-events.
- **Outline:** fondo de carbón (`bg-background`/`border-border`), borde pétalo, hover `bg-muted` + texto. Ghost: solo texto, hover `bg-muted`.
- **Destructive:** `bg-destructive/10` texto destructive, hover `bg-destructive/20`; guarda el rojo como acción en fondos oscuros.

### Cards / Containers
- **Corner Style:** `rounded-2xl` (1.35rem), algunos firmes `rounded-3xl`.
- **Background:** `card` (#120a17) o **glass** sobre imágenes (blur 14px + borde translúcido del 12 % foreground).
- **Shadow Strategy:** nunca estática; borde pétalo `border-border/60`; la elevación la da el glow sólo cuando el contenido actúa.
- **Internal Padding:** escala `p-3`–`p-6` según densidad.

### Inputs / Fields
- **Style:** fondo `--input` (Noche Input #1a0f20), borde pétalo, `rounded-lg`. Placeholder `muted-foreground`.
- **Focus:** anillo magéntico `ring-3 ring-ring/50` + borde `--ring`. Error: `aria-invalid` con `border-destructive` (rojo claro en oscuro).

### Chips
- **Style:** `bg-muted`/borde pétalo, texto foreground; hover `bg-muted` → texto elevado. En el agente: `variant="outline"` hover magénitico cuando tocan acción de reserva. Selected con `bg-primary/10` + borde `primary/50`.

### Navigation
- **Style:** barra `sticky` con `bg-background/80` + `backdrop-blur-md`, borde inferior `border-border/60`. Links texto `muted-foreground` → `foreground` en hover; CTA "Reservar" es un botón primario con halo. Móvil: sheet lateral (`bg-card/95` + blur), logo marca "M" circular con glow.

### Agent de Reservas (componente firma — [Signature Component])
- **Estilo:** panel `glass-card` `rounded-2xl`, header con `matrix-orb` (estado thinking al escribir), mensajes en burbujas: agente `bg-muted/70` borde pétalo (izquierda), usuario `bg-primary` blanco (derecha). CTA de confirmación y cancelación con halo magéntico / destructivo respectivamente; chips de servicio y acción rápida.
- **Motivo:** convierte el sistema en material: la misma oscuridad glass + glow opera el flujo de venta completo dentro de la página.

### Orbes (`fluid-orb` / `matrix-orb` — firma técnica)
- **Style:** WebGL en **Magenta Magnético** (hero) y **Violeta Magnetita** (decorativo en reserva). Respetan `prefers-reduced-motion`. Son la prueba de capacidad técnica del demo.

## Do's and Don'ts

### Do:
- **Do** usar el **Halo CTA** solo en acciones primarias y en el botón de confirmación de reserva (rareza = jerarquía).
- **Do** ampliar la escala tipográfica a la serif en héroes y títulos de sección con tracking normal.
- **Do** usar glass y blur encima de fotos/gráficos para que el texto mantenga AA sin pelear con la imagen.
- **Do** mantener el contraste AA ≥ 4.5:1 sobre **Negro Medianoche** (el blanco en texto es `Rosa Perlado`, no `#fff`).
- **Do** asegurar `prefers-reduced-motion` en *todas* las animaciones (orb nativo + utilities).
- **Do** mantener el dark como tema por defecto; claro es segundo, derivado con los mismísimos roles.

### Don't:
- **Don't** usar niveles de gris neutro (#999/#eee) sobre fondos oscuros; sustituir por *Ciruela Oscura* y *Lavanda Griseada*.
- **Don't** aplicar dorado en párrafos o etiquetas pequeñas (contraste + "lujo barato"); es decorativo.
- **Don't** anidar cards dentro de cards de igual fondo; la jerarquía se resuelve con escalón de luz, no con cajas.
- **Don't** usar easing bounce/elástico: la sensación es fija y seria (transiciones estándar 0.15–0.3s).
- **Don't** liberar el glow para el 100 % de un color plano; el corpus del sistema es oscuro, material y sutil.
- **Don't** cambiar el nombre de los roles de color al portar a otro cliente; se personalizan los *valores*, no la semántica.
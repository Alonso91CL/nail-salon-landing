# 04 · Arquitectura y secciones

## 1. Estructura del proyecto

```
nail-salon-landing/
├── .docs/                      # Esta documentación
├── .opencode/skills/           # ui-ux-pro-max (local)
├── src/
│   ├── app/
│   │   ├── layout.tsx          # <html lang="es" class="dark">, fuentes, MotionConfig, metadata
│   │   ├── page.tsx            # Composición de secciones
│   │   ├── globals.css         # Tokens Tailwind v4 + utilidades glow
│   │   └── sitemap.ts          # SEO básico (P2)
│   ├── components/
│   │   ├── ui/                 # shadcn + rare-ui (fluid-orb.tsx, matrix-orb.tsx)
│   │   ├── layout/
│   │   │   ├── navbar.tsx      # sticky, logo wordmark, nav, CTA
│   │   │   └── footer.tsx      # legal + redes (F8)
│   │   ├── sections/
│   │   │   ├── hero.tsx        # F1: fluid-orb + H1 + doble CTA (F5)
│   │   │   ├── services.tsx    # F2: grid servicios/precios
│   │   │   ├── gallery.tsx     # F3: placeholders nail art
│   │   │   ├── testimonials.tsx# F4: carrusel embla accesible
│   │   │   ├── booking.tsx     # F5: sección con chat del agente IA
│   │   │   └── contact.tsx     # F7: horario, ubicación, IG
│   │   ├── agent/
│   │   │   ├── booking-agent.tsx   # widget chat (ver 05)
│   │   │   ├── agent-machine.ts    # máquina de estados del flujo
│   │   │   └── whatsapp-link.ts    # builder de URLs wa.me
│   │   ├── orb/
│   │   │   └── hero-orb.tsx    # wrapper client de fluid-orb + fallback gradiente
│   │   └── decor/
│   │       ├── sparkles.tsx    # ✦ SVG decorativas (aria-hidden)
│   │       └── section-shell.tsx # contenedor + animación whileInView
│   ├── lib/
│   │   ├── utils.ts            # cn (shadcn)
│   │   └── data/
│   │       ├── services.ts     # catálogo 01 §5.2
│   │       ├── testimonials.ts # 01 §5.3
│   │       └── site.ts         # marca, contacto, horarios (TODOs centralizados)
│   └── hooks/
│       └── use-webgl-support.ts
└── public/
    └── placeholders/           # (si hace falta; preferir SVG inline)
```

## 2. Mapa de secciones (patrón de la skill: Hero → Social proof → CTA)

| # | Sección | Componentes | Contenido | Conversión |
|---|---------|-------------|-----------|------------|
| S1 | **Hero** | `FluidOrb`, `Button`, sparkles | H1 "Uñas que hipnotizan." + sub (01 §5.4) | CTA "Reservar" (scroll a S6) + CTA "WhatsApp" |
| S2 | Servicios | `Card`, `Badge`, Lucide | 6 servicios con precio CLP | botón "Reservar" por card |
| S3 | Galería | grid, `next/image` placeholders | 6–9 celdas nail art (placeholders §3) | hover → "Quiero este" → abre agente con referencia |
| S4 | Testimonios | `Carousel` (embla), `Avatar` | 3 testimonios ficticios (01 §5.3) | — |
| S5 | Info/Proceso | `Accordion` | "Cómo reservar", cuidados, políticas | — |
| S6 | **Reserva (agente IA)** | `BookingAgent`, `MatrixOrb` | chat guiado → handoff WhatsApp (ver 05) | CTA primario |
| S7 | Contacto | mapa estático placeholder, horario, IG | datos de 01 §5.1 | CTA WhatsApp secundario |
| S8 | Footer | links, redes, © | legal demo | — |

**CTA flotante móvil:** botón WhatsApp fijo (esquina inferior) desde S1; en desktop aparece tras hacer scroll. `aria-label="Escribir por WhatsApp"`.

## 3. Estrategia de placeholders de imagen (sin fotos reales)

- **Hero:** foto real `public/images/hero-manicure.webp` (borgoña/dorado, 1254×1254) en card glass con el `fluid-orb` asomando detrás (implementado).
- **Galería:** imágenes stock generadas (`public/images/gallery/*.webp`, 2000×2000, generador `scripts/generate-gallery.mjs` + `sharp`). Bento grid `grid-cols-2 md:grid-cols-4` sin huecos (spans: `2×2 / 2×1 / 1×1 / 1×1 / 2×1 / 2×1` en desktop; `2 / 1+1 / 2 / 1+1` en móvil) con `next/image` `fill` + `object-cover` + alt descriptivo.
- **Avatares testimonios:** iniciales sobre gradiente (shadcn `Avatar`).
- **OG image:** `opengraph-image.tsx` con fondo dark + wordmark (Next metadata image).
- **Mapa:** bloque estilizado (grid de líneas tenues + pin Lucide) con nota "San Bernardo, Santiago".
- `TODO`: reemplazar por fotos reales del salón (subir a `/public`, `next/image` con `sizes` responsivo y alt descriptivo — regla a11y skill).

## 4. Estado y datos

- Sitio estático (`SSG`): todo el contenido desde `lib/data/*.ts`. **No hay backend en la demo.**
- El agente de reservas vive en estado local del componente (ver 05).
- Configuración de marca centralizada en `site.ts` → cambiar un archivo para re-marcar.

## 5. Accesibilidad estructural

- Landmarks: `header/nav/main/section[aria-labelledby]/footer`.
- Skip-link "Ir a reservar".
- Heading hierarchy estricta (un solo `h1`).
- Carrusel: controles prev/next + pausa en focus/hover + `aria-live` anuncia posición (regla de la skill de "Hero + Testimonials").
- Chat: `role="log"` con `aria-live="polite"`; foco al composer; `prefers-reduced-motion` (orbe congelado).
- Formularios: `label for` asociado, estados loading → success/error (severidad High de la skill).

# 03 · Tech Stack

## Stack general

| Capa | Tecnología | Versión | Rol |
|------|-----------|---------|-----|
| Framework | **Next.js** (App Router) | ≥ 15 | SSG de la landing, metadata/SEO |
| Lenguaje | TypeScript | 5.x | Tipado estricto |
| Estilos | **Tailwind CSS** | v4 | Tokens CSS en `globals.css` (shadcn-compatible) |
| UI base | **shadcn/ui** (CLI 4, base radix) | latest | button, card, dialog, carousel, etc. |
| Animado firma | **rare-ui `fluid-orb`** | registry `swamimalode07/rare-ui` | Orbe WebGL del hero |
| Animación UI | **motion** (`motion/react`) | latest | Entradas `whileInView`, micro-interacciones |
| Iconos | lucide-react | — | Íconos SVG (regla skill: sin emojis como íconos) |
| Fuentes | `next/font/google` | — | Playfair Display + Inter (self-hosted, sin CLS) |
| Despliegue sugerido | Vercel o **Cloudflare Workers (vinext/OpenNext)** | — | Demo; no bloquea el diseño |

## Instalación de componentes

```powershell
# 1. Scaffold
pnpm dlx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack --use-pnpm

# 2. shadcn init (base-theme oscuro como punto de partida)
pnpm dlx shadcn@latest init

# 3. Componentes base
pnpm dlx shadcn@latest add button card badge input label textarea select dialog carousel separator avatar accordion sheet scroll-area sonner

# 4. rare-ui: orbe fluido del hero (solo depende de utils: clsx + tailwind-merge)
pnpm dlx shadcn@latest add swamimalode07/rare-ui/fluid-orb

# 5. Animaciones
pnpm add motion
```

## `fluid-orb` — ficha técnica (fuente: código del registry, verificado)

- **Render:** canvas WebGL con shader de ruido fBm (fluido que deriva) recortado a círculo.
- **Props:** `size?: number` (px, default 240) · `color?: string` (hex, default `#1A73F2`) + props nativos de `div`.
- **Dependencias:** solo `@/lib/utils` → `cn` (lo instala el CLI). **Sin Motion, sin GL libs.**
- **Accesibilidad:** lee `prefers-reduced-motion` (congelado con `u_time = 0`) ✔.
- **DPR:** limita `devicePixelRatio` a 2 (buen performance móvil).
- **Sin WebGL:** sale silencioso (canvas vacío) → **fallback:** gradiente radial CSS magenta en el contenedor (documentado en 04).
- **Uso en la marca:** orb principal `color="#FF3D9A"` (magenta neón) + secundario más pequeño `#8B5CF6` (lavanda Y2K) en la sección CTA final.

**Extra detectado en rare-ui:** `matrix-orb` (orbe de puntos con estados *idle/listening/thinking*) — candidato para **avatar del agente de reservas**. Opcional:

```powershell
pnpm dlx shadcn@latest add swamimalode07/rare-ui/matrix-orb
```

## Tailwind v4 — tokens

`globals.css` define los tokens de 02-design-system.md como variables `:root`/`.dark` (shadcn v4 usa `@theme inline`). Al ser demo **dark-first**: `class="dark"` fijo en `<html>` + `color-scheme: dark`.

```css
@theme inline {
  --color-background: #08040B;
  --color-foreground: #F6EAF3;
  --color-primary: #E11D74;
  --color-secondary: #8B5CF6;
  --color-accent: #F5C542;
  /* ... resto de tokens */
  --font-display: var(--font-playfair);
  --font-sans: var(--font-inter);
}
```

## Skills / herramientas de proyecto

| Herramienta | Ubicación | Uso |
|-------------|-----------|-----|
| **ui-ux-pro-max** | `.opencode/skills/` (instalada vía `pnpm dlx ui-ux-pro-max-cli init --ai opencode`, local, jamás global) | Generación de design system, reglas UX, checklist de entrega. Requiere Python 3 (`py`) ✔ 3.14.7 |
| rare-ui registry | remoto (`swamimalode07/rare-ui`) | Componentes firma (fluid-orb, matrix-orb) |
| shadcn CLI | pnpm dlx | Componentes base + instalación de ítems del registry |

## Notas de rendimiento

- `fluid-orb` es client component (`'use client'`): aislarlo en su propio componente para no client-sideizar toda la página.
- Fuentes vía `next/font` (subset latin) — evita requests externos.
- Galería: `next/image` con `sizes` correctos; placeholders son SVG/gradientes inline → peso ≈ 0.
- Meta skill: Lighthouse móvil ≥ 90 en las 4 categorías.

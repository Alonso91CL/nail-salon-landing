# 06 · Plan de Implementación por Fases

> Ejecutar después de aprobar `.docs`. Cada fase termina verificable. Basado en: 01 PRD · 02 Design System · 03 Stack · 04 Arquitectura · 05 Agente.

## Registro de ejecución (2026-09)

**Fases 0–7 completadas** (`lint` + `build` + smoke test HTTP 200 con todas las secciones ✓). Desviaciones verificadas sobre lo planificado:

- shadcn CLI 4 preset default **`base-nova` = Base UI** (no Radix): composición con `render={<a/>}`; Button `size` default es compacto (h-8, lg=h-9).
- `pnpm dlx create-next-app` **aborta con archivos conflictivos** (`.docs`, `AGENTS.md`, `.opencode`) → stash/temporal + restore; además genera `AGENTS.md`/`CLAUDE.md` propios (conservar bloque `nextjs-agent-rules`).
- lucide-react 1.x: `Instagram` no existe → `AtSign`.
- ESLint Next 16 con `react-hooks/set-state-in-effect`: hooks del orb vía `useSyncExternalStore`; restore de sessionStorage del chat con disable puntual justificado.
- `pnpm dlx shadcn@latest init --defaults` (los flags antiguos `-b neutral` ya no existen).
- Marquee (opcional) NO implementado. Resto del mapa de secciones S1–S8 ✓.
- **Iteración post-Fase 7:** tema claro con next-themes (toggle sol/luna en navbar, default dark) + tokens `:root`/`.dark` en `globals.css`; foto real `public/images/hero-manicure.webp` en hero (renombrada de ASCII-incompatible `diseño-uñas.webp`); limpieza de mojibake introducido por ediciones con PowerShell 5.1 (`Get-Content`/`Set-Content` leen ANSI → daño con pérdida en `booking-agent.tsx`, reescrito).
- **Galería:** imágenes stock generadas (`scripts/generate-gallery.mjs` + sharp → `public/images/gallery/*.webp`) y bento grid reorganizado para eliminar huecos en móvil y desktop (spans documentados en 04 §3).
- Pendiente manual: Lighthouse móvil ≥ 90, fotos reales de galería, número WhatsApp real, mapa embebido.

## Fase 0 — Fundaciones

- [ ] `pnpm dlx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack --use-pnpm`
- [ ] **Tras el scaffold, restaurar `.gitignore`** (create-next-app lo sobrescribe): re-agregar `.docs/tmp` y `.opencode`
- [ ] `pnpm dlx shadcn@latest init` (estilo base neutral/new-york, dark)
- [ ] `pnpm dlx shadcn@latest add button card badge input label textarea select dialog carousel separator avatar accordion sheet scroll-area sonner`
- [ ] **`pnpm dlx shadcn@latest add swamimalode07/rare-ui/fluid-orb`**
- [ ] (opcional avatar agente) `pnpm dlx shadcn@latest add swamimalode07/rare-ui/matrix-orb`
- [ ] `pnpm add motion`
- [ ] Verificar build: `pnpm build` sin errores
- **Criterio:** app arranca; `FluidOrb` renderiza con `color="#FF3D9A"`.

## Fase 1 — Sistema de diseño (tokens)

- [ ] Escribir tokens de 02-design-system.md en `globals.css` (`@theme inline`)
- [ ] Fuentes vía `next/font/google` (Playfair Display + Inter, subset latin) → `--font-display/--font-sans`
- [ ] `<html lang="es" class="dark">`, `color-scheme: dark`, skip-link
- [ ] Utilidades: `.glow-magenta`, `.glass-card`
- **Criterio:** `Button variant=primary` muestra marca correcta + focus ring `--ring`.

## Fase 2 — Datos + layouts

- [ ] `lib/data/site.ts` (marca, contacto, TODOs centralizados), `services.ts`, `testimonials.ts`
- [ ] `navbar.tsx` (sticky, `sheet` móvil, CTA) + `footer.tsx`
- [ ] `section-shell.tsx` (animación `whileInView` + `aria-labelledby`)
- **Criterio:** estructura responsive funcionando en 375/768/1024/1440.

## Fase 3 — Hero con fluid-orb (F1) ⭐

- [ ] `hero-orb.tsx`: wrapper `'use client'` de `FluidOrb` (size responsivo vía `useMediaQuery`/CSS scale), fallback gradiente si `!useWebGL()`
- [ ] Sección `hero.tsx`: H1 + sub + doble CTA + orb principal magenta + orb lavanda decorativo + `sparkles.tsx` (aria-hidden)
- [ ] Respetar `prefers-reduced-motion` (orb nativo + `MotionConfig reducedMotion="user"` en layout)
- **Criterio:** Lighthouse móvil Performance ≥ 90; orb fluido visible; sin CLS.

## Fase 4 — Servicios + Galería (F2, F3)

- [ ] `services.tsx`: grid `Card` glass con precio CLP (`tabular-nums`), CTA "Reservar"
- [ ] `gallery.tsx`: placeholders SVG/gradiente estilizados (04 §3) con `role="img"` + alt; hover scale+glow; botón "Quiero este" → prefill agente
- **Criterio:** 6 servicios y 6+ piezas visibles, contraste AA.

## Fase 5 — Testimonios + Info (F4, F7)

- [ ] `testimonials.tsx`: `Carousel` embla con prev/next, pausa en focus/hover, anuncio de posición
- [ ] `accordion` "Cómo reservar/cuidados" + `contact.tsx` (horario, ubicación, IG, mapa placeholder)
- **Criterio:** carrusel operativo con teclado; sin autoplay problemático.

## Fase 6 — Agente de reservas + WhatsApp (F5, F6)

- [ ] `agent-machine.ts`: máquina de estados + NLU de reglas (05 §3) + validaciones
- [ ] `whatsapp-link.ts`: `buildBookingMessage` + `PHONE` en `site.ts` (TODO `569XXXXXXXX`)
- [ ] `booking-agent.tsx`: chat con chips de servicio, `matrix-orb` como avatar, `aria-live="polite"`, estados loading→success
- [ ] Sección `booking.tsx` en S6 + **CTA WhatsApp flotante** móvil (hero/contacto/genérico)
- [ ] `sessionStorage` de borrador (05 §5)
- **Criterio:** flujo completo hasta `wa.me` con mensaje prellenado correcto; probado en móvil.

## Fase 7 — Pulido y QA (F9, F10)

- [ ] `metadata` + OG image (`opengraph-image.tsx`), `sitemap.ts`
- [ ] Revisar checklist pre-entrega de 02 §8 (ítem por ítem)
- [ ] Pruebas: 375/768/1024/1440 · teclado (tab order chat+carrusel) · `prefers-reduced-motion` · sin WebGL (fallback) · Lighthouse ≥ 90×4
- [ ] `pnpm lint` + `pnpm build` limpios
- **Criterio:** Aceptación PRD §8 completa.

## Riesgos

| Riesgo | Mitigación |
|--------|-----------|
| rare-ui `fluid-orb` cambia/falla en instalación | código copiado a `components/ui/` (MIT, "you own the code") → mantener localmente |
| WebGL ausente/caído en móviles antiguos | detección + fallback gradiente (Fase 3) |
| NLU del agente se siente "básica" | chips guiados como camino principal; upgrade path LLM documentado (05 §6) |
| Contraste en dark mode | validación AA documentada en 02 §3; usar `--ring` visible |

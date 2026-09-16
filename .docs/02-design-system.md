# 02 · Design System — Magnetica Beauty Bar

> Basado en el generador de la skill **ui-ux-pro-max** (`--design-system`, ver `design-system/skill-MASTER-original.md`), **adaptado a modo oscuro/glamour** según la referencia de Instagram. El output original recomendaba modo claro (`#FDF2F8`, "Avoid Dark mode"); la decisión de marca es **dark-first**, por lo que se invierte el fondo conservando la familia cromática magenta y las reglas de accesibilidad.

## 1. Patrón de landing (skill: "Hero + Testimonials + CTA")

```
Hero (fluid-orb + doble CTA)  ← CTA arriba del fold
  ↓
Servicios (grid con precios)  ← "Solution overview"
  ↓
Galería (nail art)            ← "Problem statement": muestra el resultado
  ↓
Testimonios (carrusel)        ← social proof ANTES del CTA final
  ↓
CTA final + Contacto/Reserva  ← repetición de conversión
  ↓
Footer
```

- **Conversión (regla de la skill):** prueba social antes del CTA final; CTA repetido en hero y post-testimonios.
- **CTA primario:** `Reservar` (agente IA). **CTA secundario:** `WhatsApp` directo.

## 2. Estilo visual

**Categoría skill:** Soft UI Evolution + **Glassmorphism** (cards sobre fondo oscuro) → keywords: *depth, glow controlado, premium, accesible*.

- Profundidad con **glow magenta** en vez de sombras negras duras.
- Cards translúcidas (`rgba` blanco 4–8 % + `backdrop-blur`), borde `1 px` sutil.
- Sin grano/ruido agresivo; destellos ✦ puntuales (recurso decorativo, `aria-hidden`).

## 3. Paleta (dark/glamour)

| Rol | Hex | Token CSS | Uso |
|-----|-----|-----------|-----|
| `background` | `#08040B` | `--background` | Fondo general, negro azabache con tinte violeta |
| `foreground` | `#F6EAF3` | `--foreground` | Texto principal (casi blanco rosado) |
| `card` | `#120A17` | `--card` | Superficies elevadas |
| `primary` | `#E11D74` | `--primary` | Branding, CTA primario, logo |
| `primary-glow` | `#FF3D9A` | `--primary-glow` | Neón magenta (glows, hovers, orb) |
| `secondary` | `#8B5CF6` | `--secondary` | Lavanda (acento Y2K, orb secundario) |
| `accent` | `#F5C542` | `--accent` | Dorado cromado (estrellas, precios, detalles) |
| `muted` | `#2A1A31` | `--muted` | Fondos secundarios, chips |
| `muted-foreground` | `#B9A3C4` | `--muted-foreground` | Texto suave |
| `border` | `#3A2540` | `--border` | Bordes, divisores |
| `ring` | `#FF3D9A` | `--ring` | Focus visible |
| `destructive` | `#DC2626` | `--destructive` | Errores |
| `input` | `#1A0F20` | `--input` | Campos de formulario |

**Contraste (regla WCAG AA ≥ 4.5:1):**
- `--foreground` sobre `--background`: ✔ 17:1
- `--primary-glow` sobre `--background`: ✔ 6.5:1
- Texto sobre `--primary` → usar `#FFFFFF` (✔ 4.6:1).
- `--accent` (dorado) **solo** para textos grandes ≥ 18.66 px bold/24 px o elementos decorativos: sobre `--background` ✔ 9:1, sobre `--primary` ✘ (no combinar).

### 3.1 Tema claro (aadido para la demo)

Implementado con **next-themes** (`ThemeProvider attribute="class" defaultTheme="dark"`, `suppressHydrationWarning` en `<html>`, toggle sol/luna minimalista en navbar con variantes CSS `dark:`). Tokens en `:root` (claro) y `.dark` (oscuro) de `globals.css`, derivados de la paleta Beauty/Spa original de la skill:

| Rol | Claro | Notas |
|-----|-------|-------|
| `--background` | `#FFF7FB` | blanco cálido rosado |
| `--foreground` | `#2A0F26` | ciruela oscuro · 14:1 ✔ |
| `--primary` / `--primary-glow` | `#C2185B` | magenta oscurecido para AA sobre claro (8:1 con texto blanco) |
| `--secondary` | `#7C3AED` | lavanda (5.7:1 con blanco) |
| `--muted` / `--muted-foreground` | `#F7EBF2` / `#6B5B66` | 5.1:1 ✔ |
| `--border` / `--input` | `#EBD3E2` / `#F3E4EE` | |

Regla: el branding **sigue dark-first** (default `dark`); el tema claro es equivalente accesible, no un rediseño. La imagen del hero (borgoña/dorado sobre gris claro) funciona en ambos temas.

## 4. Tipografía

| Rol | Fuente | Pesos | Notas |
|-----|--------|-------|-------|
| Display / H1–H2 | **Playfair Display** (serif editorial, lujo) | 500–700 | Alternativa con carácter: *Cinzel* o blackletter sutil para logo (el logo "M" de la ref es gótico; para la demo usamos wordmark serif + `✦`) |
| Subtítulos / H3+ | **Playfair Display** o **Inter** semibold | 600 | |
| Cuerpo / UI | **Inter** | 300–700 | Body 16 px / line-height 1.6 |
| Precios / números | Inter tabular-nums | 600 | |

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap');
/* o next/font/google (preferido, ver 03) */
```

Escala fluida: `clamp(2.25rem, 6vw, 4.5rem)` H1 · `clamp(1.5rem, 3.5vw, 2.25rem)` H2 · 1.125rem body móvil / 1.25rem desktop.

## 5. Efectos y animación (regla skill: 200–300 ms)

| Efecto | Implementación |
|--------|----------------|
| `fluid-orb` WebGL en hero (Motion no requerido por el componente; el shader respeta `prefers-reduced-motion`) | componente rare-ui; color `primary-glow` / `secondary`; `size` responsivo |
| Glow en hover de CTA | `box-shadow: 0 0 24px color-mix(in srgb, var(--primary-glow) 55%, transparent)` transition 200 ms |
| Entrada de secciones | `motion` (Framer) `whileInView` fade + `y: 24`, `viewport={{ once: true }}` |
| Estrellas ✦ decorativas | SVG con `animate-pulse` suave, `aria-hidden="true"` |
| Carrusel testimonios | `embla-carousel-react` (shadcn) con prev/next visibles, pausa en hover/focus, anuncio de posición |
| Imágenes galería | hover `scale-[1.03]` + brillo interior, 300 ms |
| Marquee (opcional) | texto `NAIL ART · SOFT GEL · ✦ ·` desplazamiento continuo lento |

**Reduced motion:** todas las animaciones envueltas en `MotionConfig({ reducedMotion: "user" })` + `@media (prefers-reduced-motion: reduce)` desactiva keyframes.

## 6. Componentes (shadcn/ui a instalar)

`button` · `card` · `badge` · `input` · `label` · `textarea` · `select` · `dialog` · `carousel` · `separator` · `avatar` · `accordion` · `sheet` (nav móvil) · `scroll-area` (chat) · `sonner` (toasts) + **rare-ui**: `fluid-orb`.

## 7. Anti-patrones (evitar)

- ✘ Morado/rosa "genérico IA" sin anclar a la paleta de marca.
- ✘ Animaciones > 400 ms o con rebotes agresivos (la skill marca *harsh animations* como anti-patrón para beauty).
- ✘ Emojis como íconos → usar **Lucide**. (Los ✦ son decoración SVG inline con `aria-hidden`, no emojis funcionales.)
- ✘ Neón sobre blanco (glow solo funciona sobre `background` oscuro).
- ✘ Texto < 4.5:1; dorado sobre magenta.
- ✘ Imágenes reales de clientas sin permiso (la demo usa placeholders).

## 8. Checklist pre-entrega (skill)

- [ ] Sin emojis como íconos (SVG Lucide)
- [ ] `cursor-pointer` en todos los elementos clicables
- [ ] Hover 150–300 ms, focus visible (`--ring`)
- [ ] Contraste AA en dark mode (texto ≥ 4.5:1)
- [ ] `prefers-reduced-motion` respetado (orb + Motion + marquee)
- [ ] Responsive 375 / 768 / 1024 / 1440
- [ ] Labels asociados en formularios (`label for`), no placeholder-only
- [ ] Feedback loading → success/error en submit
- [ ] Alt text descriptivo en imágenes significativas
- [ ] Chat accesible: foco gestionado, `aria-live` para respuestas del agente

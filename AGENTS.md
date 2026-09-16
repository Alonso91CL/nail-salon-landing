<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — Nail Salon Landing (Magnetica Beauty Bar demo)

Landing page demo para salón de uñas: Next.js 16 + Tailwind v4 + shadcn/ui + rare-ui `fluid-orb`, con agente de reservas + handoff a WhatsApp. Contenido del sitio y docs: **español (CL)**.

## Estado actual

- **Implementación completa (Fases 0–7 de `.docs/06-plan-impl.md`) + tema claro/oscuro.** Verificar con `pnpm lint` + `pnpm build`. Pendiente manual: Lighthouse móvil y reemplazo de TODOs (número WhatsApp real, fotos de galería, mapa).
- **Temas:** dark-first es el branding (default `dark`); next-themes (`attribute="class"`, Providers) con toggle sol/luna en `theme-toggle.tsx`. Tokens claro en `:root` y oscuros en `.dark` de `globals.css` — mantener ambos en sync al editar paleta (ver `.docs/02-design-system.md §3.1`).
- Fuente de verdad del diseño/plan: `.docs/` (índice en `.docs/README.md`). No improvisar decisiones ya documentadas ahí; leer antes de implementar.
- Datos de marca/contacto son **placeholders demo** (`TODO`), centralizados en `src/lib/data/site.ts`.

## Workflow: Git Flow + seguridad de Git

- Ramas: `master` (producción) y `develop` (integración). Modelo **Git Flow**: `feature/<nombre>` desde/hacia `develop`; `release/*` y `hotfix/*` según necesite `master`. Sin remote configurado aún.
- **Nunca comitear secretos ni PII**: no agregar números de WhatsApp reales, fotos de clientas ni credenciales. Lo real vive solo en `.env.local` (ignorarlo; `.env*` ya está en `.gitignore`).
- `.gitignore` ya protege: `.docs/tmp/` (captura de Instagram de referencia — privada) y `.opencode/` (skill reinstallable). **Mantener ambas entradas ignoradas.**
- No force-push ni reescritura de historia en `master`/`develop`.
- **Formato de commit: Conventional Commits, siempre en inglés**, tan detallados y simples a la vez como sea posible: `<type>: <imperative summary ≤72 chars>` + body opcional con el *qué* y el *por qué*. Tipos: `feat:` (funcionalidad nueva), `fix:` (bug), `docs:` (documentación), `style:` (formato, sin cambio de lógica), `refactor:`, `perf:`, `test:`, `chore:` (build/deps/mantenimiento), `revert:`. Ejemplos: `feat: add fluid-orb hero with magenta WebGL gradient`, `fix: clamp orb size on 375px viewports`, `docs: sync pnpm commands in .docs`. Un commit = un cambio lógico (sin commits "mixtos").
- **Prohibido toda escritura de Git sin pedido explícito del usuario.** Ningún `git commit`, `merge`, `rebase`, `cherry-pick`, `reset`, `tag`, `push`, cambio de rama con `-b`, ni creación de PR/branch, a menos que el usuario lo solicite explícitamente en su mensaje ("comitea", "haz merge de X", etc.). En caso de duda: preguntar, no ejecutar. Las acciones seguras permitidas son de solo lectura (`status`, `log`, `diff`, `show`).

## Toolchain (Windows — gotchas reales)

- Usar el launcher **`py`** para Python; `python`/`python3` son stubs del Microsoft Store y fallan.
- La skill `ui-ux-pro-max` está en `.opencode/skills/` (gitignored). Regenerar design system:
  ```powershell
  py ".opencode/skills/ui-ux-pro-max/scripts/search.py" "<query>" --design-system -f markdown
  ```
  Si falta la skill: `pnpm dlx ui-ux-pro-max-cli init --ai opencode` (local, jamás global).
- Usar **pnpm** (no npm/yarn): `pnpm add`, `pnpm dev`, `pnpm build`, `pnpm lint`, `pnpm dlx` en lugar de `npx`.
- **Nunca editar archivos UTF-8 con `Get-Content`/`Set-Content` de PowerShell 5.1** (leen ANSI → mojibake en español). Usar herramientas de edición de archivos.
- `create-next-app` (Next 16): **aborta si hay archivos conflictivos** (`.docs/`, `AGENTS.md`, …) → mover a temp, scaffold, restaurar. Sobrescribe `.gitignore` (re-agregar entradas) y **genera su propio `AGENTS.md`/`CLAUDE.md`** con el bloque `nextjs-agent-rules` (conservarlo).

## Gotchas del stack verificados en este repo

- Next **16.3.5** (App Router): tipos de ruta generados (`LayoutProps<"/">`); docs locales en `node_modules/next/dist/docs/`.
- shadcn CLI 4 con preset **`base-nova` = Base UI** (`@base-ui/react`), NO Radix: composición con prop **`render={<a/>}`** (no `asChild`); el `Select`/`Dialog`/`Sheet`/`Accordion` tienen API Base UI. Leer `src/components/ui/*.tsx` antes de asumir la API Radix.
- **lucide-react 1.x**: sin íconos de marca (`Instagram` eliminado → `AtSign`); alias antiguos como `Wand2`/`Waves` siguen exportados.
- ESLint (Next 16, react-hooks estricto): `react-hooks/set-state-in-effect` prohíbe setState síncrono en effects → usar `useSyncExternalStore` (ver `src/hooks/use-orb.ts`) o disable puntual con justificación. `eslint.config.mjs` ignora `.opencode/**`, `.docs/**` y `src/components/ui/**` (código vendorizado).
- motion v13 + React 19: prop `className` de `motion.section` choca con `ComponentPropsWithoutRef` → tipar props con `HTMLMotionProps<"section">`.
- `fluid-orb`/`matrix-orb` (rare-ui): default export, props `size`/`color` (y `state` en matrix-orb), ya respetan `prefers-reduced-motion`; solo dependen de `cn`.

## Comandos clave

```powershell
pnpm dev / pnpm lint / pnpm build
pnpm dlx shadcn@latest add <item>                  # componentes shadcn
pnpm dlx shadcn@latest add swamimalode07/rare-ui/fluid-orb
node scripts/generate-gallery.mjs                  # regenerar imágenes stock de galería (sharp)
```

- Verificación: `lint → build` limpios antes de dar por hecha una fase; Lighthouse móvil ≥ 90 (Performance/A11y/BP/SEO) es criterio de aceptación.

## Convenciones de diseño verificadas

- **Dark-first** con los tokens de `.docs/02-design-system.md` (la skill sugería modo claro; la decisión de marca invirtió a oscuro — no "arreglarlo" hacia light mode). `:root` y `.dark` comparten la paleta.
- `fluid-orb` respeta `prefers-reduced-motion` nativamente; el resto de animaciones va con `MotionConfig reducedMotion="user"`.
- Íconos: Lucide SVG, nunca emojis funcionales (✦ decorativas van `aria-hidden`).
- Contraste AA sobre `--background` oscuro ≥ 4.5:1; dorado `--accent` solo en textos grandes o decoración.
- El agente de reservas es client-side puro (`src/lib/agent/agent-machine.ts`); el handoff arma URLs `wa.me` — número placeholder en `src/lib/data/site.ts` con aviso toast.

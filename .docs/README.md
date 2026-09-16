# Documentación — Landing "Magnetica Beauty Bar" (Demo)

Landing page demo para un salón de uñas, estética **oscura/glamurosa** inspirada en la referencia de Instagram (`.docs/tmp/image.png`).

## Índice

| Doc | Contenido |
|-----|-----------|
| [01-proyecto.md](01-proyecto.md) | PRD: objetivo, público, alcance, contenido y casos de uso |
| [02-design-system.md](02-design-system.md) | Design system: paleta dark/glamour, tipografía, efectos, tokens, checklist a11y |
| [03-tech-stack.md](03-tech-stack.md) | Stack técnico: Next.js + Tailwind v4 + shadcn/ui + rare-ui `fluid-orb` + Motion |
| [04-arquitectura.md](04-arquitectura.md) | Estructura de carpetas, mapa de secciones y componentes |
| [05-agente-reservas.md](05-agente-reservas.md) | Agente IA de reservas (chat demo) + handoff a WhatsApp (`wa.me`) |
| [06-plan-impl.md](06-plan-impl.md) | Plan de implementación por fases con checklist |
| [design-system/skill-MASTER-original.md](design-system/skill-MASTER-original.md) | Output original del generador de `ui-ux-pro-max` (referencia) |

## Herramientas instaladas en el proyecto

- **Skill `ui-ux-pro-max`** (local, `.opencode/skills/`): generador de design systems con 192 reglas por industria. Re-generar:
  ```powershell
  py ".opencode/skills/ui-ux-pro-max/scripts/search.py" "nail salon beauty dark glamour luxury booking" --design-system -f markdown
  ```
- **`pnpm dlx shadcn@latest add swamimalode07/rare-ui/fluid-orb`** → orbe fluido WebGL animado (ver 03-tech-stack.md). Gestor de paquetes del proyecto: **pnpm**.

## Convenciones

- Idioma del sitio: **Español (CL)**.
- Todos los datos de contacto/marca de la demo son **placeholders** marcados con `TODO`.
- Imágenes de galería/hero: **placeholders estilizados** (gradientes dark/glam), sin fotos reales.

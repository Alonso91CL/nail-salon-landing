# Magnetica Beauty Bar — Landing

Landing page demo para [Magnetica Beauty Bar](https://www.instagram.com/magnetica.beautybar), salón de uñas en San Bernardo, Chile. Incluye agente de reservas conversacional con handoff a WhatsApp.

## Stack

- **Next.js 16** (App Router, React 19)
- **Tailwind CSS v4**
- **shadcn/ui** con preset `base-nova` (Base UI, no Radix)
- **rare-ui** `fluid-orb` / `matrix-orb`
- **next-themes** (tema oscuro por defecto, toggle claro/oscuro)

## Requisitos

- Node.js >= 20
- pnpm

## Comandos

```bash
pnpm install       # instalar dependencias
pnpm dev           # servidor de desarrollo
pnpm lint          # ESLint
pnpm build         # build de producción
```

### Regenerar imágenes de galería

```bash
node scripts/generate-gallery.mjs   # genera las imágenes stock (sharp)
```

## Estructura

```
src/
├── app/              # páginas y globals.css (tokens de tema)
├── components/
│   ├── agent/        # agente de reservas (chat UI)
│   ├── sections/     # secciones de la landing
│   ├── ui/           # componentes shadcn/base-nova (vendorizados)
│   └── ...
├── hooks/
├── lib/
│   ├── agent/        # state machine del agente, store de reservas, FAQ
│   └── data/         # servicios, testimonios, datos de sitio
```

## Agente de reservas

- Crea, revisa y cancela reservas (persistencia client-side en `sessionStorage`).
- Responde preguntas frecuentes: horarios, precios, ubicación, métodos de pago.
- Confirma y ajusta la hora por WhatsApp (`wa.me`).

## Notas demo

Este es un demo. Los datos de marca son placeholders centralizados en `src/lib/data/site.ts`:

- Reemplazar `whatsappPhone` (número real) — **nunca comitear el número real**.
- Reemplazar fotos de galería y embeber mapa real en la sección Contacto.

## Documentación

El diseño y plan de implementación viven en [`.docs/`](.docs/README.md).
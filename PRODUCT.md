# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

1. **Decisor / dueño de salón de uñas (cliente del demo).** Evalúa esta landing como muestra de lo que le construirían: presencia digital premium, diseño dark-first y reservas que convierten. No necesita saber de código; decide por percepción en los primeros segundos.
2. **Cliente del salón (visitante final del flujo de reserva).** Mujeres 18–40, segmento C/D, urbanas de Santiago, Chile; consumen Instagram/Pinterest, valoran nail art de tendencia (Y2K, chrome, francesas con detalles). Dispositivo principal: móvil (>80 % del tráfico esperado).

## Product Purpose

Demostrar —y vender— el servicio de desarrollo de landing pages para salones de uñas a través de un demo ficticio ("Magnetica Beauty Bar") completamente funcional: agente de reservas + handoff a WhatsApp, galería y diseño oscuro/glamuroso. Que un cliente potencial del servicio se vea en el demo y reserve él mismo es la prueba de conversión.

## Positioning

Una landing de salón de uñas que no es un folleto: el visitante reserva en el sitio con un agente de reservas conversacional (crear/revisar/cancelar citas + preguntas frecuentes) y confirma por WhatsApp, sobre un sistema de diseño oscuro/brillante con presencia técnica (WebGL, motion). El diferenciador es la conversión integrada, no la galería.

## Operating Context

- Landing de una sola página (hero → servicios → galería → testimonios → reserva → contacto), español (CL), móvil-first.
- Flujo de conversión: CTA "Reservar" abre el agente dentro de la página; el agente arma la cita y el confirmador salta a `wa.me`.
- Comandos del usuario final: `pnpm dev`, `pnpm lint`, `pnpm build`.

## Capabilities and Constraints

- Capabilities del demo: hero con orbe WebGL animado (`fluid-orb`), grid de servicios con precios y duración, galería responsive, testimonios en carrusel, agente de reservas client-side (elige servicio, fecha, datos; crea/revisa/cancela reservas en `sessionStorage`; responde FAQs de horarios/precios/ubicación/pagos), handoff a WhatsApp con mensaje prellenado, botón flotante de WhatsApp, tema claro/oscuro (dark-first), responsive 375–1440 y `prefers-reduced-motion`.
- Constraints técnicas: Next.js 16 (App Router), Tailwind v4, shadcn/ui con preset `base-nova` (Base UI, no Radix), rare-ui `fluid-orb`/`matrix-orb`, motion v13, next-themes. Sin backend: el agente es client-side puro; el calendario real y CRM quedan como upgrade path documentado en `.docs/05-agente-reservas.md`.
- Datos: **todos los valores de marca, contacto, testimonios, galería y mapa son placeholders demo** (`src/lib/data/site.ts` es la fuente única). Pendiente por cliente real: número WhatsApp, dirección, fotos reales, mapa, reseñas auténticas. Nunca comitear PII de un cliente.

## Brand Commitments

- Marca demo fija: **Magnetica Beauty Bar**, tagline "Uñas que hipnotizan", identidad "magnética/hipnótica": glamour nocturno, destellos magnetita, carácter Y2K.
- **Dark-first obligatorio** como identidad de marca; dark es el tema por defecto y el claro es derivado. No "arreglar" hacia light mode.
- Acento magenta con glow sobre negro; tipografía de display en héroes; dorado solo decorativo/accesible (contraste AA ≥4.5:1).
- Nombre, paleta y assets de cada cliente real se personalizan al entregar; el demo conserva Magnetica en repos.

## Evidence on Hand

- PRD: `.docs/01-proyecto.md` (público, servicios con precio CLP, criterios de aceptación).
- Referencia visual de marca: `.docs/tmp/image.png` (privado, gitignored) — feed Instagram de referencia (rojo lacado, chrome, estrellas, neón rosa/magenta).
- Fotografías de galería y hero: **stock generado** (`scripts/generate-gallery.mjs`, sharp), no labores reales.
- Testimonios: **ficticios** (`src/lib/data/testimonials.ts`), deben reemplazarse por reseñas reales con permiso.
- Widget WhatsApp con número placeholder `569XXXXXXXX`.
- El demo NO tiene: métricas de negocio reales, reservas reales, integración de pago, backend.

## Product Principles

1. **Vender en 5 segundos.** La primera pantalla debe transmitir premium/glamour y que "aquí se reserva", no solo que se ve bonito.
2. **La conversión existe de verdad en el demo.** El agente y el WhatsApp funcionan de punta a punta; un cliente del servicio debe poder probarlos él mismo.
3. **Mobile-first hasta las consecuencias.** CTA sticky y flujo de reserva impecables en móvil; desktop es el refuerzo.
4. **Un clon por cliente.** Cambiar marca, precios y contacto debe ser tocar un archivo de datos (por eso `site.ts`/`services.ts` centralizan todo).
5. **El diseño es parte de la oferta técnica.** El sistema de diseño oscuro/brillante y las animaciones demuestran capacidad, no decoración.

## Accessibility & Inclusion

- Lenguaje del sitio: español (CL).
- Objetivo auditoría: Lighthouse móvil ≥90 en Performance/A11y/Best Practices/SEO.
- Contraste AA ≥4.5:1 sobre fondos oscuros; `prefers-reduced-motion` respetado en todas las animaciones (nativo en `fluid-orb` + `MotionConfig reducedMotion="user"`).
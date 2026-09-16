# 05 · Agente de Reservas IA + WhatsApp

## 1. Objetivo (F5 + F6)

Un **chat de reservas** embebido en la landing que guía a la clienta en lenguaje natural hasta generar un mensaje de WhatsApp **prellenado** con la solicitud formal. "IA" en la demo = asistente conversacional con reglas + redacción natural (sin backend LLM), con camino de upgrade definido.

## 2. UI

- **Widget:** tarjeta `glass` (fondo `#120A17/70%` + `backdrop-blur`) en S6 + launcher flotante opcional.
- **Avatar del agente:** `matrix-orb` de rare-ui (estados idle/listening/thinking) — coherente con `fluid-orb` del hero.
- Mensajes: burbujas agente (borde `--muted`) / clienta (`--primary`).
- **Sugerencias rápidas (chips):** los 6 servicios con precio → selección en 1 tap (móvil-first).
- `role="log"`, `aria-live="polite"`, foco gestionado, `scroll-area` auto-roll.
- Microanimaciones con motion: entrada de mensajes (fade+y, 200 ms).

## 3. Flujo (máquina de estados `agent-machine.ts`)

```
idle ──▶ greet ──▶ choose_service ──▶ choose_date ──▶ collect_name
   ──▶ collect_phone(opcional) ──▶ confirm ──▶ handoff_whatsapp
                ▲                                   │
                └────── "editar/cambiar" ◀──────────┘
```

| Estado | Agente pregunta | Entrada clienta | Validación |
|--------|-----------------|-----------------|------------|
| `choose_service` | "¿Qué servicio te provoca hoy?" | chip o texto ("soft gel", "uñas"...) | matching por sinónimos; error → sugerir chips |
| `choose_date` | "¿Para cuándo lo quieres?" | "viernes", "mañana 3pm", "20/09" | parseo relativo → fecha ISO; rango: hoy→+30 días; fuera de horario → "¿te va X?" |
| `collect_name` | "¿Con qué nombre te reservo?" | texto libre | ≥ 2 caracteres |
| `confirm` | resumen en tarjeta con precio/duración + botones `Confirmar por WhatsApp` / `Editar` | botón | — |
| `handoff_whatsapp` | "¡Listo! Te llevo a WhatsApp " | — | abre `wa.me` (nueva pestaña) |

**NLU de la demo (reglas):** normalización (minúsculas, quitar acentos), tabla de sinónimos de servicios (`uñas→manicure`, `acrilico→soft gel`, `afrancesada→francesa`...), regex de fechas/días semana, números de teléfono CL (`+56 9 XXXX XXXX`). Respuestas con variaciones aleatorias de tono (magnetica, cercana, "tú" chileno moderado).

## 4. Handoff a WhatsApp

```ts
// whatsapp-link.ts
const PHONE = "569XXXXXXXX"; // TODO número real del negocio
export function buildBookingMessage(b: BookingDraft) {
  const text =
    `Hola Magnetica Beauty Bar ✨ Quiero reservar:\n` +
    `• Servicio: ${b.service.name} ($${b.service.priceCLP.toLocaleString("es-CL")})\n` +
    `• Fecha sugerida: ${b.dateLabel}\n` +
    `• Nombre: ${b.name}\n` +
    (b.phone ? `• Contacto: ${b.phone}\n` : "") +
    `Enviado desde la web 💅`;
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
}
```

- `target="_blank" rel="noopener noreferrer"`, `aria-label="Confirmar reserva por WhatsApp"`.
- **CTA WhatsApp directo** (sin agente): hero, contacto, botón flotante → mensaje genérico prellenado (`"Hola ✨ quiero información sobre manicure"`).
- La confirmación **final siempre la hace la esteticista** por WhatsApp (la demo no bloquea agenda).

## 5. Persistencia / analítica (demo)

- `sessionStorage["magnetica:booking"]` para recuperar borrador si recarga.
- Eventos `console.info` (stub) por estado → reemplazables por GA/Vercel Analytics en producción.

## 6. Upgrade path (fuera de la demo)

1. **LLM real:** Worker de Cloudflare con Workers AI (`@cf/meta/llama-3.1-8b`) o endpoint propio → reemplazar `respond()` en `agent-machine.ts`; la UI no cambia.
2. **Calendario real:** integrar Tables/Agenda (Stripe/Cal.com/Google Calendar API) → disponibilidad en `choose_date`.
3. **Notificaciones al negocio:** Email Workers / Cloudflare Email Sending al confirmar.
4. **i18n** si se requiere.

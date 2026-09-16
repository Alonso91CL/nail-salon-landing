import { services, type Service } from "@/lib/data/services";
import { CLP } from "@/lib/data/site";
import { answerFaq } from "@/lib/agent/faq";
import { listBookings, type Booking } from "@/lib/agent/booking-store";

export type AgentStep =
  | "idle"
  | "choose_service"
  | "choose_date"
  | "collect_name"
  | "confirm"
  | "handoff"
  | "review_bookings"
  | "cancel_confirm";

export type BookingDraft = {
  service?: Service;
  dateISO?: string;
  dateLabel?: string;
  name?: string;
  phone?: string;
};

export type AgentResult = {
  step: AgentStep;
  draft: BookingDraft;
  reply: string;
  pendingCancelId?: string;
};

export const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

export function isRestartIntent(text: string): boolean {
  const n = normalize(text);
  return /(reinicia|resetea|empeza?r (de nuevo|de cero|otra vez)|comenza?r (de nuevo|de cero)|nueva conversaci|nuevo chat|borra(?:r)? (?:la )?conversaci|l[íi]mpia(?:r)? (?:la )?conversaci|volver a empezar|desde cero)/.test(
    n,
  );
}

export function isBookingListIntent(text: string): boolean {
  const n = normalize(text);
  return /(mis reservas|mis citas|tengo reserva|ver reservas|mis turnos)/.test(n);
}

export function isCancelIntent(text: string): boolean {
  const n = normalize(text);
  return /(cancelar|anular|borrar reserva|eliminar reserva)/.test(n);
}

export function isNewBookingIntent(text: string): boolean {
  const n = normalize(text);
  return /(nueva reserva|agendar|reservar|hacer una reserva|quiero reservar)/.test(n);
}

export function isPositiveIntent(text: string): boolean {
  const n = normalize(text);
  return /^(si|dale|ok|yes|claro|por supuesto|obvio|va|vamos|listo|perfecto|genial)$/i.test(n);
}

const DAYS = [
  "domingo",
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado",
];

const DATE_HINT =
  "No te entendí la fecha 🙈 Prueba con: «mañana 3 pm», «viernes 10:00» o «20/09 a las 15 hrs».";

function findService(text: string): Service | undefined {
  const n = normalize(text);
  for (const service of services) {
    if (service.keywords.some((k) => n.includes(normalize(k)))) return service;
  }
  return undefined;
}

function findDate(text: string, now: Date): { iso: string; label: string } | null {
  const n = normalize(text);
  const date = new Date(now);
  date.setHours(0, 0, 0, 0);

  let matched = false;

  const dayIdx = DAYS.findIndex((d) => n.includes(d));
  if (n.includes("manana")) {
    date.setDate(date.getDate() + 1);
    matched = true;
  } else if (n.includes("hoy")) {
    matched = true;
  } else if (dayIdx >= 0) {
    let delta = (dayIdx - date.getDay() + 7) % 7;
    if (delta === 0) delta = 7;
    if (n.includes("proximo") || n.includes("otro")) delta += 7;
    date.setDate(date.getDate() + delta);
    matched = true;
  } else {
    const ddmm = n.match(/(\d{1,2})[\/-](\d{1,2})(?:[\/-](\d{2,4}))?/);
    if (ddmm) {
      const day = Number(ddmm[1]);
      const month = Number(ddmm[2]) - 1;
      const year = ddmm[3]
        ? Number(ddmm[3].length === 2 ? `20${ddmm[3]}` : ddmm[3])
        : date.getFullYear();
      const candidate = new Date(year, month, day);
      if (candidate < now && !ddmm[3]) candidate.setFullYear(candidate.getFullYear() + 1);
      date.setTime(candidate.getTime());
      matched = true;
    }
  }

  if (!matched) return null;

  let timeText = n;
  const ddmmMatch = n.match(/(\d{1,2})[\/-](\d{1,2})(?:[\/-](\d{2,4}))?/);
  if (ddmmMatch) timeText = n.replace(ddmmMatch[0], " ");

  const hm = timeText.match(/(\d{1,2})[:.](\d{2})/);
  const bare = hm ? null : timeText.match(/(\d{1,2})\s*(am|pm|hrs|hr|h)?/);
  if (hm || bare) {
    let hour = Number(hm ? hm[1] : bare![1]);
    const minute = hm ? Number(hm[2]) : 0;
    const suffix = normalize(hm ? "" : (bare![2] ?? ""));
    if (suffix === "am" && hour === 12) hour = 0;
    else if ((suffix === "pm" || (suffix !== "am" && hour <= 7)) && hour < 12) hour += 12;
    if (hour < 24 && minute < 60) date.setHours(hour, minute, 0, 0);
  } else {
    date.setHours(15, 0, 0, 0);
  }

  const iso = date.toISOString();
  const label = new Intl.DateTimeFormat("es-CL", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

  const max = new Date(now);
  max.setDate(max.getDate() + 30);
  if (date < now || date > max) return null;

  return { iso, label };
}

function findPhone(text: string): string | undefined {
  const match = text.match(/(\+?56\s?)?(9\s?)?\d{4}[\s-]?\d{4}/);
  return match?.[0]?.replace(/\s/g, "");
}

const askName = (draft: BookingDraft) =>
  `Genial: ${draft.service?.name} para ${draft.dateLabel}. ¿Con qué nombre te reservo?`;

export const summary = (draft: BookingDraft) =>
  [
    `Resumen de tu reserva 💅`,
    `• Servicio: ${draft.service?.name} (${CLP(draft.service?.priceCLP ?? 0)}, ~${draft.service?.durationMin} min)`,
    `• Fecha sugerida: ${draft.dateLabel}`,
    `• Nombre: ${draft.name}`,
    draft.phone ? `• Contacto: ${draft.phone}` : "",
    `Confirma por WhatsApp y la esteticista ajusta la hora contigo. ¿Confirmamos?`,
  ]
    .filter(Boolean)
    .join("\n");

function activeBookings() {
  return listBookings().filter((b) => b.status !== "cancelled");
}

function formatBookingsList(): string {
  const bookings = activeBookings();
  if (!bookings.length) return "No tienes reservas registradas. ¿Quieres agendar una?";
  const lines = bookings.map((b, idx) => {
    const statusLabel =
      b.status === "pending"
        ? "Pendiente"
        : b.status === "confirmed"
          ? "Confirmada"
          : "Cancelada";
    return `${idx + 1}. ${b.draft.service?.name} — ${b.draft.dateLabel} (${statusLabel})`;
  });
  return `Tus reservas:\n${lines.join("\n")}\n\nDime el número de la reserva a cancelar.`;
}

function findBookingBySelection(text: string): Booking | undefined {
  const bookings = activeBookings();
  const match = text.match(/^(\d+)$/);
  if (match) {
    const idx = Number(match[1]) - 1;
    return bookings[idx];
  }
  return undefined;
}

export function start(step: AgentStep = "idle"): AgentResult {
  return {
    step,
    draft: {},
    reply: "¡Hola! ✨ Soy Magnetita. Puedo ayudarte con:\n• Hacer una nueva reserva\n• Ver tus reservas\n• Cancelar una cita\n• Responder preguntas (horarios, precios…)\n\n¿Qué necesitas?",
  };
}

export function prefillService(serviceId: string, prev: AgentResult): AgentResult {
  const service = services.find((s) => s.id === serviceId);
  if (!service) return prev;
  return {
    step: "choose_date",
    draft: { ...prev.draft, service },
    reply: `${service.name} (${CLP(service.priceCLP)}, ~${service.durationMin} min) 😍 ¿Para cuándo lo quieres? (ej: mañana 3 pm)`,
  };
}

export function respond(
  prev: AgentResult,
  userText: string,
  now: Date = new Date(),
): AgentResult {
  const n = normalize(userText);

  if (prev.step === "cancel_confirm") {
    if (/(si|dale|ok|confirm|yes)/.test(n) && prev.pendingCancelId) {
      const booking = listBookings().find((b) => b.id === prev.pendingCancelId);
      if (booking) {
        return {
          step: "handoff",
          draft: { name: booking.draft.name, phone: booking.draft.phone },
          reply: `Listo. Te envío el enlace para cancelar la reserva de ${booking.draft.service?.name} (${booking.draft.dateLabel}). Confirma con la esteticista por WhatsApp.`,
          pendingCancelId: prev.pendingCancelId,
        };
      }
    }
    return {
      step: "idle",
      draft: { name: prev.draft.name, phone: prev.draft.phone },
      reply: "Perfecto, no cancelamos nada. ¿En qué más te puedo ayudar?",
    };
  }

  if (prev.step === "review_bookings") {
    const booking = findBookingBySelection(userText);
    if (booking) {
      return {
        step: "cancel_confirm",
        draft: { name: prev.draft.name, phone: prev.draft.phone },
        reply: `¿Cancelar reserva de ${booking.draft.service?.name} el ${booking.draft.dateLabel}?`,
        pendingCancelId: booking.id,
      };
    }
    if (/(volver|atras|no|menu|inicio)/.test(n)) {
      return {
        step: "idle",
        draft: { name: prev.draft.name, phone: prev.draft.phone },
        reply: "¿En qué más te puedo ayudar?",
      };
    }
    return {
      step: "review_bookings",
      draft: prev.draft,
      reply: "No entendí. Dime el número de la reserva a cancelar o «Volver».",
    };
  }

  if (prev.step === "handoff") {
    if (/(editar|cambiar|otra)/.test(n)) {
      return {
        step: "choose_service",
        draft: { name: prev.draft.name, phone: prev.draft.phone },
        reply: "Sin problema. ¿Qué cambio quieres? Elige un servicio:",
      };
    }
    if (isBookingListIntent(n)) {
      return {
        step: "review_bookings",
        draft: { name: prev.draft.name, phone: prev.draft.phone },
        reply: formatBookingsList(),
      };
    }
    if (isNewBookingIntent(n)) {
      return {
        step: "choose_service",
        draft: { name: prev.draft.name, phone: prev.draft.phone },
        reply: "¡Vamos! Elige un servicio:",
      };
    }
    const faq = answerFaq(userText);
    if (faq) {
      return {
        step: "handoff",
        draft: prev.draft,
        reply: `${faq}\n\n¿Necesitas algo más?`,
      };
    }
    return {
      step: "handoff",
      draft: prev.draft,
      reply: "Tu enlace de confirmación está arriba. ✨ Nos vemos en WhatsApp. ¿Puedo ayudarte con algo más?",
    };
  }

  if (prev.step === "confirm") {
    if (/(confirm|si|dale|listo|ok)/.test(n)) {
      return { step: "handoff", draft: prev.draft, reply: "¡Reserva guardada! Te llevo a WhatsApp para confirmar 👇" };
    }
    if (/(editar|cambiar)/.test(n)) {
      return {
        step: "choose_service",
        draft: { name: prev.draft.name, phone: prev.draft.phone },
        reply: "Claro, empecemos de nuevo. ¿Qué servicio?",
      };
    }
    return { step: "confirm", draft: prev.draft, reply: "¿Confirmamos por WhatsApp o quieres editar algo?" };
  }

  if (prev.step === "choose_service") {
    const service = findService(userText);
    if (!service) {
      return {
        step: "choose_service",
        draft: prev.draft,
        reply: "Mmm, no tengo ese servicio 🙈 Elige una de las opciones o dime «manicure», «soft gel», «nail art»…",
      };
    }
    return {
      step: "choose_date",
      draft: { ...prev.draft, service },
      reply: `${service.name} (${CLP(service.priceCLP)}, ~${service.durationMin} min) 😍 ¿Para cuándo lo quieres? (ej: mañana 3 pm)`,
    };
  }

  if (prev.step === "choose_date") {
    const date = findDate(userText, now);
    if (!date) {
      return { step: "choose_date", draft: prev.draft, reply: DATE_HINT };
    }
    return {
      step: "collect_name",
      draft: { ...prev.draft, dateISO: date.iso, dateLabel: date.label },
      reply: askName({ ...prev.draft, dateLabel: date.label }),
    };
  }

  if (prev.step === "collect_name") {
    const name = userText.replace(/\s+/g, " ").trim();
    if (name.length < 2) {
      return {
        step: "collect_name",
        draft: prev.draft,
        reply: "Necesito un nombre de al menos 2 letras 💅",
      };
    }
    const draft: BookingDraft = { ...prev.draft, name, phone: prev.draft.phone ?? findPhone(userText) };
    return { step: "confirm", draft, reply: summary(draft) };
  }

  // idle
  if (isBookingListIntent(n)) {
    const bookings = listBookings();
    if (!bookings.length) {
      return {
        step: "idle",
        draft: prev.draft,
        reply: "No tienes reservas registradas. ¿Quieres agendar una?",
      };
    }
    return {
      step: "review_bookings",
      draft: prev.draft,
      reply: formatBookingsList(),
    };
  }

  if (isCancelIntent(n)) {
    const bookings = listBookings().filter((b) => b.status !== "cancelled");
    if (!bookings.length) {
      return {
        step: "idle",
        draft: prev.draft,
        reply: "No tienes reservas activas para cancelar. ¿Quieres agendar una?",
      };
    }
    return {
      step: "review_bookings",
      draft: prev.draft,
      reply: formatBookingsList(),
    };
  }

  if (isNewBookingIntent(n) || looksLikeNewBookingReply(n, prev)) {
    return {
      step: "choose_service",
      draft: prev.draft,
      reply: "¡Vamos! Elige un servicio:",
    };
  }

  const faq = answerFaq(userText);
  if (faq) {
    return {
      step: "idle",
      draft: prev.draft,
      reply: `${faq}\n\n¿En qué más te puedo ayudar?`,
    };
  }

  return {
    step: "idle",
    draft: prev.draft,
    reply: "No te entendí del todo 🙈 Puedo ayudarte con:\n• Hacer una reserva\n• Ver tus reservas\n• Cancelar una cita\n• Responder preguntas (horarios, precios…)",
  };
}

function looksLikeNewBookingReply(n: string, prev: AgentResult): boolean {
  if (!isPositiveIntent(n)) return false;
  const lastReply = prev.reply.toLowerCase();
  return (
    lastReply.includes("¿quieres agendar") ||
    lastReply.includes("quiere agendar") ||
    lastReply.includes("te gustaría agendar")
  );
}

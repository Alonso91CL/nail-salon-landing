import { site, CLP } from "@/lib/data/site";
import { services } from "@/lib/data/services";
import { listBookings } from "@/lib/agent/booking-store";

type FaqEntry = {
  pattern: RegExp;
  answer: () => string;
};

const entries: FaqEntry[] = [
  {
    pattern: /horario|abre|cierra|atiende|qué hora/,
    answer: () => {
      const lines = site.hours.map((h) => `• ${h.days}: ${h.time}`);
      return `Nuestros horarios:\n${lines.join("\n")}`;
    },
  },
  {
    pattern: /direccion|donde queda|ubicaci|dirección|queda en/,
    answer: () => `Estamos en ${site.address}.`,
  },
  {
    pattern: /precio|cuánto|vale|cuanto|costo|tarifa/,
    answer: () => {
      const lines = services.map(
        (s) => `• ${s.name}: ${CLP(s.priceCLP)} (~${s.durationMin} min)`,
      );
      return `Nuestros precios:\n${lines.join("\n")}`;
    },
  },
  {
    pattern: /pago|tarjeta|efectivo|transferencia|forma de pago|aceptan/,
    answer: () => "Aceptamos efectivo, transferencia y tarjeta en local.",
  },
  {
    pattern: /pol[ií]tica|cancelaci|reembolso|tolerancia|atraso/,
    answer: () =>
      "Si necesitas cancelar o cambiar, avísanos con al menos 24 hrs de anticipación por WhatsApp.",
  },
  {
    pattern: /reservas|tengo|mis citas|mis reservas|tengo reserva/,
    answer: () => {
      const bookings = listBookings();
      if (!bookings.length) return "No tienes reservas registradas. ¿Quieres agendar una?";
      const lines = bookings.map((b) => {
        const statusLabel =
          b.status === "pending"
            ? "Pendiente"
            : b.status === "confirmed"
              ? "Confirmada"
              : "Cancelada";
        return `• ${b.draft.service?.name} — ${b.draft.dateLabel} (${statusLabel})`;
      });
      return `Tus reservas:\n${lines.join("\n")}`;
    },
  },
  {
    pattern: /instagram|insta|redes|social/,
    answer: () => `Síguenos en Instagram: ${site.instagram}`,
  },
];

export function answerFaq(text: string): string | undefined {
  const normalized = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

  for (const entry of entries) {
    if (entry.pattern.test(normalized)) {
      return entry.answer();
    }
  }
  return undefined;
}

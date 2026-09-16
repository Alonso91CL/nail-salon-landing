import { site } from "@/lib/data/site";
import { CLP } from "@/lib/data/site";
import type { BookingDraft } from "@/lib/agent/agent-machine";
import type { Booking } from "@/lib/agent/booking-store";

export function isPhoneConfigured() {
  return !site.whatsappPhone.includes("X");
}

export function buildBookingUrl(draft: BookingDraft) {
  const text = [
    `Hola ${site.name} ✨ Quiero reservar:`,
    `• Servicio: ${draft.service?.name} (${draft.service ? CLP(draft.service.priceCLP) : ""})`,
    `• Fecha sugerida: ${draft.dateLabel}`,
    `• Nombre: ${draft.name}`,
    draft.phone ? `• Contacto: ${draft.phone}` : "",
    `Enviado desde la web 💅`,
  ]
    .filter(Boolean)
    .join("\n");
  return `https://wa.me/${site.whatsappPhone}?text=${encodeURIComponent(text)}`;
}

export function buildCancelUrl(booking: Booking) {
  const text = [
    `Hola ${site.name} ✨ Quiero cancelar mi reserva:`,
    `• Servicio: ${booking.draft.service?.name}`,
    `• Fecha: ${booking.draft.dateLabel}`,
    `• Nombre: ${booking.draft.name}`,
    booking.draft.phone ? `• Contacto: ${booking.draft.phone}` : "",
    `Enviado desde la web 💅`,
  ]
    .filter(Boolean)
    .join("\n");
  return `https://wa.me/${site.whatsappPhone}?text=${encodeURIComponent(text)}`;
}

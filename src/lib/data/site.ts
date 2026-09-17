export const site = {
  name: "Magnetica Beauty Bar",
  tagline: "Uñas que hipnotizan",
  description:
    "Manicure, soft gel y nail art de autor en San Bernardo. Diseñamos la versión más magnética de ti.",
  // TODO(demo): reemplazar por datos reales del negocio
  whatsappPhone: "569XXXXXXXX",
  address: "San Bernardo, Santiago, Chile",
  attention: "Atención con cita",
  instagram: "https://www.instagram.com/magnetica.beautybar",
  hours: [
    { days: "Lunes a viernes", time: "10:00 – 20:00" },
    { days: "Sábado", time: "10:00 – 18:00" },
    { days: "Domingo y festivos", time: "Cerrado" },
  ],
  nav: [
    { label: "Servicios", href: "#servicios" },
    { label: "Galería", href: "#galeria" },
    { label: "Testimonios", href: "#testimonios" },
    { label: "Reservar", href: "#reservar" },
    { label: "Contacto", href: "#contacto" },
  ],
} as const;

export function whatsappUrl(message: string) {
  return `https://wa.me/${site.whatsappPhone}?text=${encodeURIComponent(message)}`;
}

export const whatsappGeneralUrl = () =>
  whatsappUrl(`Hola ${site.name} ✨ quiero información sobre manicure`);

export const CLP = (amount: number) =>
  `$${amount.toLocaleString("es-CL")}`;

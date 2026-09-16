export type Testimonial = {
  quote: string;
  name: string;
  age: number;
  initials: string;
};

// TODO(demo): testimonios ficticios; reemplazar por reseñas reales con permiso
export const testimonials: Testimonial[] = [
  {
    quote:
      "El nail art con estrellas cromadas que me hizo es de otro planeta. Todos preguntan.",
    name: "Vale",
    age: 24,
    initials: "V",
  },
  {
    quote: "Reservé por WhatsApp en 2 minutos y salí hipnotizada.",
    name: "Cata",
    age: 31,
    initials: "C",
  },
  {
    quote: "Mi primera vez con semipermanente y duró 3 semanas intacto.",
    name: "Jime",
    age: 27,
    initials: "J",
  },
];

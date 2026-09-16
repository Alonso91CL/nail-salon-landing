import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading, SectionShell } from "@/components/decor/section-shell";

const faqs = [
  {
    q: "¿Cómo reservo?",
    a: "Con el asistente de reservas de esta web (botón Reservar) o directo por WhatsApp. Te confirmamos hora y disponibilidad al instante.",
    value: "como",
  },
  {
    q: "¿Cuánto dura el semipermanente?",
    a: "De 2 a 3 semanas impecable si sigues los cuidados: guantes para limpiar, no usar las uñas de abridor y reaplicar aceite de cutícula.",
    value: "duracion",
  },
  {
    q: "¿Traigo mi diseño de referencia?",
    a: "¡Sí! Capturas de Pinterest/Instagram son bienvenidas. Lo adaptamos al largo y forma de tus uñas naturales.",
    value: "referencia",
  },
  {
    q: "Política de hora",
    a: "Tolerancia de 10 minutos. Si necesitas reagendar, avísanos por WhatsApp con 4 h de anticipación sin costo.",
    value: "politica",
  },
];

export function Info() {
  return (
    <SectionShell id="info" titleId="info-title" className="max-w-3xl">
      <SectionHeading id="info-title" eyebrow="Información" title="Antes de tu cita" />
      <Accordion className="divide-y divide-border/60">
        {faqs.map((faq) => (
          <AccordionItem key={faq.value} value={faq.value}>
            <AccordionTrigger className="text-left font-medium text-base">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SectionShell>
  );
}

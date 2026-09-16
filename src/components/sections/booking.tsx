import { MessageCircle } from "lucide-react";
import { BookingAgent } from "@/components/agent/booking-agent";
import { SectionHeading, SectionShell } from "@/components/decor/section-shell";
import { Button } from "@/components/ui/button";
import { HeroOrb } from "@/components/orb/hero-orb";
import { whatsappGeneralUrl } from "@/lib/data/site";

export function Booking() {
  return (
    <SectionShell id="reservar" titleId="reservar-title" className="relative max-w-4xl">
      <HeroOrb
        color="#8B5CF6"
        label="Orbe decorativo lavanda"
        className="pointer-events-none absolute -top-10 right-0 -z-10 hidden opacity-40 blur-[1px] md:block"
        size={180}
      />
      <SectionHeading
        id="reservar-title"
        eyebrow="Reservas"
        title="Reserva con Magnetita"
        subtitle="Nuestra asistente arma tu cita en un minuto y te lleva directo a WhatsApp para confirmar."
      />
      <BookingAgent />
      <p className="mt-6 flex items-center justify-center gap-2 text-center text-sm text-muted-foreground">
        ¿Prefieres lo clásico?
        <Button
          render={
            <a href={whatsappGeneralUrl()} target="_blank" rel="noopener noreferrer" />
          }
          variant="link"
          size="sm"
          className="text-primary-glow"
        >
          <MessageCircle aria-hidden="true" />
          Escribir directo por WhatsApp
        </Button>
      </p>
    </SectionShell>
  );
}

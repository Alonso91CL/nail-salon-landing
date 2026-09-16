import { AtSign, Clock, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading, SectionShell } from "@/components/decor/section-shell";
import { site, whatsappGeneralUrl } from "@/lib/data/site";

export function Contact() {
  return (
    <SectionShell id="contacto" titleId="contacto-title">
      <SectionHeading
        id="contacto-title"
        eyebrow="Contacto"
        title="Encuéntranos en San Bernardo"
      />
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="glass-card border-border/60 bg-transparent">
          <CardHeader>
            <CardTitle className="font-display text-xl">Horario y ubicación</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <ul className="flex flex-col gap-2 text-sm" role="list">
              <li className="flex items-center gap-2">
                <MapPin aria-hidden="true" className="size-4 shrink-0 text-primary-glow" />
                {site.address}
                <span className="text-muted-foreground">(atención solo con cita)</span>
              </li>
              {site.hours.map((h) => (
                <li key={h.days} className="flex items-center gap-2">
                  <Clock aria-hidden="true" className="size-4 shrink-0 text-primary-glow" />
                  <span>{h.days}:</span>
                  <span className="tabular-nums text-muted-foreground">{h.time}</span>
                </li>
              ))}
            </ul>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary-glow hover:underline"
            >
              <AtSign aria-hidden="true" className="size-4" />
              @magnetica.beautybar
            </a>
          </CardContent>
        </Card>

        <Card className="glass-card flex flex-col justify-between border-border/60 bg-transparent">
          <div
            aria-hidden="true"
            className="relative h-full min-h-40 overflow-hidden rounded-xl border border-border/60 bg-[linear-gradient(rgba(255,61,154,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,61,154,0.08)_1px,transparent_1px)] bg-[size:32px_32px]"
          >
            <MapPin
              className="absolute top-1/2 left-1/2 size-8 -translate-x-1/2 -translate-y-1/2 text-primary-glow drop-shadow-[0_0_12px_var(--primary-glow)]"
              aria-hidden="true"
            />
            <span className="absolute bottom-2 left-2 text-xs text-muted-foreground">
              TODO(demo): embeber mapa real
            </span>
          </div>
          <div className="pt-4">
            <Button
              render={
                <a href={whatsappGeneralUrl()} target="_blank" rel="noopener noreferrer" />
              }
              size="lg"
              className="glow-magenta w-full"
            >
              <MessageCircle aria-hidden="true" />
              Escribir por WhatsApp
            </Button>
          </div>
        </Card>
      </div>
    </SectionShell>
  );
}

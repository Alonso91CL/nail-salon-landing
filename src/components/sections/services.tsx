"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading, SectionShell } from "@/components/decor/section-shell";
import { services } from "@/lib/data/services";
import { CLP } from "@/lib/data/site";
import { requestPrefill } from "@/lib/prefill";

export function Services() {
  return (
    <SectionShell id="servicios" titleId="servicios-title">
      <SectionHeading
        id="servicios-title"
        eyebrow="Servicios"
        title="Elige tu magnitismo"
        subtitle="Desde la clásica impecable hasta nail art de autor. Todos los precios en CLP."
      />
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <li key={service.id}>
              <Card className="glass-card h-full gap-3 border-border/60 bg-transparent">
                <CardHeader>
                  <span className="grid size-10 place-items-center rounded-full border border-primary/50 bg-primary/15 text-primary-glow">
                    <Icon aria-hidden="true" />
                  </span>
                  <CardTitle className="line-clamp-1 font-display text-xl">{service.name}</CardTitle>
                  <CardDescription className="line-clamp-2 min-h-[2lh]">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="grow">
                  <p className="font-semibold text-lg tabular-nums">
                    {CLP(service.priceCLP)}
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      · {service.durationMin >= 60
                        ? `${Math.round(service.durationMin / 60 * 10) / 10} h`
                        : `${service.durationMin} min`}
                    </span>
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => requestPrefill(service.id)}
                    aria-label={`Reservar ${service.name}`}
                  >
                    Reservar
                  </Button>
                </CardFooter>
              </Card>
            </li>
          );
        })}
      </ul>
    </SectionShell>
  );
}

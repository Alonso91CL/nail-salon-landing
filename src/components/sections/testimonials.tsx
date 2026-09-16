"use client";

import { Quote } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SectionHeading, SectionShell } from "@/components/decor/section-shell";
import { testimonials } from "@/lib/data/testimonials";

export function Testimonials() {
  return (
    <SectionShell id="testimonios" titleId="testimonios-title" className="max-w-4xl">
      <SectionHeading
        id="testimonios-title"
        eyebrow="Testimonios"
        title="Clientas hipnotizadas"
      />
      <Carousel
        opts={{ align: "center", loop: true }}
        aria-label="Reseñas de clientas"
      >
        <CarouselContent>
          {testimonials.map((t, i) => (
            <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
              <Card className="glass-card h-full border-border/60 bg-transparent">
                <CardContent className="flex flex-col gap-4">
                  <Quote aria-hidden="true" className="size-6 text-primary-glow" />
                  <blockquote className="text-pretty italic">“{t.quote}”</blockquote>
                  <figcaption className="mt-auto flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary/20 text-primary-glow">
                        {t.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      {t.name}, {t.age}
                    </span>
                  </figcaption>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-6 flex items-center justify-center gap-4">
          <CarouselPrevious className="static inset-auto" aria-label="Testimonio anterior" />
          <CarouselNext className="static inset-auto" aria-label="Testimonio siguiente" />
        </div>
      </Carousel>
    </SectionShell>
  );
}

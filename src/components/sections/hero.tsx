import { MessageCircle } from "lucide-react";
import Image from "next/image";
import { HeroOrb } from "@/components/orb/hero-orb";
import { Sparkles } from "@/components/decor/sparkles";
import { Button } from "@/components/ui/button";
import { site, whatsappGeneralUrl } from "@/lib/data/site";

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_20%,color-mix(in_srgb,var(--primary)_18%,transparent),transparent_70%)]"
      />
      <Sparkles />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-10 px-4 pt-14 pb-20 sm:px-6 md:flex-row md:justify-between md:pt-20 md:pb-28">
        <div className="flex max-w-xl flex-col items-start gap-6">
          <p className="text-sm font-semibold tracking-[0.28em] text-primary-glow uppercase">
            {site.address}
          </p>
          <h1
            id="hero-title"
            className="font-display text-5xl leading-[1.05] font-semibold text-balance sm:text-6xl lg:text-7xl"
          >
            Uñas que{" "}
            <span className="text-primary-glow text-glow italic">hipnotizan</span>.
          </h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Manicure, soft gel y nail art de autor en San Bernardo. Diseñamos la
            versión más magnética de ti.
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button
              render={<a href="#reservar" />}
              size="lg"
              className="glow-magenta h-12 px-8 text-base"
            >
              Reservar ahora
            </Button>
            <Button
              render={
                <a href={whatsappGeneralUrl()} target="_blank" rel="noopener noreferrer" />
              }
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base"
            >
              <MessageCircle aria-hidden="true" />
              Escribir por WhatsApp
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Lun–Vie 10–20 h · Sáb 10–18 h · Atención con y sin hora
          </p>
        </div>

        <div className="relative w-full max-w-md shrink-0 md:max-w-lg">
          <HeroOrb
            size={220}
            label="Orbe animado magenta representando el estilo magnético del salón"
            className="absolute -top-8 -right-8 -z-10 md:-top-12 md:-right-12"
          />
          <div className="glass-card rounded-3xl p-2 md:p-3">
            <Image
              src="/images/hero-manicure.webp"
              alt="Manos con uñas esculpidas en forma de almendra: esmalte rojo borgoña con líneas doradas, francesas nude y detalles en glitter dorado"
              width={1254}
              height={1254}
              priority
              sizes="(min-width: 768px) 40vw, 90vw"
              className="h-auto w-full rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

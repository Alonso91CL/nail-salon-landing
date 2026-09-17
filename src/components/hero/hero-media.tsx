"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { HeroOrb } from "@/components/orb/hero-orb";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HeroMedia() {
  const reduce = useReducedMotion();

  return (
    <div className="relative w-full max-w-sm shrink-0 md:max-w-md lg:max-w-lg">
      <HeroOrb
        label="Orbe animado magenta representando el estilo magnético del salón"
        className="absolute -top-16 -right-10 z-0 md:-top-20 md:-right-12 lg:-top-24 lg:-right-16"
      />
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.94, filter: "blur(12px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
        className="relative z-10 overflow-hidden rounded-2xl border border-border/60"
      >
        <Image
          src="/images/hero-manicure.webp"
          alt="Manos con uñas esculpidas en forma de almendra: esmalte rojo borgoña con líneas doradas, francesas nude y detalles en glitter dorado"
          width={1254}
          height={1254}
          priority
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="h-auto w-full"
        />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute -right-2 -bottom-5 z-20 grid size-20 place-items-center rounded-full border border-accent/50 bg-background/80 backdrop-blur-sm md:size-24 md:-right-5"
        style={{
          boxShadow: "0 0 22px color-mix(in srgb, var(--accent) 20%, transparent)",
        }}
      >
        <div className="animate-m-seal absolute inset-1.5 rounded-full border border-dashed border-accent/40" />
        <span className="font-display text-2xl font-semibold text-accent italic md:text-3xl">
          M
        </span>
      </div>
    </div>
  );
}
"use client";

import { MessageCircle } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Button } from "@/components/ui/button";
import { site, whatsappGeneralUrl } from "@/lib/data/site";

const EASE = [0.16, 1, 0.3, 1] as const;

const HEADLINE_WORDS = ["Uñas", "que", "hipnotizan."];

function useFocalVariants(reduce: boolean) {
  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.09,
        delayChildren: reduce ? 0 : 0.1,
      },
    },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  };
  const word: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 12, filter: reduce ? "none" : "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.55, ease: EASE },
    },
  };
  return { container, item, word };
}

export function HeroIntro() {
  const reduce = useReducedMotion();
  const { container, item, word } = useFocalVariants(reduce || false);

  return (
    <motion.div
      variants={container}
      initial={reduce ? false : "hidden"}
      animate="show"
      className="flex max-w-xl flex-col items-start gap-6"
    >
      <h1
        id="hero-title"
        className="font-display text-5xl leading-[1.05] font-semibold text-balance sm:text-6xl lg:text-7xl"
      >
        {HEADLINE_WORDS.map((part, i) => (
          <motion.span
            key={part}
            variants={word}
            className={i === HEADLINE_WORDS.length - 1 ? "text-primary-glow text-glow italic" : "inline-block"}
          >
            {i === 0 ? "" : " "}
            {part}
          </motion.span>
        ))}
      </h1>

      <motion.p variants={item} className="text-lg text-muted-foreground text-pretty">
        Manicure, soft gel y nail art de autor en San Bernardo. Diseñamos la
        versión más magnética de ti.
      </motion.p>

      <motion.div
        variants={item}
        className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
      >
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
      </motion.div>

      <motion.p variants={item} className="text-xs text-muted-foreground">
        {site.address} · {site.attention} · Lun–Vie 10–20 h · Sáb 10–18 h
      </motion.p>
    </motion.div>
  );
}
"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

type SectionShellProps = HTMLMotionProps<"section"> & {
  titleId: string;
};

export function SectionShell({
  titleId,
  className,
  children,
  ...props
}: SectionShellProps) {
  const reduce = useReducedMotion();
  return (
    <motion.section
      aria-labelledby={titleId}
      {...props}
      className={cn("relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24", className)}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  className,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <header className={cn("mb-10 flex flex-col items-center gap-3 text-center md:mb-14", className)}>
      {eyebrow ? (
        <p className="text-sm font-semibold tracking-[0.2em] text-primary-glow uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="font-display text-3xl font-semibold text-balance sm:text-4xl md:text-5xl"
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="max-w-2xl text-muted-foreground text-pretty">{subtitle}</p>
      ) : null}
    </header>
  );
}

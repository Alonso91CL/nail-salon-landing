"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SectionHeading, SectionShell } from "@/components/decor/section-shell";
import { Sparkles } from "@/components/decor/sparkles";
import { requestPrefill } from "@/lib/prefill";
import { cn } from "@/lib/utils";

type Look = {
  id: string;
  label: string;
  alt: string;
  src: string;
  grid: string;
};

const looks: Look[] = [
  {
    id: "rojo-laca",
    label: "Rojo laca infinito",
    alt: "Set de uñas almendradas en rojo laca brillante con destello dorado",
    src: "/images/gallery/rojo-laca.webp",
    grid: "col-span-2 md:col-span-2 md:row-span-2",
  },
  {
    id: "francesa-estrella",
    label: "Francesa con estrella dorada",
    alt: "Uñas nude con punta francesa blanca y estrella dorada",
    src: "/images/gallery/francesa-estrella.webp",
    grid: "md:col-span-2",
  },
  {
    id: "cromo-verde",
    label: "Cromo verde esmeralda",
    alt: "Uñas cromadas verde esmeralda con brillo espejo",
    src: "/images/gallery/cromo-verde.webp",
    grid: "md:col-span-1",
  },
  {
    id: "lavanda-y2k",
    label: "Lavanda Y2K",
    alt: "Uñas lavanda perlado con destellos cromados estilo Y2K",
    src: "/images/gallery/lavanda-y2k.webp",
    grid: "col-span-2 md:col-span-1",
  },
  {
    id: "magenta-glitter",
    label: "Magenta glitter magnético",
    alt: "Uñas magenta con glitter dorado y blanco intenso",
    src: "/images/gallery/magenta-glitter.webp",
    grid: "md:col-span-2",
  },
  {
    id: "negro-cromo",
    label: "Negro cromo con destellos",
    alt: "Uñas negro cromo con destellos plateados en espejo",
    src: "/images/gallery/negro-cromo.webp",
    grid: "md:col-span-2",
  },
];

export function Gallery() {
  return (
    <SectionShell id="galeria" titleId="galeria-title">
      <div className="absolute inset-x-0 top-0 -z-10">
        <Sparkles count={4} />
      </div>
      <SectionHeading
        id="galeria-title"
        eyebrow="Galería"
        title="Nail art de autor"
        subtitle="Cada set es una pieza única. Estos looks son de ejemplo: el tuyo lo diseñamos juntas."
      />
      <ul
        className="grid grid-cols-2 auto-rows-[190px] gap-3 sm:auto-rows-[230px] md:grid-cols-4 md:auto-rows-[240px]"
        role="list"
      >
        {looks.map((look) => (
          <li key={look.id} className={cn("relative", look.grid)}>
            <figure className="group relative h-full w-full overflow-hidden rounded-2xl border border-border/60">
              <Image
                src={look.src}
                alt={look.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3">
                <span className="text-sm font-medium text-white drop-shadow">{look.label}</span>
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-11 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 max-md:opacity-100"
                  onClick={() => requestPrefill("nail-art")}
                >
                  Quiero este
                </Button>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}

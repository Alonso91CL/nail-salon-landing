import {
  Hand,
  Sparkles,
  Star,
  Wand2,
  Eraser,
  Waves,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  id: string;
  name: string;
  description: string;
  priceCLP: number;
  durationMin: number;
  icon: LucideIcon;
  keywords: string[];
};

export const services: Service[] = [
  {
    id: "manicure",
    name: "Manicure clásica",
    description: "Ideal y esmalte tradicional, impecable.",
    priceCLP: 12000,
    durationMin: 45,
    icon: Hand,
    keywords: ["manicure", "clasica", "tradicional", "esmalte", "unas"],
  },
  {
    id: "semipermanente",
    name: "Semipermanente",
    description: "Brillo y duración de hasta 3 semanas.",
    priceCLP: 18000,
    durationMin: 60,
    icon: Sparkles,
    keywords: ["semi", "semipermanente", "semiperm", "gelish"],
  },
  {
    id: "soft-gel",
    name: "Soft gel / esculpido",
    description: "Estructura y largo a tu medida.",
    priceCLP: 30000,
    durationMin: 90,
    icon: Wand2,
    keywords: ["soft gel", "softgel", "acrilico", "esculpid", "polygel", "gel"],
  },
  {
    id: "nail-art",
    name: "Nail art",
    description: "Cromados, francesas con estrella, Y2K y más.",
    priceCLP: 12000,
    durationMin: 25,
    icon: Star,
    keywords: ["nail art", "arte", "diseno", "diseño", "cromado", "francesa"],
  },
  {
    id: "retiro",
    name: "Retiro + cuidado",
    description: "Retiro seguro y tratamiento de cutícula.",
    priceCLP: 8000,
    durationMin: 30,
    icon: Eraser,
    keywords: ["retiro", "quitar", "remo", "cuidado", "cuticula"],
  },
  {
    id: "cabello",
    name: "Alisados / BTX",
    description: "Cabello lacio y sin frizz desde $40.000.",
    priceCLP: 40000,
    durationMin: 150,
    icon: Waves,
    keywords: ["alisado", "botox", "btx", "cabello", "keratina"],
  },
];

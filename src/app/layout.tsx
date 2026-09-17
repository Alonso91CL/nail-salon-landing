import type { Metadata } from "next";
import { Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://magnetica-beautybar.example.com"),
  title: {
    default: "Magnetica Beauty Bar — Uñas que hipnotizan",
    template: "%s · Magnetica Beauty Bar",
  },
  description:
    "Manicure, soft gel y nail art de autor en San Bernardo, Santiago. Diseñamos la versión más magnética de ti.",
  openGraph: {
    type: "website",
    locale: "es_CL",
    title: "Magnetica Beauty Bar — Uñas que hipnotizan",
    description:
      "Manicure, soft gel y nail art de autor en San Bernardo. Reserva con nuestra asistente y confirma por WhatsApp.",
  },
  robots: { index: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#reservar"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Ir a reservar
        </a>
        {children}
      </body>
    </html>
  );
}

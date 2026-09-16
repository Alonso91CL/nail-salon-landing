import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Booking } from "@/components/sections/booking";
import { Contact } from "@/components/sections/contact";
import { Gallery } from "@/components/sections/gallery";
import { Hero } from "@/components/sections/hero";
import { Info } from "@/components/sections/info";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { Providers } from "@/components/providers";
import { WhatsAppFab } from "@/components/whatsapp-fab";

export default function Home() {
  return (
    <Providers>
      <Navbar />
      <main id="contenido" className="flex-1">
        <Hero />
        <Services />
        <Gallery />
        <Testimonials />
        <Info />
        <Booking />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </Providers>
  );
}

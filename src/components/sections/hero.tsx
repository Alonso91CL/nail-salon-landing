import { HeroIntro } from "@/components/hero/hero-intro";
import { HeroMedia } from "@/components/hero/hero-media";
import { Sparkles } from "@/components/decor/sparkles";

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

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-4 pt-14 pb-20 sm:px-6 lg:flex-row lg:justify-between lg:gap-10 lg:pt-20 lg:pb-28">
        <HeroIntro />
        <HeroMedia />
      </div>
    </section>
  );
}

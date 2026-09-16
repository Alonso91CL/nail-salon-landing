import { AtSign, MapPin } from "lucide-react";
import { site } from "@/lib/data/site";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-2xl font-semibold">
            Magnetica <span className="text-primary-glow">Beauty Bar</span>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{site.description}</p>
        </div>

        <nav aria-label="Enlaces del pie" className="grid grid-cols-2 gap-x-16 gap-y-2 text-sm">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-3 text-sm">
          <p className="flex items-center gap-2 text-muted-foreground">
            <MapPin aria-hidden="true" className="size-4 text-primary-glow" />
            {site.address}
          </p>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <AtSign aria-hidden="true" className="size-4 text-primary-glow" />
            Instagram
          </a>
        </div>
      </div>

      <div className="border-t border-border/40">
        <p className="mx-auto w-full max-w-6xl px-4 py-4 text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} {site.name}. Demo interactiva — precios, horarios y
          testimonios son de ejemplo.
        </p>
      </div>
    </footer>
  );
}

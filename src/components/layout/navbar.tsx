"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { site, whatsappGeneralUrl } from "@/lib/data/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

function Logo() {
  return (
    <Link href="#" className="flex items-center gap-2 font-display text-xl font-semibold">
      <span
        aria-hidden="true"
        className="text-glow grid size-9 place-items-center rounded-full border border-primary/60 bg-primary/15 text-primary-glow"
      >
        M
      </span>
      <span className="leading-tight">
        Magnetica
        <span className="block text-[10px] font-sans font-semibold tracking-[0.28em] text-muted-foreground uppercase">
          Beauty Bar
        </span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <nav aria-label="Principal" className="hidden items-center gap-6 md:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button render={<a href={whatsappGeneralUrl()} target="_blank" rel="noopener noreferrer" />} variant="outline" size="lg">
            WhatsApp
          </Button>
          <Button render={<a href="#reservar" />} size="lg" className="glow-magenta">
            Reservar
          </Button>
        </div>

        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon-lg"
                className="md:hidden"
                aria-label="Abrir menú de navegación"
              />
            }
          >
            <Menu />
          </SheetTrigger>
          <SheetContent side="right" className="bg-card/95 backdrop-blur-lg">
            <SheetHeader>
              <SheetTitle className="text-left font-display text-2xl">Magnetica</SheetTitle>
              <SheetDescription className="text-left">
                Navegación y reservas
              </SheetDescription>
            </SheetHeader>
            <nav aria-label="Menú móvil" className="flex flex-col gap-1 p-4">
              {site.nav.map((item) => (
                <SheetClose
                  key={item.href}
                  render={
                    <a
                      href={item.href}
                      className={cn(
                        "rounded-lg px-3 py-3 text-base font-medium",
                        "text-foreground hover:bg-muted",
                      )}
                    />
                  }
                >
                  {item.label}
                </SheetClose>
              ))}
              <Button
                render={
                  <a href={whatsappGeneralUrl()} target="_blank" rel="noopener noreferrer" />
                }
                size="lg"
                className="glow-magenta mt-4"
                onClick={() => setSheetOpen(false)}
              >
                Reservar por WhatsApp
              </Button>
            </nav>
            <SheetFooter>
              <div className="flex w-full items-center justify-between rounded-lg border border-border/60 bg-muted/40 px-3 py-1">
                <span className="text-sm font-medium">Tema</span>
                <ThemeToggle />
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

"use client";

import { MotionConfig } from "motion/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <MotionConfig reducedMotion="user">
        {children}
        <Toaster position="top-center" richColors />
      </MotionConfig>
    </ThemeProvider>
  );
}

"use client";

import FluidOrb from "@/components/ui/fluid-orb";
import { useOrbSize, useWebGLSupport } from "@/hooks/use-orb";
import { cn } from "@/lib/utils";

type HeroOrbProps = {
  color?: string;
  className?: string;
  label: string;
  size?: number;
};

export function HeroOrb({ color = "#FF3D9A", className, label, size: fixedSize }: HeroOrbProps) {
  const supported = useWebGLSupport();
  const responsiveSize = useOrbSize();
  const size = fixedSize ?? responsiveSize;

  return (
    <div className={cn("relative", className)} role="img" aria-label={label}>
      <div
        aria-hidden="true"
        className="animate-orb-halo absolute -inset-10 -z-10 rounded-full bg-primary-glow blur-2xl"
      />
      {supported ? (
        <FluidOrb
          size={size}
          color={color}
          className="glow-magenta"
          aria-hidden="true"
        />
      ) : (
        <div
          aria-hidden="true"
          className="glow-magenta rounded-full"
          style={{
            width: size,
            height: size,
            background: `radial-gradient(circle at 35% 30%, #ffffff 0%, ${color} 45%, #08040b 100%)`,
          }}
        />
      )}
    </div>
  );
}

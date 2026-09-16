"use client";

import { useSyncExternalStore } from "react";

function subscribeOnceToResize(onChange: () => void) {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
}

function orbSizeFromWidth(width: number) {
  return width >= 1024 ? 420 : width >= 640 ? 320 : 240;
}

export function useOrbSize() {
  return useSyncExternalStore(
    subscribeOnceToResize,
    () => orbSizeFromWidth(window.innerWidth),
    () => 240,
  );
}

let webglCached: boolean | null = null;

function detectWebGL() {
  if (webglCached === null) {
    try {
      const canvas = document.createElement("canvas");
      webglCached = Boolean(
        canvas.getContext("webgl") ?? canvas.getContext("experimental-webgl"),
      );
    } catch {
      webglCached = false;
    }
  }
  return webglCached;
}

export function useWebGLSupport() {
  return useSyncExternalStore(
    () => () => {},
    detectWebGL,
    () => true,
  );
}

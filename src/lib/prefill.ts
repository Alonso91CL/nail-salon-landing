export const PREFILL_EVENT = "magnetica:prefill";

export function requestPrefill(serviceId: string) {
  window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail: { serviceId } }));
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  document
    .getElementById("reservar")
    ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

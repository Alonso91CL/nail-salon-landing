"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Send, RotateCcw, ListChecks } from "lucide-react";
import MatrixOrb from "@/components/ui/matrix-orb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  isRestartIntent,
  prefillService,
  respond,
  start,
  type AgentResult,
} from "@/lib/agent/agent-machine";
import { buildBookingUrl, buildCancelUrl, isPhoneConfigured } from "@/lib/agent/whatsapp-link";
import { addBooking, cancelBooking, listBookings, type Booking } from "@/lib/agent/booking-store";
import { services } from "@/lib/data/services";
import { PREFILL_EVENT } from "@/lib/prefill";
import { cn } from "@/lib/utils";

type Msg = { id: string; role: "agent" | "user"; text: string };
type Chat = { result: AgentResult; messages: Msg[] };

const STORE_KEY = "magnetica:booking:v2";

const msg = (role: Msg["role"], text: string, id = crypto.randomUUID()): Msg => ({ id, role, text });

function serialize({ result, messages }: Chat) {
  return JSON.stringify({
    result: {
      ...result,
      draft: { ...result.draft, serviceId: result.draft.service?.id },
      pendingCancelId: result.pendingCancelId,
    },
    messages,
  });
}

function deserialize(raw: string): Chat | null {
  try {
    const data = JSON.parse(raw);
    const { serviceId, ...draft } = data.result.draft;
    const service = services.find((s) => s.id === serviceId);
    const messages: Msg[] = data.messages;
    return {
      result: {
        step: data.result.step,
        draft: { ...draft, service },
        reply: data.result.reply,
        pendingCancelId: data.result.pendingCancelId,
      },
      messages,
    };
  } catch {
    return null;
  }
}

const IDLE_CHIPS = [
  { label: "Horarios", text: "horarios" },
  { label: "Precios", text: "precios" },
  { label: "Mis reservas", text: "mis reservas" },
  { label: "Nueva reserva", text: "nueva reserva" },
];

export function BookingAgent() {
  const [chat, setChat] = useState<Chat>({ result: start(), messages: [] });
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timers = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());
  const resultRef = useRef<AgentResult>(chat.result);

  useEffect(() => {
    resultRef.current = chat.result;
  }, [chat.result]);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- restore persisted draft once after mount */
    const raw = sessionStorage.getItem(STORE_KEY);
    const restored = raw ? deserialize(raw) : null;
    if (restored?.result.draft.service) {
      setChat(restored);
    } else {
      setChat({ result: start(), messages: [msg("agent", start().reply)] });
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (chat.messages.length) sessionStorage.setItem(STORE_KEY, serialize(chat));
  }, [chat]);

  useEffect(() => {
    const scroller = scrollRef.current?.parentElement;
    if (scroller) scroller.scrollTop = scroller.scrollHeight;
  }, [chat.messages, typing]);

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const serviceId = (e as CustomEvent<{ serviceId: string }>).detail.serviceId;
      const service = services.find((s) => s.id === serviceId);
      if (!service) return;
      const uid = crypto.randomUUID();
      const aid = crypto.randomUUID();
      setTyping(false);
      setChat((c) => {
        const result = prefillService(serviceId, c.result);
        if (result === c.result) return c;
        return {
          result,
          messages: [
            ...c.messages,
            msg("user", service.name, uid),
            msg("agent", result.reply, aid),
          ],
        };
      });
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  useEffect(() => {
    const set = timers.current;
    return () => set.forEach(clearTimeout);
  }, []);

  const resetChat = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current.clear();
    sessionStorage.removeItem(STORE_KEY);
    setTyping(false);
    setInput("");
    setChat({ result: start(), messages: [msg("agent", start().reply)] });
  }, []);

  const send = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || typing) return;
      setInput("");
      if (isRestartIntent(trimmed)) {
        resetChat();
        return;
      }
      const uid = crypto.randomUUID();
      const aid = crypto.randomUUID();
      setChat((c) => ({ ...c, messages: [...c.messages, msg("user", trimmed, uid)] }));
      setTyping(true);
      const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      const delay = reduce ? 0 : 450 + Math.min(trimmed.length * 12, 600);
      const t = setTimeout(() => {
        const prevResult = resultRef.current;
        const result = respond(prevResult, trimmed);
        if (result.step === "handoff" && prevResult.step === "confirm") {
          addBooking(result.draft);
        }
        resultRef.current = result;
        setChat((c) => ({ result, messages: [...c.messages, msg("agent", result.reply, aid)] }));
        setTyping(false);
      }, delay);
      timers.current.add(t);
    },
    [typing, resetChat],
  );

  const { result, messages } = chat;
  const showBookingHandoff = result.step === "handoff" && !result.pendingCancelId;
  const showCancelHandoff = result.step === "handoff" && !!result.pendingCancelId;
  const canConfirm = Boolean(result.draft.service && result.draft.dateLabel && result.draft.name);
  const isIdle = result.step === "idle";

  const pendingCancelBooking: Booking | undefined = result.pendingCancelId
    ? listBookings().find((b) => b.id === result.pendingCancelId)
    : undefined;

  const onConfirm = () => {
    if (!isPhoneConfigured()) {
      toast.warning("Demo: configura el número real en src/lib/data/site.ts");
    }
  };

  const onCancelConfirm = () => {
    if (result.pendingCancelId) {
      cancelBooking(result.pendingCancelId);
    }
    if (!isPhoneConfigured()) {
      toast.warning("Demo: configura el número real en src/lib/data/site.ts");
    }
  };

  return (
    <div className="glass-card mx-auto flex w-full max-w-xl flex-col overflow-hidden rounded-2xl">
      <div className="flex items-center gap-3 border-border/60 border-b px-4 py-3">
        <MatrixOrb
          size={48}
          dots={7}
          color="#FF3D9A"
          state={typing ? "thinking" : "idle"}
          labels={{ idle: "En línea", listening: "Escuchando", thinking: "Pensando…" }}
          className="flex-row gap-2"
        />
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg leading-tight font-semibold">Magnetita</p>
          <p className="text-xs text-muted-foreground">Asistente de reservas</p>
        </div>
        <Button
          variant="ghost"
          size="icon-lg"
          onClick={() => send("mis reservas")}
          aria-label="Mis reservas"
          title="Mis reservas"
        >
          <ListChecks aria-hidden="true" />
        </Button>
        <Button
          variant="ghost"
          size="icon-lg"
          onClick={resetChat}
          aria-label="Nueva conversación"
          title="Nueva conversación"
        >
          <RotateCcw aria-hidden="true" />
        </Button>
      </div>

      <div className="h-80 overflow-y-auto overscroll-contain">
        <div
          ref={scrollRef}
          role="log"
          aria-live="polite"
          aria-label="Conversación de reserva"
          className="flex flex-col gap-3 px-4 py-4"
        >
          {messages.map((m) => (
            <p
              key={m.id}
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line",
                m.role === "agent"
                  ? "self-start rounded-bl-sm border border-muted bg-muted/70 text-foreground"
                  : "self-end rounded-br-sm bg-primary text-primary-foreground",
              )}
            >
              {m.text}
            </p>
          ))}
          {typing ? (
            <p className="self-start text-xs text-muted-foreground italic" aria-hidden="true">
              Magnetita está escribiendo…
            </p>
          ) : null}

          {showBookingHandoff && canConfirm ? (
            <div className="flex flex-col items-stretch gap-2 self-stretch rounded-xl border border-primary/50 bg-primary/10 p-3">
              <a
                href={buildBookingUrl(result.draft)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onConfirm}
                className="glow-magenta inline-flex h-12 items-center justify-center rounded-lg bg-primary px-6 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/80"
                aria-label="Confirmar reserva por WhatsApp"
              >
                Confirmar por WhatsApp
              </a>
              <Button variant="ghost" size="sm" onClick={() => send("editar")} className="self-center">
                Editar algo
              </Button>
            </div>
          ) : null}

          {showCancelHandoff && pendingCancelBooking ? (
            <div className="flex flex-col items-stretch gap-2 self-stretch rounded-xl border border-destructive/50 bg-destructive/10 p-3">
              <a
                href={buildCancelUrl(pendingCancelBooking)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onCancelConfirm}
                className="inline-flex h-12 items-center justify-center rounded-lg bg-destructive px-6 text-base font-medium text-destructive-foreground transition-colors hover:bg-destructive/80"
                aria-label="Cancelar reserva por WhatsApp"
              >
                Confirmar cancelación por WhatsApp
              </a>
              <Button variant="ghost" size="sm" onClick={() => send("no")} className="self-center">
                Volver
              </Button>
            </div>
          ) : null}

          {isIdle && !typing ? (
            <div
              role="group"
              aria-label="Acciones rápidas"
              className="flex flex-wrap gap-2"
            >
              {IDLE_CHIPS.map((chip) => (
                <Button
                  key={chip.label}
                  size="sm"
                  variant="outline"
                  onClick={() => send(chip.text)}
                >
                  {chip.label}
                </Button>
              ))}
            </div>
          ) : null}

          {result.step === "review_bookings" && !typing ? (
            <div role="group" aria-label="Seleccionar reserva" className="flex flex-wrap gap-2">
              <Button size="sm" variant="ghost" onClick={() => send("volver")}>
                Volver
              </Button>
            </div>
          ) : null}

          {result.step === "choose_service" && !typing ? (
            <div
              role="group"
              aria-label="Elegir servicio"
              className="flex flex-wrap gap-2"
            >
              {services.map((s) => (
                <Button key={s.id} size="sm" variant="outline" onClick={() => send(s.name)}>
                  {s.name}
                </Button>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <form
        className="flex items-center gap-2 border-border/60 border-t px-4 py-3"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <label htmlFor="agent-input" className="sr-only">
          Escribe tu respuesta
        </label>
        <Input
          id="agent-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe una respuesta…"
          autoComplete="off"
        />
        <Button type="submit" size="icon-lg" disabled={!input.trim() || typing} aria-label="Enviar mensaje">
          <Send aria-hidden="true" />
        </Button>
      </form>
    </div>
  );
}

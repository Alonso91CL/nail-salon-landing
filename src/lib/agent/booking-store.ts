import type { BookingDraft } from "@/lib/agent/agent-machine";

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export type Booking = {
  id: string;
  draft: BookingDraft;
  status: BookingStatus;
  createdAt: string;
};

const STORE_KEY = "magnetica:bookings";

function bookingKey(b: Booking) {
  return `${b.draft.service?.id ?? ""}|${b.draft.dateISO ?? ""}|${b.draft.name ?? ""}`;
}

function statusRank(status: BookingStatus) {
  if (status === "confirmed") return 2;
  if (status === "pending") return 1;
  return 0;
}

function read(): Booking[] {
  try {
    const raw = sessionStorage.getItem(STORE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Booking[];
  } catch {
    return [];
  }
}

function write(bookings: Booking[]) {
  sessionStorage.setItem(STORE_KEY, JSON.stringify(bookings));
}

export function listBookings(): Booking[] {
  const bookings = read().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const deduped = new Map<string, Booking>();
  for (const b of bookings) {
    const key = bookingKey(b);
    if (!b.draft.service?.id || !b.draft.dateISO || !b.draft.name) {
      deduped.set(`rawid:${b.id}`, b);
      continue;
    }
    const prev = deduped.get(key);
    if (!prev || statusRank(b.status) > statusRank(prev.status)) {
      deduped.set(key, b);
    }
  }
  return Array.from(deduped.values()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function addBooking(draft: BookingDraft): Booking {
  const bookings = read();
  const existing = bookings.find(
    (b) =>
      b.status !== "cancelled" &&
      b.draft.service?.id === draft.service?.id &&
      b.draft.dateISO === draft.dateISO &&
      b.draft.name === draft.name,
  );
  if (existing) {
    const updated: Booking = {
      ...existing,
      draft: { ...existing.draft, ...draft },
      createdAt: new Date().toISOString(),
    };
    write(bookings.map((b) => (b.id === existing.id ? updated : b)));
    return updated;
  }
  const booking: Booking = {
    id: crypto.randomUUID(),
    draft,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  bookings.push(booking);
  write(bookings);
  return booking;
}

export function getBooking(id: string): Booking | undefined {
  return read().find((b) => b.id === id);
}

export function updateStatus(id: string, status: BookingStatus): Booking | undefined {
  const bookings = read();
  const idx = bookings.findIndex((b) => b.id === id);
  if (idx === -1) return undefined;
  bookings[idx] = { ...bookings[idx], status };
  write(bookings);
  return bookings[idx];
}

export function cancelBooking(id: string): Booking | undefined {
  return updateStatus(id, "cancelled");
}

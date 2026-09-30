export type Car = {
  id: string;
  name: string;
  category: "economy" | "compact" | "intermediate" | "minivan" | "pickup";
  image: string;
  pricePerDay: number; // ARS
  seats: number;
  bags: number;
  transmission: "MT" | "AT";
};

export const DEPOSIT_ARS = 500_000;
export const WHATSAPP_URL = "https://wa.me/5492616534148";

export const FLEET: Car[] = [
  { id: "cronos", name: "Fiat Cronos", category: "economy", image: "/images/cronos.webp", pricePerDay: 60000, seats: 5, bags: 2, transmission: "MT" },
  { id: "onix", name: "Chevrolet Onix", category: "economy", image: "/images/onix.webp", pricePerDay: 62000, seats: 5, bags: 2, transmission: "MT" },
  { id: "p208", name: "Peugeot 208", category: "compact", image: "/images/p208.webp", pricePerDay: 68000, seats: 5, bags: 2, transmission: "AT" },
  { id: "yaris", name: "Toyota Yaris", category: "intermediate", image: "/images/yaris.webp", pricePerDay: 75000, seats: 5, bags: 3, transmission: "AT" },
  { id: "spin", name: "Chevrolet Spin", category: "minivan", image: "/images/spin.webp", pricePerDay: 95000, seats: 7, bags: 4, transmission: "AT" },
  { id: "ranger", name: "Ford Ranger 4x4", category: "pickup", image: "/images/ranger.webp", pricePerDay: 130000, seats: 5, bags: 5, transmission: "MT" },
];

export function formatARS(n: number): string {
  return "$" + n.toLocaleString("es-AR");
}

export function daysBetween(from: string, to: string): number {
  const a = new Date(from).getTime();
  const b = new Date(to).getTime();
  if (Number.isNaN(a) || Number.isNaN(b) || b <= a) return 0;
  return Math.round((b - a) / 86_400_000);
}

export function todayPlus(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export type StoredReservation = {
  code: string;
  carId: string;
  pickup: string;
  dropoff: string;
  days: number;
  total: number;
  source: string;
  createdAt: string;
};

const KEY = "cuyo_reservations";

export function saveReservation(r: StoredReservation) {
  try {
    const list = JSON.parse(localStorage.getItem(KEY) ?? "[]") as StoredReservation[];
    list.unshift(r);
    localStorage.setItem(KEY, JSON.stringify(list.slice(0, 50)));
  } catch {}
}

export function loadReservations(): StoredReservation[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as StoredReservation[];
  } catch {
    return [];
  }
}

export function genCode(): string {
  return "CUY-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

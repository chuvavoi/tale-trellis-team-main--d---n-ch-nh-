import { useSyncExternalStore } from "react";

const KEY = "tramsach.rentals";
const listeners = new Set<() => void>();

export type Rental = {
  bookId: string;
  start: string; // ISO
  end: string; // ISO (end of day)
};

type RentalMap = Record<string, Rental>;

const EMPTY: RentalMap = {};
let cache: RentalMap | null = null;

function loadFromStorage(): RentalMap {
  if (typeof window === "undefined") return EMPTY;
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? "{}");
    return parsed && typeof parsed === "object" ? (parsed as RentalMap) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function getSnapshot(): RentalMap {
  if (cache === null) cache = loadFromStorage();
  return cache;
}

function getServerSnapshot(): RentalMap {
  return EMPTY;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function write(next: RentalMap) {
  cache = next;
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY, JSON.stringify(next));
  }
  listeners.forEach((l) => l());
}

/**
 * Logic kiểm tra quyền truy cập:
 * Trả về true nếu thời điểm hiện tại nằm trong [start, end].
 */
export function isRentalActive(rental: Rental | undefined, now = new Date()): boolean {
  if (!rental) return false;
  const start = new Date(rental.start).getTime();
  const end = new Date(rental.end).getTime();
  const t = now.getTime();
  return t >= start && t <= end;
}

export function useRentals() {
  const map = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return {
    all: map,
    list: Object.values(map),
    get: (bookId: string): Rental | undefined => map[bookId],
    hasAccess: (bookId: string) => isRentalActive(map[bookId]),
    rent: (bookId: string, endDate: Date) => {
      const start = new Date();
      // Đẩy end về cuối ngày để công bằng cho người dùng
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      const next: RentalMap = {
        ...getSnapshot(),
        [bookId]: { bookId, start: start.toISOString(), end: end.toISOString() },
      };
      write(next);
    },
    cancel: (bookId: string) => {
      const cur = { ...getSnapshot() };
      delete cur[bookId];
      write(cur);
    },
  };
}

import { useSyncExternalStore } from "react";

const KEY = "tramsach.favorites";
const listeners = new Set<() => void>();
const EMPTY: string[] = [];
let cache: string[] | null = null;

function loadFromStorage(): string[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed : EMPTY;
  } catch {
    return EMPTY;
  }
}

function getSnapshot(): string[] {
  if (cache === null) cache = loadFromStorage();
  return cache;
}

function getServerSnapshot(): string[] {
  return EMPTY;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function write(ids: string[]) {
  cache = ids;
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY, JSON.stringify(ids));
  }
  listeners.forEach((l) => l());
}

export function useFavorites() {
  const ids = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return {
    ids,
    has: (id: string) => ids.includes(id),
    toggle: (id: string) => {
      const cur = getSnapshot();
      write(cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]);
    },
  };
}

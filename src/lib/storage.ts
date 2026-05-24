/**
 * localStorage utility helpers for MindSpace prototype.
 * All data persistence is handled client-side.
 */

const STORAGE_PREFIX = "mindspace_";

export function getItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = window.localStorage.getItem(STORAGE_PREFIX + key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function setItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (error) {
    console.warn("localStorage write failed:", error);
  }
}

export function removeItem(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_PREFIX + key);
  } catch (error) {
    console.warn("localStorage remove failed:", error);
  }
}

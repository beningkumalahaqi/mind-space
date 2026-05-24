"use client";

import { useState, useCallback, useEffect } from "react";
import { getItem, setItem } from "@/lib/storage";

/**
 * Hook for persisting state to localStorage.
 * Reads value synchronously on init to avoid flash of default content.
 * Syncs across tabs using the storage event.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // Initialize synchronously from localStorage if available
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(`mindspace_${key}`);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Sync across tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `mindspace_${key}` && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch {
          // ignore parse errors
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const nextValue = value instanceof Function ? value(prev) : value;
        setItem(key, nextValue);
        return nextValue;
      });
    },
    [key]
  );

  const remove = useCallback(() => {
    setStoredValue(initialValue);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(`mindspace_${key}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [storedValue, setValue, remove];
}

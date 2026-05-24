"use client";

import { useLocalStorage } from "./useLocalStorage";
import type { MoodEntry } from "@/types";

/**
 * Hook for managing mood check-in history.
 * Persists to localStorage and provides utility methods.
 */
export function useMoodHistory() {
  const [entries, setEntries] = useLocalStorage<MoodEntry[]>("mood_history", []);

  const addEntry = (entry: Omit<MoodEntry, "id" | "timestamp">) => {
    const newEntry: MoodEntry = {
      ...entry,
      id: crypto.randomUUID?.() ?? Date.now().toString(36),
      timestamp: Date.now(),
    };
    setEntries((prev) => [newEntry, ...prev]);
    return newEntry;
  };

  const getTodayEntry = (): MoodEntry | undefined => {
    const today = new Date().toISOString().split("T")[0];
    return entries.find((e) => e.date === today);
  };

  const getRecentEntries = (days: number = 7): MoodEntry[] => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    return entries.filter((e) => e.timestamp >= cutoff.getTime());
  };

  const getStreak = (): number => {
    if (entries.length === 0) return 0;
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      const hasEntry = entries.some((e) => e.date === dateStr);
      if (hasEntry) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }
    return streak;
  };

  const getMoodFrequency = (): Record<string, number> => {
    const freq: Record<string, number> = {};
    entries.forEach((e) => {
      freq[e.label] = (freq[e.label] || 0) + 1;
    });
    return freq;
  };

  return {
    entries,
    addEntry,
    getTodayEntry,
    getRecentEntries,
    getStreak,
    getMoodFrequency,
  };
}

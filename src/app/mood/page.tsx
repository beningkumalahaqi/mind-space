"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, History } from "lucide-react";
import { PageContainer } from "@/components/shared/PageContainer";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";
import { MoodCard } from "@/components/shared/MoodCard";
import { useMoodHistory } from "@/hooks/useMoodHistory";
import { useToast } from "@/components/ui/Toast";
import { moodOptions } from "@/data/moods";
import type { MoodEntry } from "@/types";

export default function MoodPage() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { entries, addEntry, getTodayEntry, getMoodFrequency } = useMoodHistory();
  const { showToast } = useToast();

  useEffect(() => {
    setMounted(true);
    const today = getTodayEntry();
    if (today) {
      setSelectedMood(today.label);
      setNote(today.note);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const moodFrequency = getMoodFrequency();
  const mostFrequent = Object.entries(moodFrequency).sort((a, b) => b[1] - a[1]);

  const handleSave = () => {
    if (!selectedMood) return;

    const mood = moodOptions.find((m) => m.label === selectedMood);
    if (!mood) return;

    const today = new Date().toISOString().split("T")[0];
    addEntry({
      emoji: mood.emoji,
      label: mood.label,
      note,
      date: today,
    });

    showToast("Mood saved! Thanks for checking in 💜", "success");
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Mood Check-in</h1>
        <p className="text-sm text-gray-500 mt-1">
          How are you feeling right now? Be honest with yourself.
        </p>
      </div>

      {/* Mood Selection Grid */}
      <Card className="mb-4">
        <SectionHeader
          title="Select Your Mood"
          action={
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHistory(!showHistory)}
            >
              <History size={16} className="mr-1" />
              History
            </Button>
          }
        />
        <div className="grid grid-cols-3 gap-3 mt-2">
          {moodOptions.map((mood, index) => (
            <motion.div
              key={mood.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <MoodCard
                emoji={mood.emoji}
                label={mood.label}
                color={mood.color}
                bgColor={mood.bgColor}
                selected={selectedMood === mood.label}
                onClick={() => setSelectedMood(mood.label)}
              />
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Note Input */}
      <AnimatePresence mode="wait">
        {selectedMood && (
          <motion.div
            key="note-input"
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="mb-4">
              <SectionHeader
                title="Add a Note (Optional)"
                subtitle="What's on your mind?"
              />
              <Textarea
                placeholder="Write a few words about how you're feeling..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="mt-2"
              />
              <div className="mt-4">
                <Button
                  onClick={handleSave}
                  className="w-full"
                  size="lg"
                  disabled={!selectedMood}
                >
                  <Check size={18} className="mr-2" />
                  Save Check-in
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mood History */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="mb-4">
              <SectionHeader
                title="Mood History"
                subtitle={`${entries.length} total check-ins`}
              />

              {entries.length === 0 ? (
                <p className="text-sm text-gray-400 italic py-4 text-center">
                  No mood entries yet. Start tracking today!
                </p>
              ) : (
                <div className="space-y-3">
                  {/* Recent entries */}
                  {entries.slice(0, 10).map((entry: MoodEntry) => (
                    <div
                      key={entry.id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-gray-50"
                    >
                      <span className="text-2xl">{entry.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-800">
                            {entry.label}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(entry.date).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        {entry.note && (
                          <p className="text-xs text-gray-500 truncate mt-0.5">
                            {entry.note}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Mood Frequency */}
            {mostFrequent.length > 0 && mounted && (
              <Card>
                <SectionHeader
                  title="Your Most Common Moods"
                  subtitle="Based on your check-ins"
                />
                <div className="space-y-2">
                  {mostFrequent.slice(0, 3).map(([label, count]) => {
                    const mood = moodOptions.find((m) => m.label === label);
                    return (
                      <div
                        key={label}
                        className="flex items-center gap-2 text-sm"
                      >
                        <span>{mood?.emoji || "❓"}</span>
                        <span className="text-gray-700 flex-1">{label}</span>
                        <span className="text-gray-400 font-medium">
                          {count}x
                        </span>
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-8" />
    </PageContainer>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Lightbulb,
  ChevronDown,
  Check,
  BarChart3,
} from "lucide-react";
import { PageContainer } from "@/components/shared/PageContainer";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { InsightCard } from "@/components/shared/InsightCard";
import { useToast } from "@/components/ui/Toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  reflectionQuestions,
  topPlatforms,
  generateWellnessInsight,
} from "@/data/reflections";
import type { ScreenTimeEntry } from "@/types";

export default function ReflectionPage() {
  const [hours, setHours] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [reflection, setReflection] = useState("");
  const [insight, setInsight] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showPlatforms, setShowPlatforms] = useState(false);

  const { showToast } = useToast();
  const [entries, setEntries] = useLocalStorage<ScreenTimeEntry[]>(
    "reflections",
    []
  );

  const randomQuestion = reflectionQuestions[
    Math.floor(Math.random() * reflectionQuestions.length)
  ];

  const handleSubmit = () => {
    if (!hours || !selectedPlatform) {
      showToast("Please enter your screen time and select a platform", "error");
      return;
    }

    const hoursNum = parseFloat(hours);
    if (isNaN(hoursNum) || hoursNum < 0) {
      showToast("Please enter a valid number of hours", "error");
      return;
    }

    const newInsight = generateWellnessInsight(hoursNum);
    setInsight(newInsight);

    const newEntry: ScreenTimeEntry = {
      id: Date.now().toString(36),
      hours: hoursNum,
      topPlatform: selectedPlatform,
      reflection,
      wellnessInsight: newInsight,
      date: new Date().toISOString().split("T")[0],
    };

    setEntries((prev) => [newEntry, ...prev]);
    setSaved(true);

    showToast("Reflection saved! 💜", "success");
  };

  const hoursNum = parseFloat(hours);
  const screenTimeCategory =
    !isNaN(hoursNum) && hoursNum > 0
      ? hoursNum <= 2
        ? "low"
        : hoursNum <= 5
        ? "medium"
        : "high"
      : null;

  const screenTimeColors = {
    low: "text-emerald-600 bg-emerald-100",
    medium: "text-amber-600 bg-amber-100",
    high: "text-rose-600 bg-rose-100",
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Screen Time Reflection
        </h1>
        <p className="text-sm text-gray-500 mt-1">{today}</p>
      </div>

      {/* Screen Time Input */}
      <Card className="mb-4">
        <SectionHeader
          title="Today's Screen Time"
          subtitle="How many hours did you spend on your phone?"
        />
        <div className="mt-2">
          <Input
            type="number"
            placeholder="e.g. 4.5"
            value={hours}
            onChange={(e) => {
              setHours(e.target.value);
              setSaved(false);
              setInsight(null);
            }}
            min="0"
            max="24"
            step="0.5"
          />
        </div>

        {/* Screen Time Indicator */}
        {screenTimeCategory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-3"
          >
            <div className="flex items-center gap-2 text-sm">
              <Clock size={16} />
              <span
                className={`font-medium ${
                  screenTimeColors[screenTimeCategory].split(" ")[0]
                }`}
              >
                {hoursNum} hours
              </span>
              <span className="text-gray-400">—</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  screenTimeColors[screenTimeCategory]
                }`}
              >
                {screenTimeCategory === "low"
                  ? "Low usage 👍"
                  : screenTimeCategory === "medium"
                  ? "Moderate usage"
                  : "High usage ⚠️"}
              </span>
            </div>
          </motion.div>
        )}
      </Card>

      {/* Platform Selector */}
      <Card className="mb-4">
        <SectionHeader
          title="Most-Used Platform"
          subtitle="Which app did you spend the most time on?"
        />
        <div className="relative mt-2">
          <button
            onClick={() => setShowPlatforms(!showPlatforms)}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 hover:border-gray-300 transition-colors"
          >
            <span className={selectedPlatform ? "text-gray-800" : "text-gray-400"}>
              {selectedPlatform
                ? topPlatforms.find((p) => p.value === selectedPlatform)
                    ?.emoji +
                  " " +
                  topPlatforms.find((p) => p.value === selectedPlatform)?.label
                : "Select a platform"}
            </span>
            <ChevronDown
              size={18}
              className={`text-gray-400 transition-transform ${
                showPlatforms ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {showPlatforms && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-20 top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
              >
                {topPlatforms.map((platform) => (
                  <button
                    key={platform.value}
                    onClick={() => {
                      setSelectedPlatform(platform.value);
                      setShowPlatforms(false);
                    }}
                    className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors ${
                      selectedPlatform === platform.value
                        ? "bg-mindspace-lavender-light text-mindspace-primary"
                        : "text-gray-700"
                    }`}
                  >
                    <span>{platform.emoji}</span>
                    <span>{platform.label}</span>
                    {selectedPlatform === platform.value && (
                      <Check size={16} className="ml-auto text-mindspace-primary" />
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>

      {/* Reflection Question */}
      <Card className="mb-4">
        <SectionHeader
          title="Reflection"
          subtitle="Take a moment to think"
        />
        <p className="text-sm text-gray-600 italic mb-3">
          &ldquo;{randomQuestion}&rdquo;
        </p>
        <Textarea
          placeholder="Write your thoughts here..."
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          rows={3}
        />
      </Card>

      {/* Submit */}
      <Button
        onClick={handleSubmit}
        className="w-full mb-4"
        size="lg"
        disabled={!hours || !selectedPlatform}
      >
        <Lightbulb size={18} className="mr-2" />
        Generate Insight & Save
      </Button>

      {/* Wellness Insight */}
      <AnimatePresence>
        {insight && saved && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Card className="mb-4 bg-gradient-to-br from-mindspace-lavender-light to-white">
              <SectionHeader
                title="Your Wellness Insight ✨"
                subtitle="Generated based on your reflection"
              />
              <p className="text-sm text-gray-700 leading-relaxed">
                {insight}
              </p>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* History Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowHistory(!showHistory)}
        className="mb-3"
      >
        <BarChart3 size={16} className="mr-1" />
        {showHistory ? "Hide History" : "View History"}
      </Button>

      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {entries.length === 0 ? (
              <Card>
                <p className="text-sm text-gray-400 italic text-center py-4">
                  No reflections yet. Start your first one today!
                </p>
              </Card>
            ) : (
              entries.slice(0, 10).map((entry: ScreenTimeEntry) => (
                <Card key={entry.id} className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-mindspace-primary" />
                      <span className="text-sm font-medium text-gray-800">
                        {entry.hours}h
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  {entry.topPlatform && (
                    <p className="text-xs text-gray-500 mb-1">
                      Mostly on:{" "}
                      {topPlatforms.find((p) => p.value === entry.topPlatform)
                        ?.emoji + " "}
                      {
                        topPlatforms.find((p) => p.value === entry.topPlatform)
                          ?.label
                      }
                    </p>
                  )}
                  {entry.reflection && (
                    <p className="text-xs text-gray-600 italic line-clamp-2">
                      &ldquo;{entry.reflection}&rdquo;
                    </p>
                  )}
                </Card>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-8" />
    </PageContainer>
  );
}

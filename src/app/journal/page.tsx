"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenLine, BookOpen, Trash2, Calendar } from "lucide-react";
import { PageContainer } from "@/components/shared/PageContainer";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useToast } from "@/components/ui/Toast";
import type { JournalEntry } from "@/types";

export default function JournalPage() {
  const [entries, setEntries] = useLocalStorage<JournalEntry[]>(
    "journal_entries",
    []
  );
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showHistory, setShowHistory] = useState(true);
  const { showToast } = useToast();

  const handleSave = () => {
    if (!content.trim()) {
      showToast("Please write something before saving", "error");
      return;
    }

    const entry: JournalEntry = {
      id: Date.now().toString(36),
      title: title.trim() || "Untitled Reflection",
      content: content.trim(),
      date: new Date().toISOString().split("T")[0],
      timestamp: Date.now(),
    };

    setEntries((prev) => [entry, ...prev]);
    setTitle("");
    setContent("");
    setShowNew(false);
    showToast("Journal entry saved! 📝✨", "success");
  };

  const handleDelete = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
    showToast("Entry deleted", "info");
  };

  const handleNewEntry = () => {
    setShowNew(true);
    setShowHistory(false);
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Self Reflection Journal
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          A safe space for your thoughts, free from judgment.
        </p>
      </div>

      {/* New Entry Button / Form */}
      {!showNew ? (
        <Card className="mb-6 cursor-pointer" onClick={handleNewEntry}>
          <div className="flex items-center gap-3 p-2">
            <div className="w-12 h-12 rounded-xl bg-mindspace-lavender-light flex items-center justify-center">
              <PenLine size={24} className="text-mindspace-primary" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Write a new entry</p>
              <p className="text-xs text-gray-400">
                Express yourself freely
              </p>
            </div>
          </div>
        </Card>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card>
            <SectionHeader
              title="New Journal Entry"
              action={
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowNew(false);
                    setTitle("");
                    setContent("");
                  }}
                >
                  Cancel
                </Button>
              }
            />
            <div className="space-y-4">
              <Input
                placeholder="Entry title (optional)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                placeholder="Write whatever is on your mind..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                className="min-h-[200px]"
                autoFocus
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  {content.length} characters
                </span>
                <Button onClick={handleSave} disabled={!content.trim()}>
                  <BookOpen size={16} className="mr-2" />
                  Save Entry
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Entry History */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
          <BookOpen size={18} className="text-mindspace-primary" />
          Your Reflections
        </h2>
        {entries.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHistory(!showHistory)}
          >
            {showHistory ? "Hide" : "Show All"}
          </Button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {showHistory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {entries.length === 0 ? (
              <Card>
                <div className="text-center py-8">
                  <BookOpen
                    size={40}
                    className="mx-auto text-gray-300 mb-3"
                  />
                  <p className="text-sm text-gray-400">
                    No journal entries yet.
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    Start writing to track your journey.
                  </p>
                </div>
              </Card>
            ) : (
              entries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 truncate">
                          {entry.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                          <Calendar size={12} />
                          <span>
                            {new Date(entry.date).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="p-1.5 rounded-lg text-gray-300 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                        aria-label="Delete entry"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap line-clamp-4">
                      {entry.content}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {entry.content.length} characters
                    </p>
                  </Card>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-8" />
    </PageContainer>
  );
}

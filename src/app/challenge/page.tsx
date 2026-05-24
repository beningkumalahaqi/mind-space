"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Flame, Trophy, Target } from "lucide-react";
import { PageContainer } from "@/components/shared/PageContainer";
import { Card } from "@/components/ui/Card";
import { ChallengeCard } from "@/components/shared/ChallengeCard";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useToast } from "@/components/ui/Toast";
import { defaultChallenges } from "@/data/challenges";
import type { Challenge } from "@/types";

export default function ChallengePage() {
  const [challenges, setChallenges] = useLocalStorage<Challenge[]>(
    "challenges",
    defaultChallenges
  );
  const { showToast } = useToast();

  const activeChallenges = challenges.filter((c) => c.joined);
  const availableChallenges = challenges.filter((c) => !c.joined);
  const totalStreak = activeChallenges.reduce(
    (sum, c) => sum + c.streak,
    0
  );

  const handleToggleJoin = (id: string) => {
    setChallenges((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, joined: !c.joined } : c
      )
    );
    const challenge = challenges.find((c) => c.id === id);
    if (challenge?.joined) {
      showToast(`Left "${challenge.title}"`, "info");
    } else {
      showToast("Challenge joined! Let's do this! 💪", "success");
    }
  };

  const handleComplete = (id: string) => {
    setChallenges((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const newCompleted = Math.min(c.completedDays + 1, c.totalDays);
        const newStreak =
          newCompleted > c.completedDays ? c.streak + 1 : c.streak;
        return {
          ...c,
          completedDays: newCompleted,
          streak: newStreak,
        };
      })
    );

    const challenge = challenges.find((c) => c.id === id);
    if (challenge) {
      const newCompleted = Math.min(challenge.completedDays + 1, challenge.totalDays);
      if (newCompleted >= challenge.totalDays) {
        showToast(
          `🎉 Congratulations! You completed "${challenge.title}"!`,
          "success"
        );
      } else {
        showToast(
          `Day ${newCompleted}/${challenge.totalDays} logged for "${challenge.title}"!`,
          "success"
        );
      }
    }
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Digital Detox Challenges
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Build healthier digital habits, one challenge at a time.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card className="!p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <Target size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Active</p>
              <p className="text-lg font-bold text-gray-800">
                {activeChallenges.length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="!p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <Flame size={20} className="text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Streak</p>
              <p className="text-lg font-bold text-gray-800">
                {totalStreak} days
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Active Challenges */}
      {activeChallenges.length > 0 && (
        <div className="mb-8">
          <h2 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Trophy size={18} className="text-amber-500" />
            Your Active Challenges
          </h2>
          <div className="space-y-4">
            {activeChallenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ChallengeCard
                  {...challenge}
                  onToggleJoin={() => handleToggleJoin(challenge.id)}
                  onComplete={() => handleComplete(challenge.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Available Challenges */}
      {availableChallenges.length > 0 && (
        <div className="mb-8">
          <h2 className="text-base font-semibold text-gray-800 mb-3">
            More Challenges
          </h2>
          <div className="space-y-4">
            {availableChallenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ChallengeCard
                  {...challenge}
                  onToggleJoin={() => handleToggleJoin(challenge.id)}
                  onComplete={() => handleComplete(challenge.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div className="h-8" />
    </PageContainer>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Sun,
  TrendingUp,
  Target,
  Clock,
  ChevronRight,
} from "lucide-react";
import { PageContainer } from "@/components/shared/PageContainer";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card } from "@/components/ui/Card";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Button } from "@/components/ui/Button";
import { DashboardSkeleton } from "@/components/ui/Skeleton";
import { useMoodHistory } from "@/hooks/useMoodHistory";
import Link from "next/link";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function getTodayDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const { getTodayEntry, getStreak, getRecentEntries } = useMoodHistory();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const todayEntry = getTodayEntry();
  const streak = getStreak();
  const recentMoods = getRecentEntries(7);
  const overallProgress = Math.min(
    Math.round((recentMoods.length / 7) * 100),
    100
  );

  if (loading) {
    return (
      <PageContainer>
        <DashboardSkeleton />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* Header */}
      <div className="mb-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-mindspace-primary mb-1"
        >
          <Sun size={18} />
          <span className="text-xs font-medium">{getTodayDate()}</span>
        </motion.div>
        <h1 className="text-2xl font-bold text-gray-800">
          {getGreeting()}! 👋
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {streak > 0
            ? `You're on a ${streak}-day wellness streak! Keep it up! 🔥`
            : "Let's check in with yourself today."}
        </p>
      </div>

      {/* Today's Mood Summary */}
      <Card className="mb-4">
        <SectionHeader
          title="Today's Mood"
          subtitle={todayEntry ? `Feeling ${todayEntry.label}` : "Not checked in yet"}
          action={
            <Link href="/mood">
              <Button variant="ghost" size="sm">
                {todayEntry ? "Update" : "Check in"}
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </Link>
          }
        />
        {todayEntry ? (
          <div className="flex items-center gap-3 p-3 rounded-xl bg-mindspace-lavender-light">
            <span className="text-3xl">{todayEntry.emoji}</span>
            <div>
              <p className="font-medium text-gray-800">
                Feeling {todayEntry.label}
              </p>
              {todayEntry.note && (
                <p className="text-sm text-gray-500 mt-0.5">
                  {todayEntry.note}
                </p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-400 italic">
            Take a moment to check in with how you&apos;re feeling today.
          </p>
        )}
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Link href="/reflection">
          <motion.div
            whileTap={{ scale: 0.97 }}
            className="p-4 rounded-2xl bg-gradient-to-br from-sky-100 to-sky-50 border border-sky-200/60"
          >
            <Clock size={20} className="text-sky-600 mb-2" />
            <p className="text-sm font-semibold text-gray-800">
              Screen Time
            </p>
            <p className="text-xs text-gray-500 mt-0.5">Reflect on habits</p>
          </motion.div>
        </Link>
        <Link href="/challenge">
          <motion.div
            whileTap={{ scale: 0.97 }}
            className="p-4 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-50 border border-purple-200/60"
          >
            <Target size={20} className="text-purple-600 mb-2" />
            <p className="text-sm font-semibold text-gray-800">
              Challenges
            </p>
            <p className="text-xs text-gray-500 mt-0.5">Build new habits</p>
          </motion.div>
        </Link>
      </div>

      {/* Progress Overview */}
      <Card>
        <SectionHeader
          title="Your Progress"
          subtitle="Last 7 days"
          action={
            <Link href="/journal">
              <Button variant="ghost" size="sm">
                Journal
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </Link>
          }
        />
        <div className="flex items-center gap-6">
          <ProgressRing
            progress={overallProgress}
            size={80}
            color="stroke-mindspace-primary"
          />
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Sparkles size={16} className="text-amber-500" />
              <span className="text-gray-600">
                {recentMoods.length} check-ins this week
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp size={16} className="text-emerald-500" />
              <span className="text-gray-600">{streak} day streak</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Target size={16} className="text-purple-500" />
              <span className="text-gray-600">
                {overallProgress >= 100 ? "Weekly goal met! 🎉" : `${7 - recentMoods.length} more days to go`}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Today's Challenge */}
      <Card className="mt-4">
        <SectionHeader
          title="Today's Challenge"
          subtitle="Digital Detox"
          action={
            <Link href="/challenge">
              <Button variant="ghost" size="sm">
                View all
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </Link>
          }
        />
        <Link href="/challenge">
          <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/60 cursor-pointer hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🌅</span>
              <div>
                <p className="font-semibold text-gray-800">
                  Phone-Free Morning
                </p>
                <p className="text-xs text-gray-500">
                  Don&apos;t check your phone for 30 min after waking
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-amber-600">
              <span>3/7 days completed</span>
              <span>•</span>
              <span>🔥 2 day streak</span>
            </div>
          </div>
        </Link>
      </Card>

      {/* Screen Time Reflection Prompt */}
      <Card className="mt-4">
        <SectionHeader
          title="Screen Time Reflection"
          subtitle="Take a moment to reflect"
          action={
            <Link href="/reflection">
              <Button variant="ghost" size="sm">
                Reflect
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </Link>
          }
        />
        <p className="text-sm text-gray-600 leading-relaxed">
          How much time did you spend on your phone today? Reflecting on your
          digital habits is the first step toward a healthier relationship with
          technology.
        </p>
      </Card>

      {/* Community Prompt */}
      <Card className="mt-4 mb-4">
        <SectionHeader
          title="Community"
          subtitle="See what others are sharing"
          action={
            <Link href="/community">
              <Button variant="ghost" size="sm">
                Open
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </Link>
          }
        />
        <p className="text-sm text-gray-500 italic">
          &ldquo;Just finished my first 24-hour social media detox! It was tough
          but worth it.&rdquo; — MindfulExplorer
        </p>
      </Card>
    </PageContainer>
  );
}

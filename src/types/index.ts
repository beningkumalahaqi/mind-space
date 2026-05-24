// ── Mood Types ──

export interface MoodEntry {
  id: string;
  emoji: string;
  label: string;
  note: string;
  date: string; // ISO date string
  timestamp: number;
}

export interface MoodOption {
  emoji: string;
  label: string;
  color: string;
  bgColor: string;
}

// ── Challenge Types ──

export interface Challenge {
  id: string;
  title: string;
  description: string;
  duration: string;
  icon: string;
  color: string;
  bgColor: string;
  totalDays: number;
  completedDays: number;
  streak: number;
  joined: boolean;
}

// ── Reflection Types ──

export interface ScreenTimeEntry {
  id: string;
  hours: number;
  topPlatform: string;
  reflection: string;
  wellnessInsight: string;
  date: string;
}

// ── Community Types ──

export interface CommunityPost {
  id: string;
  content: string;
  author: string;
  timestamp: number;
  likes: number;
  replies: Reply[];
  tags: string[];
}

export interface Reply {
  id: string;
  content: string;
  author: string;
  timestamp: number;
}

// ── Journal Types ──

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  timestamp: number;
  mood?: string;
}

// ── Resource Types ──

export interface Resource {
  id: string;
  title: string;
  description: string;
  phone?: string;
  url?: string;
  category: "hotline" | "self-care" | "meditation";
  icon: string;
  textColor: string;
  bgColor: string;
}

// ── UI Types ──

export interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

// ── Dashboard Types ──

export interface DailyData {
  greeting: string;
  moodSummary: string;
  todayChallenge: string;
  screenTimeReflection: string;
  progressPercentage: number;
}

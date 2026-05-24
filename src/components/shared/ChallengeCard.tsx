"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Button } from "@/components/ui/Button";
import { Flame } from "lucide-react";

interface ChallengeCardProps {
  icon: string;
  title: string;
  description: string;
  duration: string;
  color: string;
  bgColor: string;
  totalDays: number;
  completedDays: number;
  streak: number;
  joined: boolean;
  onToggleJoin?: () => void;
  onComplete?: () => void;
}

export function ChallengeCard({
  icon,
  title,
  description,
  duration,
  color,
  bgColor,
  totalDays,
  completedDays,
  streak,
  joined,
  onToggleJoin,
  onComplete,
}: ChallengeCardProps) {
  const progress = Math.round((completedDays / totalDays) * 100);
  const isComplete = progress >= 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100/60 space-y-4"
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0",
            bgColor
          )}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{duration}</p>
        </div>
        <ProgressRing
          progress={progress}
          size={48}
          strokeWidth={4}
          color="stroke-mindspace-primary"
          showPercentage={false}
        />
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>

      {/* Stats */}
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span>
          {completedDays}/{totalDays} days
        </span>
        {streak > 0 && (
          <span className="flex items-center gap-1 text-amber-600">
            <Flame size={14} />
            {streak} day streak
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {!joined ? (
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            onClick={onToggleJoin}
          >
            Join Challenge
          </Button>
        ) : isComplete ? (
          <Button variant="secondary" size="sm" className="flex-1" disabled>
            Completed! 🎉
          </Button>
        ) : (
          <>
            <Button
              variant="primary"
              size="sm"
              className="flex-1"
              onClick={onComplete}
            >
              Log Today
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleJoin}
            >
              Leave
            </Button>
          </>
        )}
      </div>
    </motion.div>
  );
}

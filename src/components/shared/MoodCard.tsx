"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MoodCardProps {
  emoji: string;
  label: string;
  color: string;
  bgColor: string;
  selected?: boolean;
  onClick?: () => void;
}

export function MoodCard({
  emoji,
  label,
  color,
  bgColor,
  selected,
  onClick,
}: MoodCardProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1.5 p-4 rounded-2xl transition-all duration-200 cursor-pointer min-w-[72px]",
        selected
          ? `${bgColor} ring-2 ring-offset-2 ring-${color.replace("text-", "")} shadow-md`
          : "bg-white hover:bg-gray-50 border border-gray-100",
        "focus:outline-none focus:ring-2 focus:ring-mindspace-primary/40"
      )}
    >
      <span className="text-3xl leading-none">{emoji}</span>
      <span className={cn("text-xs font-medium", selected ? color : "text-gray-600")}>
        {label}
      </span>
    </motion.button>
  );
}

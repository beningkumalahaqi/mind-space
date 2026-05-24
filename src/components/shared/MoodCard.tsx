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
        "flex flex-col items-center justify-center gap-0.5 w-full aspect-square rounded-xl transition-all duration-200 cursor-pointer",
        selected
          ? `${bgColor} ring-2 ring-offset-2 ring-mindspace-primary/60 shadow-sm`
          : "bg-white hover:bg-gray-50 border border-gray-100",
        "focus:outline-none focus:ring-2 focus:ring-mindspace-primary/40"
      )}
    >
      <span className="text-2xl leading-none">{emoji}</span>
      <span className={cn("text-[10px] font-medium text-center", selected ? color : "text-gray-500")}>
        {label}
      </span>
    </motion.button>
  );
}

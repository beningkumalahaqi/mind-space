"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface InsightCardProps {
  icon: string;
  title: string;
  description: string;
  color?: string;
  bgColor?: string;
  className?: string;
}

export function InsightCard({
  icon,
  title,
  description,
  color = "text-mindspace-primary",
  bgColor = "bg-mindspace-lavender-light",
  className,
}: InsightCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        "flex items-start gap-3 p-4 rounded-xl transition-colors duration-200",
        "hover:bg-gray-50",
        className
      )}
    >
      <div
        className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0",
          bgColor
        )}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className={cn("text-sm font-semibold", color)}>{title}</h4>
        <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

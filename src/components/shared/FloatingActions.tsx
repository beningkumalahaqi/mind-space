"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Plus, PenLine, Smile, Timer, Heart } from "lucide-react";
import Link from "next/link";

const actions = [
  { href: "/mood", label: "Check Mood", icon: Smile, color: "bg-purple-100 text-purple-600" },
  { href: "/reflection", label: "Log Screen Time", icon: Timer, color: "bg-sky-100 text-sky-600" },
  { href: "/journal", label: "Write Journal", icon: PenLine, color: "bg-emerald-100 text-emerald-600" },
  { href: "/help", label: "Get Help", icon: Heart, color: "bg-rose-100 text-rose-600" },
];

export function FloatingActions() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-5 bottom-24 z-30 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open &&
          actions.map((action, index) => (
            <motion.div
              key={action.href}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              transition={{ delay: index * 0.05, type: "spring", stiffness: 400, damping: 25 }}
            >
              <Link
                href={action.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg backdrop-blur-sm",
                  "text-sm font-medium transition-transform hover:scale-105",
                  action.color
                )}
              >
                <action.icon size={18} />
                <span>{action.label}</span>
              </Link>
            </motion.div>
          ))}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className={cn(
          "w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors duration-200",
          "bg-mindspace-primary text-white hover:bg-mindspace-primary/90"
        )}
        aria-label="Quick actions"
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Plus size={28} />
        </motion.div>
      </motion.button>
    </div>
  );
}

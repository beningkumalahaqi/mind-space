"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Smile,
  Timer,
  Swords,
  Users,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/mood", label: "Mood", icon: Smile },
  { href: "/reflection", label: "Focus", icon: Timer },
  { href: "/challenge", label: "Challenges", icon: Swords },
  { href: "/community", label: "Community", icon: Users },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 safe-bottom">
      <div className="glass border-t border-gray-200/60">
        <div className="max-w-lg mx-auto flex items-center justify-around px-2 py-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center gap-0.5 py-2 px-3 min-w-[56px] transition-colors duration-200",
                  isActive
                    ? "text-mindspace-primary"
                    : "text-gray-400 hover:text-gray-600"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-mindspace-primary"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

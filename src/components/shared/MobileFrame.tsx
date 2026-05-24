"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Signal, Wifi, Battery } from "lucide-react";
import { BottomNav } from "@/components/shared/BottomNav";
import { FloatingActions } from "@/components/shared/FloatingActions";

interface MobileFrameProps {
  children: ReactNode;
}

export function MobileFrame({ children }: MobileFrameProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ─── Mobile / Tablet: full-screen, no frame ───
  if (!isDesktop) {
    return (
      <>
        {children}
        <BottomNav />
        <FloatingActions />
      </>
    );
  }

  // ─── Desktop: wrap in realistic phone frame ───
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-mindspace-lavender-light via-white to-mindspace-mint-light p-4">
      {/* Phone Frame — transform creates a new containing block,
          so position: fixed inside is relative to this frame, not the viewport. */}
      <div
        style={{ transform: "translateX(0)" }}
        className="relative w-[393px] h-[852px] rounded-[3rem] shadow-2xl overflow-hidden border-[3px] border-gray-800 bg-white flex flex-col"
      >
        {/* ── Status Bar ── */}
        <div className="relative h-12 flex-shrink-0 bg-white">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-black rounded-full z-20" />
          {/* Left icons */}
          <div className="absolute top-3.5 left-7 flex items-center gap-1 z-10">
            <Signal size={14} className="text-gray-800" />
            <Wifi size={14} className="text-gray-800" />
          </div>
          {/* Right time + battery */}
          <div className="absolute top-3.5 right-7 flex items-center gap-1 z-10">
            <span className="text-xs font-semibold text-gray-800 tabular-nums">
              {timeStr}
            </span>
            <Battery size={14} className="text-gray-800" />
          </div>
        </div>

        {/* ── App Content ── */}
        <div className="flex-1 overflow-y-auto bg-background relative">
          {children}
          <BottomNav />
          <FloatingActions />
        </div>

        {/* ── Home Indicator ── */}
        <div className="h-7 flex-shrink-0 flex items-center justify-center bg-white relative z-50">
          <div className="w-[134px] h-[5px] rounded-full bg-gray-300" />
        </div>
      </div>
    </div>
  );
}

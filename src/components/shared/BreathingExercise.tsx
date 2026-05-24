"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Play, Pause, RotateCcw } from "lucide-react";

const PHASES = [
  { label: "Breathe In", duration: 4000, instruction: "Slowly inhale through your nose" },
  { label: "Hold", duration: 4000, instruction: "Gently hold your breath" },
  { label: "Breathe Out", duration: 4000, instruction: "Slowly exhale through your mouth" },
  { label: "Rest", duration: 2000, instruction: "Rest and prepare for the next breath" },
];

export function BreathingExercise() {
  const [isActive, setIsActive] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [cycles, setCycles] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isActive) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const phase = PHASES[phaseIndex];
    timerRef.current = setTimeout(() => {
      const nextIndex = (phaseIndex + 1) % PHASES.length;
      setPhaseIndex(nextIndex);
      if (nextIndex === 0) {
        setCycles((c) => c + 1);
      }
    }, phase.duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isActive, phaseIndex]);

  const currentPhase = PHASES[phaseIndex];
  const isInhale = phaseIndex === 0;
  const isHold = phaseIndex === 1;
  const scale = isHold ? 1.2 : isInhale ? 1.15 : 1;

  const handleReset = () => {
    setIsActive(false);
    setPhaseIndex(0);
    setCycles(0);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      {/* Breathing Circle */}
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Outer ring */}
        <motion.div
          className={cn(
            "absolute inset-0 rounded-full",
            isActive ? "bg-mindspace-lavender-light" : "bg-gray-100"
          )}
          animate={{
            scale: isActive ? 1.1 : 1,
          }}
          transition={{ duration: 2, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
        />

        {/* Breathing circle */}
        <motion.div
          className={cn(
            "w-32 h-32 rounded-full flex items-center justify-center z-10",
            "bg-gradient-to-br from-mindspace-primary to-mindspace-secondary",
            "shadow-lg"
          )}
          animate={{
            scale: isActive ? scale : 1,
          }}
          transition={{
            duration: isInhale || isHold ? 4 : 2,
            ease: "easeInOut",
          }}
        >
          <span className="text-white text-lg font-semibold text-center leading-tight px-2">
            {isActive ? currentPhase.label : "Breathe"}
          </span>
        </motion.div>
      </div>

      {/* Instruction */}
      <p className="text-sm text-gray-500 text-center min-h-[20px]">
        {isActive ? currentPhase.instruction : "Press start to begin"}
      </p>

      {/* Cycle count */}
      {cycles > 0 && (
        <p className="text-xs text-mindspace-primary font-medium">
          Completed {cycles} {cycles === 1 ? "cycle" : "cycles"}
        </p>
      )}

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsActive(!isActive)}
          className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 shadow-md",
            isActive
              ? "bg-rose-100 text-rose-600 hover:bg-rose-200"
              : "bg-mindspace-primary text-white hover:bg-mindspace-primary/90"
          )}
          aria-label={isActive ? "Pause" : "Start"}
        >
          {isActive ? <Pause size={24} /> : <Play size={24} />}
        </button>

        <button
          onClick={handleReset}
          className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center transition-colors"
          aria-label="Reset"
        >
          <RotateCcw size={18} />
        </button>
      </div>
    </div>
  );
}

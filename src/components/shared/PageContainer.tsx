"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function PageContainer({
  children,
  className,
  noPadding,
}: PageContainerProps) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "max-w-lg mx-auto min-h-screen",
        !noPadding && "px-4 pt-6 pb-24",
        className
      )}
    >
      {children}
    </motion.main>
  );
}

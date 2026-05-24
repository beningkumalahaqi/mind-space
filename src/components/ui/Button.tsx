"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-mindspace-primary text-white hover:opacity-90 shadow-sm",
  secondary:
    "bg-mindspace-secondary text-white hover:opacity-90 shadow-sm",
  accent:
    "bg-mindspace-accent text-amber-900 hover:opacity-90 shadow-sm",
  ghost:
    "bg-transparent hover:bg-mindspace-lavender-light text-mindspace-primary",
  outline:
    "border-2 border-mindspace-primary text-mindspace-primary hover:bg-mindspace-lavender-light",
  danger:
    "bg-mindspace-error text-white hover:opacity-90 shadow-sm",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-6 py-3 text-base rounded-xl",
  xl: "px-8 py-4 text-lg rounded-2xl",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  loading?: boolean;
}

/**
 * Button component with motion animations.
 * Uses a motion.div wrapper for animations and a native button for accessibility.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
    return (
      <motion.div
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.02 }}
        className={cn("inline-flex", className)}
      >
        <button
          ref={ref}
          className={cn(
            "inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-mindspace-primary/50 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer w-full",
            variants[variant],
            sizes[size]
          )}
          disabled={disabled || loading}
          {...props}
        >
          {loading && (
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          )}
          {children}
        </button>
      </motion.div>
    );
  }
);

Button.displayName = "Button";

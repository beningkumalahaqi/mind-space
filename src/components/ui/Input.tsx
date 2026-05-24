"use client";

import { forwardRef, type TextareaHTMLAttributes, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder:text-gray-400 transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-mindspace-primary/30 focus:border-mindspace-primary",
            error && "border-rose-300 focus:ring-rose-200 focus:border-rose-400",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-rose-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(
            "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder:text-gray-400 transition-all duration-200 resize-none",
            "focus:outline-none focus:ring-2 focus:ring-mindspace-primary/30 focus:border-mindspace-primary",
            error && "border-rose-300 focus:ring-rose-200 focus:border-rose-400",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-rose-500">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

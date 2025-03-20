"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const themeOptions = [
    {
      value: "light",
      label: "Light",
      icon: <Sun className="h-5 w-5" />,
      description: "Light mode for daytime use",
    },
    {
      value: "dark",
      label: "Dark",
      icon: <Moon className="h-5 w-5" />,
      description: "Dark mode for nighttime use",
    },
    {
      value: "system",
      label: "System",
      icon: <Monitor className="h-5 w-5" />,
      description: "Follow system preferences",
    },
  ];

  const currentTheme =
    themeOptions.find((t) => t.value === theme) || themeOptions[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 rounded-full p-2 transition-all duration-300",
          theme === "dark"
            ? "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
            : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200"
        )}
        aria-label={`Current theme: ${currentTheme.label}. Click to change`}>
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 30 : 0 }}
          transition={{ duration: 0.2 }}>
          {currentTheme.icon}
        </motion.div>
        <span className="text-sm font-medium">{currentTheme.label}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-lg shadow-lg",
              theme === "dark"
                ? "bg-zinc-800 border border-zinc-700"
                : "bg-white border border-zinc-200"
            )}>
            <div className="p-2">
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setTheme(option.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md p-2 text-left transition-colors",
                    theme === option.value
                      ? theme === "dark"
                        ? "bg-zinc-700 text-zinc-100"
                        : "bg-zinc-100 text-zinc-900"
                      : "hover:bg-zinc-100 dark:hover:bg-zinc-700"
                  )}>
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full",
                      theme === "dark"
                        ? "bg-zinc-900 text-zinc-100"
                        : "bg-zinc-200 text-zinc-800"
                    )}>
                    {option.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{option.label}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {option.description}
                    </p>
                  </div>
                  {theme === option.value && (
                    <Check className="h-4 w-4 text-green-500" />
                  )}
                </button>
              ))}
            </div>
            <div
              className={cn(
                "border-t p-2 text-xs",
                theme === "dark"
                  ? "border-zinc-700 text-zinc-400"
                  : "border-zinc-200 text-zinc-500"
              )}>
              <p>Theme preferences are saved to your browser</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

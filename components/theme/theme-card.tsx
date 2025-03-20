"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor, Check } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ThemeCard() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const themeOptions = [
    {
      value: "light",
      label: "Light",
      icon: <Sun className="h-6 w-6" />,
      bgClass: "bg-white",
      textClass: "text-black",
    },
    {
      value: "dark",
      label: "Dark",
      icon: <Moon className="h-6 w-6" />,
      bgClass: "bg-zinc-900",
      textClass: "text-white",
    },
    {
      value: "system",
      label: "System",
      icon: <Monitor className="h-6 w-6" />,
      bgClass: "bg-gradient-to-br from-white to-zinc-900",
      textClass: "text-zinc-700 dark:text-zinc-300",
    },
  ];

  return (
    <div
      className={cn(
        "grid grid-cols-3 gap-2 rounded-xl p-2",
        theme === "dark" ? "bg-zinc-800" : "bg-zinc-100"
      )}>
      {themeOptions.map((option) => (
        <motion.button
          key={option.value}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setTheme(option.value)}
          className={cn(
            "relative flex flex-col items-center justify-center rounded-lg p-3 transition-colors",
            option.bgClass,
            theme === option.value
              ? "ring-2 ring-primary ring-offset-2"
              : "hover:bg-opacity-90"
          )}>
          <div className={cn("mb-2", option.textClass)}>{option.icon}</div>
          <span className={cn("text-xs font-medium", option.textClass)}>
            {option.label}
          </span>
          {theme === option.value && (
            <div className="absolute right-1 top-1 rounded-full bg-primary p-0.5">
              <Check className="h-3 w-3 text-white" />
            </div>
          )}
        </motion.button>
      ))}
    </div>
  );
}

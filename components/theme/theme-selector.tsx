"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "flex items-center rounded-full p-1",
        theme === "dark" ? "bg-zinc-800" : "bg-zinc-100"
      )}>
      <motion.div
        className={cn(
          "absolute h-8 w-8 rounded-full",
          theme === "dark" ? "bg-zinc-700" : "bg-white"
        )}
        layoutId="pill"
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          left: theme === "light" ? 4 : theme === "dark" ? 40 : 76,
        }}
      />

      <button
        onClick={() => setTheme("light")}
        className={cn(
          "relative z-10 flex h-8 w-8 items-center justify-center rounded-full transition-colors",
          theme === "light" ? "text-amber-500" : "text-zinc-500"
        )}
        aria-label="Light mode">
        <Sun className="h-5 w-5" />
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={cn(
          "relative z-10 flex h-8 w-8 items-center justify-center rounded-full transition-colors",
          theme === "dark" ? "text-indigo-400" : "text-zinc-500"
        )}
        aria-label="Dark mode">
        <Moon className="h-5 w-5" />
      </button>

      <button
        onClick={() => setTheme("system")}
        className={cn(
          "relative z-10 flex h-8 w-8 items-center justify-center rounded-full transition-colors",
          theme === "system" ? "text-green-500" : "text-zinc-500"
        )}
        aria-label="System preference">
        <Monitor className="h-5 w-5" />
      </button>
    </div>
  );
}

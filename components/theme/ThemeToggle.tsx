"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 20 },
  };

  return (
    <div
      className={cn(
        "relative flex h-10 items-center rounded-full p-1",
        theme === "dark" ? "bg-zinc-800" : "bg-zinc-100"
      )}>
      {["light", "dark", "system"].map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={cn(
            "relative flex h-8 w-8 items-center justify-center rounded-full transition-colors",
            theme === t
              ? theme === "dark"
                ? "bg-zinc-700 text-white"
                : "bg-white text-zinc-900 shadow-sm"
              : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          )}
          aria-label={`Switch to ${t} theme`}>
          {t === "light" && <Sun className="h-4 w-4" />}
          {t === "dark" && <Moon className="h-4 w-4" />}
          {t === "system" && <Monitor className="h-4 w-4" />}

          {theme === t && (
            <motion.div
              layoutId="activeTheme"
              className="absolute inset-0 rounded-full"
              initial="hidden"
              animate="visible"
              variants={variants}
              transition={{ duration: 0.2 }}>
              <span className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
            </motion.div>
          )}
        </button>
      ))}
    </div>
  );
}

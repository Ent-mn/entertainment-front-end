"use client";

import { useTheme } from "@/context/ThemeContext";
import { Sun } from "lucide-react";
import { useMemo } from "react";

const ThemeToggle = () => {
  const { theme, toggleTheme, setTheme } = useTheme();

  const getNextTheme = useMemo(() => {
    switch (theme) {
      case "light":
        return { label: "🌙 Dark Mode", value: "dark" };
      case "dark":
        return { label: "🖥 System Mode", value: "system" };
      case "system":
        return { label: "☀️ Light Mode", value: "light" };
      default:
        return { label: "☀️ Light Mode", value: "light" };
    }
  }, [theme]);

  return (
    <div className="flex items-center gap-4 justify-center p-20">
      {/* Toggle Button */}
      <button
        onClick={() =>
          setTheme(getNextTheme.value as "light" | "dark" | "system")
        }
        className="p-3 px-3  dark:text-white border-gray-300 dark:border-gray-600 active:bg-black rounded-full shadow-sm transition duration-200"
      >
        <Sun className="w-5 h-5" />
      </button>

      {/* Select Menu */}
    </div>
  );
};

export default ThemeToggle;

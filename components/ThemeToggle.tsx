"use client";

import { useTheme } from "@/context/ThemeContext";
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
        className="p-2 px-4 bg-gray-100 dark:bg-gray-800 border dark:text-white border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200">
        {getNextTheme.label}
      </button>

      {/* Select Menu */}
      <select
        value={theme}
        onChange={(e) =>
          setTheme(e.target.value as "light" | "dark" | "system")
        }
        className="p-2 bg-gray-100 dark:bg-gray-800 border dark:text-white border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200">
        <option value="light">☀️ Light</option>
        <option value="dark">🌙 Dark</option>
        <option value="system">🖥 System</option>
      </select>
    </div>
  );
};

export default ThemeToggle;

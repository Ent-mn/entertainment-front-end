"use client";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { ThemeCard } from "@/components/theme/theme-card";
import { ThemeSelector } from "@/components/theme/theme-selector";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export default function ThemeDemo() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="mx-auto max-w-3xl space-y-12 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Theme Switcher Components
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Choose your preferred theme switcher style
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
              Dropdown Switcher
            </h2>
            <div className="flex justify-center">
              <ThemeSwitcher />
            </div>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
              Toggle Switcher
            </h2>
            <div className="flex justify-center">
              <ThemeToggle />
            </div>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
              Card Switcher
            </h2>
            <div className="flex justify-center">
              <ThemeCard />
            </div>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
              Pill Selector
            </h2>
            <div className="flex justify-center">
              <ThemeSelector />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

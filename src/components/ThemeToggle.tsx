"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, mounted, toggleTheme } = useTheme();

  // Before hydration completes, render a same-size inert placeholder so
  // the header layout never shifts and no wrong icon flashes.
  if (!mounted) {
    return (
      <span
        aria-hidden="true"
        className="inline-flex h-8 w-8 items-center justify-center rounded-md"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface hover:text-text-primary"
    >
      {isDark ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
    </button>
  );
}

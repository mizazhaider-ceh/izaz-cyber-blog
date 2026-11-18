"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "izaz-dev-theme";

type ThemeContextValue = {
  theme: Theme;
  mounted: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  mounted: false,
  toggleTheme: () => {},
});

function readStoredTheme(): Theme {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "dark" || stored === "light") {
      return stored;
    }
  } catch {
    // Storage unavailable (private mode, blocked cookies): fall through to light.
  }
  return "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  // Sync React state with the value the pre-paint script already applied.
  // The visible theme never flashes: the script in layout.tsx sets
  // data-theme before first paint, this only aligns the toggle icon.
  useEffect(() => {
    setTheme(readStoredTheme());
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // Storage unavailable: the theme still applies for this session.
      }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ theme, mounted, toggleTheme }),
    [theme, mounted, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}

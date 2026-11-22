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

// The key string "izaz-dev-theme" is also hardcoded in the pre-paint
// script in src/app/layout.tsx (it must stay a self-contained string)
// and in the privacy page prose. Change it in all three places.
const THEME_STORAGE_KEY = "izaz-dev-theme";

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

function resolveSystemTheme(): Theme {
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  } catch {
    // matchMedia unavailable: fall back to light.
    return "light";
  }
}

function parseStoredTheme(value: string | null): Theme | null {
  return value === "dark" || value === "light" ? value : null;
}

function readStoredTheme(): Theme {
  try {
    const stored = parseStoredTheme(window.localStorage.getItem(THEME_STORAGE_KEY));
    if (stored !== null) {
      return stored;
    }
  } catch {
    // Storage unavailable (private mode, blocked cookies): fall through
    // to the OS preference.
  }
  return resolveSystemTheme();
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  // Sync React state with the value the pre-paint script already applied.
  // The visible theme never flashes: the script in layout.tsx sets
  // data-theme before first paint, this only aligns the toggle icon.
  // Also follow OS preference changes while no value is stored; a
  // stored value always wins, so the toggle behaviour is unchanged.
  useEffect(() => {
    setTheme(readStoredTheme());
    setMounted(true);
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      let stored: Theme | null = null;
      try {
        stored = parseStoredTheme(window.localStorage.getItem(THEME_STORAGE_KEY));
      } catch {
        // Storage unavailable: treat as no stored value.
      }
      if (stored === null) {
        const next: Theme = media.matches ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", next);
        setTheme(next);
      }
    };
    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
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

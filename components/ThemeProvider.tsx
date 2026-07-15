"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";
type ColorTheme = "green" | "blue" | "purple" | "orange" | "red";

interface ThemeContextType {
  theme: Theme;
  colorTheme: ColorTheme;
  toggleTheme: () => void;
  setColorTheme: (c: ColorTheme) => void;
  cycleColor: () => void;
}

const COLOR_ORDER: ColorTheme[] = ["green", "blue", "purple", "orange", "red"];

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  colorTheme: "green",
  toggleTheme: () => {},
  setColorTheme: () => {},
  cycleColor: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [colorTheme, setColorThemeState] = useState<ColorTheme>("green");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) setTheme(stored);
    else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
    const storedColor = localStorage.getItem("color-theme") as ColorTheme | null;
    if (storedColor && COLOR_ORDER.includes(storedColor)) {
      setColorThemeState(storedColor);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-color", colorTheme);
    localStorage.setItem("color-theme", colorTheme);
  }, [colorTheme, mounted]);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const setColorTheme = (c: ColorTheme) => setColorThemeState(c);

  const cycleColor = () => {
    setColorThemeState((prev) => {
      const idx = COLOR_ORDER.indexOf(prev);
      return COLOR_ORDER[(idx + 1) % COLOR_ORDER.length];
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, colorTheme, toggleTheme, setColorTheme, cycleColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

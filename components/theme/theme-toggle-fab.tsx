"use client";

import { useEffect, useMemo, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "theme";

type Theme = "light" | "dark";

export function ThemeToggleFab() {
  const [theme, setTheme] = useState<Theme>("light");

  const getSystemTheme = (): Theme => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const applyTheme = (nextTheme: Theme) => {
    const root = document.documentElement;
    if (nextTheme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  };

  const icon = useMemo(() => {
    return theme === "dark" ? Sun : Moon;
  }, [theme]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const initialTheme: Theme = stored === "dark" || stored === "light" ? stored : getSystemTheme();
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  };

  const Icon = icon;

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed bottom-5 right-5 z-50 inline-flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-1 ring-black/10 transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-ring dark:ring-white/10"
      aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
      data-testid="theme-toggle-fab"
    >
      <Icon className="size-5" />
    </button>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Moon, Palette, Sun } from "lucide-react";
import { themeStorageKeys } from "@/components/theme-initializer";
import { cn } from "@/lib/utils";

const colorThemes = [
  { id: "blue", label: "Bleu confiance", swatch: "bg-blue-600" },
  { id: "emerald", label: "Vert service", swatch: "bg-emerald-600" },
  { id: "violet", label: "Violet premium", swatch: "bg-violet-600" },
  { id: "rose", label: "Rose moderne", swatch: "bg-rose-600" },
  { id: "amber", label: "Ambre chaleureux", swatch: "bg-amber-500" }
];

export function ThemeControls() {
  const [colorTheme, setColorTheme] = useState("blue");
  const [mode, setMode] = useState("light");
  const [paletteOpen, setPaletteOpen] = useState(false);

  const activeTheme = useMemo(
    () => colorThemes.find((theme) => theme.id === colorTheme) ?? colorThemes[0],
    [colorTheme]
  );

  useEffect(() => {
    const root = document.documentElement;
    const storedColor = localStorage.getItem(themeStorageKeys.color) ?? "blue";
    const storedMode = localStorage.getItem(themeStorageKeys.mode) ?? "light";

    setColorTheme(storedColor);
    setMode(storedMode);
    root.dataset.colorTheme = storedColor;
    root.dataset.mode = storedMode;
  }, []);

  function applyColor(nextThemeId: string) {
    setColorTheme(nextThemeId);
    localStorage.setItem(themeStorageKeys.color, nextThemeId);
    document.documentElement.dataset.colorTheme = nextThemeId;
    document.body.dataset.colorTheme = nextThemeId;
    setPaletteOpen(false);
  }

  function toggleMode() {
    const nextMode = mode === "dark" ? "light" : "dark";

    setMode(nextMode);
    localStorage.setItem(themeStorageKeys.mode, nextMode);
    document.documentElement.dataset.mode = nextMode;
    document.body.dataset.mode = nextMode;
  }

  return (
    <div className="theme-controls relative flex items-center gap-1 rounded-full border border-border bg-white/80 p-1 shadow-card">
      <button
        type="button"
        onClick={() => setPaletteOpen((current) => !current)}
        className="focus-ring relative inline-flex h-9 w-9 items-center justify-center rounded-full text-primary hover:bg-slate-100"
        aria-label={`Changer la couleur du site. Theme actuel : ${activeTheme.label}`}
        aria-expanded={paletteOpen}
        title={`Theme : ${activeTheme.label}`}
      >
        <span className={cn("absolute h-3 w-3 translate-x-2 translate-y-2 rounded-full ring-2 ring-white", activeTheme.swatch)} />
        <Palette className="h-4 w-4" />
      </button>
      {paletteOpen ? (
        <div className="absolute right-0 top-12 w-60 rounded-lg border border-border bg-white p-2 shadow-2xl">
          <p className="px-2 pb-2 text-xs font-bold uppercase text-muted">Couleur du site</p>
          <div className="grid gap-1">
            {colorThemes.map((theme) => (
              <button
                key={theme.id}
                type="button"
                onClick={() => applyColor(theme.id)}
                className="focus-ring flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-primary hover:bg-slate-100"
              >
                <span className="flex items-center gap-2">
                  <span className={cn("h-4 w-4 rounded-full", theme.swatch)} />
                  {theme.label}
                </span>
                {theme.id === colorTheme ? <Check className="h-4 w-4 text-accent" /> : null}
              </button>
            ))}
          </div>
        </div>
      ) : null}
      <button
        type="button"
        onClick={toggleMode}
        className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-full text-primary hover:bg-slate-100"
        aria-label={mode === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
        title={mode === "dark" ? "Mode clair" : "Mode sombre"}
      >
        {mode === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
    </div>
  );
}
